import { cva } from "class-variance-authority"

type SizeButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary'
}

export default function SizeButton( { variant, className, ...props }: SizeButtonProps ) {
  return <button {...props} className={sizeButtonVariants({ variant }) + " " + className} />
}

const sizeButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xl sm:text-2xl font-semibold transition-colors ",
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-black/80',
        secondary: 'bg-none text-black hover:bg-white/80',
      },
    },
     defaultVariants: {
      variant: 'primary',
    },
  }
)