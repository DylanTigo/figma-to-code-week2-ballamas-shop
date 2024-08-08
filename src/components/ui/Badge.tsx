import { cva } from "class-variance-authority"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'primary' | 'secondary'
}

export default function Badge( { variant, className, ...props }: BadgeProps ) {
  return <div {...props} className={badgeVariants({ variant }) + " " + className} />
}

const badgeVariants = cva(
  "inline-flex items-center px-2 py-2.5 justify-center rounded-full text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        primary: 'bg-white text-black',
        secondary: 'bg-black text-white',
      },
    },
     defaultVariants: {
      variant: 'primary',
    },
  }
)
