import React from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

export default function Input({ className, ...props }: InputProps) {
  return (
      <input {...props} className={`w-full max-w-full h-11 flex items-center text-xs rounded-4xl bg-transparent border px-3.5 border-gray ${className}`} />
  )
}

// const inputVariants = cva()