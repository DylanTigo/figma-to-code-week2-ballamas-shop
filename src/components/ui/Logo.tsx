type LogoProps = {
  className?: string;
  variant?: "white" | "black";
};
export default function Logo({className, variant}: LogoProps) {
    const typeVariant = variant || "white";

  return (
    <div className={`text-3xl font-bold uppercase font-chillax bg-none text-transparent ${typeVariant === "white" ? "text-stroke" : "text-stroke-black"} ${className}`}>Ballamas</div>
  )
}
