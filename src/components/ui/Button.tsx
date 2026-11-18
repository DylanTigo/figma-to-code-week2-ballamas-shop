import { cva } from "class-variance-authority";
import { Link, LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary" | "tertiary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  big?: boolean;
};

export default function Button({
  variant,
  big,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={buttonClasses({ variant, big, className })}
    />
  );
}

/** Lien (react-router) avec l'apparence d'un bouton */
export function ButtonLink({
  variant,
  big,
  className = "",
  ...props
}: LinkProps & { variant?: Variant; big?: boolean }) {
  return (
    <Link {...props} className={buttonClasses({ variant, big, className })} />
  );
}

function buttonClasses({
  variant,
  big,
  className = "",
}: {
  variant?: Variant;
  big?: boolean;
  className?: string;
}) {
  const size = big ? "w-full h-auto sm:h-16" : "w-fit h-auto";
  return `${buttonVariants({ variant })} ${size} ${className}`;
}

const buttonVariants = cva(
  "flex justify-center items-center gap-1.5 px-5 py-3 rounded-full text-sm font-semibold transition-colors focus-visible:outline-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-black text-white hover:bg-black/80",
        secondary: "bg-white text-black hover:bg-white/80",
        tertiary:
          "bg-white text-white outline outline-2 outline-white hover:bg-white/80",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
