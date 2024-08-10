import { cva } from 'class-variance-authority'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'tertiary'
    big?: boolean
}

export default function Button( { variant, big, className, ...props }: ButtonProps ) {

  const size = big ? 'w-full h-auto sm:h-16' : 'w-fit h-auto'

  return (
    <button {...props} className={buttonVariants({ variant }) + " "+ size + " " + className} />
  )
}

const buttonVariants = cva(
  "flex justify-center items-center gap-1.5 px-5 py-3 rounded-full text-sm font-semibold transition-colors",
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-black/80',
        secondary: 'bg-white text-black hover:bg-white/80',
        tertiary: 'bg-white text-white outline outline-2 ouline-white hover:bg-white/80',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)
