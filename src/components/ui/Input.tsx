import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full max-w-full h-11 flex items-center text-xs rounded-4xl bg-transparent border px-3.5 border-gray focus:border-black focus:outline-none [&:user-invalid]:border-red-600 ${className}`}
    />
  );
}
