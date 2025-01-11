"use client";
import React, { useState, useEffect } from "react";
import { Label } from "./label";
import { Input } from "./input-form";
import { cn } from "@/lib/utils";
import { ComboboxPopover } from "@/components/ui/combobox";

interface FormField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface FormConfig {
  title: string;
  endpoint: string;
  fields: FormField[];
}

export function AddingForm({
  className,
  config,
  onAdded,
}: {
  className: string;
  config: FormConfig;
  onAdded?: () => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `Failed to add to ${config.title}: ${errorData.message}`
        );
      }

      const data = await res.json();

      console.log("Added:", data);

      if (onAdded) {
        onAdded();
      }

      alert("Added successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert(err instanceof Error ? err.message : "Failed to add!");
    }
  };
  const [formData, setFormData] = useState<Record<string, string | null>>(
    () => {
      const initialData: Record<string, string | null> = {};
      config.fields.forEach((field) => {
        initialData[field.id] =
          field.type === "combobox" && field.options
            ? field.options[0]?.value || null
            : "";
      });
      return initialData;
    }
  );

  return (
    <div
      className={cn(
        "max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral-200">
        {config.title}
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {config.fields.map((field) => (
          <LabelInputContainer key={field.id} className="mb-4">
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === "combobox" && field.options ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <ComboboxPopover
                  onChange={handleRoleChange}
                  value={formData.vaitro || "khachhang"}
                />
              </div>
            ) : (
              <Input
                id={field.id}
                placeholder={field.type === "password" ? "••••••••" : ""}
                type={field.type}
                value={formData[field.id] || field.id}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </LabelInputContainer>
        ))}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Add &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export function UpdateForm({
  config,
  id,
  tableName,
  apiEndpoint,
  onSubmit,
}: {
  config?: FormConfig;
  id: string;
  tableName: string;
  apiEndpoint: string;
  onSubmit?: (data: any) => void;
}) {
  const [formData, setFormData] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiEndpoint}/${tableName}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setFormData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, tableName, apiEndpoint]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Submittin data:", formData); // Debug
      const response = await fetch(`${apiEndpoint}/${tableName}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update data");

      const updatedData = await response.json();
      if (onSubmit) {
        onSubmit(updatedData);
      }
      alert("Updated successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert(err instanceof Error ? err.message : "Failed to update!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!formData) return <div>No data found</div>;
  console.log("formData", formData);
  return (
    <div
      className={cn(
        "max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral-200">
        Update {tableName}
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {config?.fields.map((field) => (
          <LabelInputContainer key={field.id} className="mb-4">
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === "combobox" && field.options ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <ComboboxPopover
                  onChange={handleRoleChange}
                  value={formData.vaitro || "khachhang"}
                />
              </div>
            ) : (
              <Input
                id={field.id}
                type={field.type}
                value={formData[field.id] || ""}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </LabelInputContainer>
        ))}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Update &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full ", className)}>
      {children}
    </div>
  );
};
