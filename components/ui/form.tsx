"use client";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input-form";
import { cn } from "@/lib/utils";
import { ComboboxPopover } from "@/components/ui/combobox";

export function AddingForm({
  className,
  onUserAdded,
}: {
  className: string;
  onUserAdded?: () => void; // Add callback prop
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: "khachhang",
  });

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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/nguoidung", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!res.ok) throw new Error("Failed to add user");

      const data = await res.json();
      console.log("User added:", data);

      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        role: "khachhang",
      });

      if (onUserAdded) {
        onUserAdded();
      }

      alert("User added successfully!");
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user!");
    }
  };

  return (
    <div
      className={cn(
        "max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black",
        className
      )}
    >
      <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral-200">
        Adding user
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">UserName</Label>
          <Input
            id="username"
            placeholder="...."
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password-confirm">Password confirm</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder=""
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="max-w-20 mb-4">
          <Label htmlFor="Role">Role</Label>
          <ComboboxPopover onChange={handleRoleChange} value={formData.role} />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Add &rarr;
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
