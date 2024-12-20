"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./label";
import { Input } from "./input-form";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export function SignupForm({
  className,
  setLoggedInUser,
}: {
  className: string;
  setLoggedInUser: (username: string) => void;
}) {
  interface User {
    idnd: string;
    tennguoidung: string;
    email: string;
    vaitro: string;
    mk: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/nguoidung")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        console.log(formData);
        const res = await fetch("http://localhost:8000/nguoidung", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to sign up");
        const data = await res.json();
        console.log("User signed up:", data);
        window.location.href = "/";
      } catch (err) {
        console.error("Error signing up:", err);
      }
    } else {
      const user = users.find(
        (user) => user.email === formData.email && user.vaitro === "admin"
      );
      if (user) {
        setLoggedInUser(user.tennguoidung);
        window.location.href = "/admin";
      } else {
        const user = users.find(
          (user) =>
            user.email === formData.email &&
            user.mk === formData.password &&
            user.vaitro === "khachhang"
        );
        if (user) {
          setLoggedInUser(user.tennguoidung);
          window.location.href = "/main";
        } else {
          alert("Invalid email or password");
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div
      className={cn(
        "max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black",
        className
      )}
    >
      <h2 className="font-bold text-xl text-neutral-200 dark:text-neutral-200 mb-7">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-200 dark:text-neutral-300 mb-7">
        {isSignUp
          ? "Create an account to enjoy all the services."
          : "Login to your account to continue."}
      </p>

      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        )}
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {isSignUp ? "Sign Up" : "Sign In"} &rarr;
          <BottomGradient />
        </button>
      </form>
      <p className="mt-4 text-neutral-200 dark:text-neutral-300">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <a href="#" onClick={toggleForm} className="text-blue-500 underline">
          {isSignUp ? "Sign In" : "Sign Up"}
        </a>
      </p>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <button
          className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="button"
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            GitHub
          </span>
          <BottomGradient />
        </button>
        <button
          className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="button"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
        <button
          className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="button"
        >
          <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Gmail
          </span>
          <BottomGradient />
        </button>
      </div>
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
