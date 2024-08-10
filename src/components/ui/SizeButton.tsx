import { cva } from "class-variance-authority"

type SizeButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'normal' | 'active'
}

export default function SizeButton( { variant, className, ...props }: SizeButtonProps ) {
  return <button {...props} type="button" className={sizeButtonVariants({ variant }) + " " + className} />
}

const sizeButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xl sm:text-2xl font-medium outline outline-1 outline-black transition-colors p-3.5 max-sm:py-[7px] min-w-[55px] sm:min-w-[76px]",
  {
    variants: {
      variant: {
        normal: 'bg-none text-black hover:bg-white/80',
        active: 'bg-black text-white hover:bg-black/80',
      },
    },
     defaultVariants: {
      variant: 'normal',
    },
  }
)