import { ButtonLink } from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="mt-16 mb-24 min-h-[45vh] flex flex-col items-center justify-center gap-4 text-center">
      <p className="font-chillax font-bold text-6xl text-stroke-black text-transparent">
        404
      </p>
      <h2 className="font-semibold font-chillax text-lg sm:text-2xl">
        This page doesn't exist
      </h2>
      <ButtonLink to="/">Back to the shop</ButtonLink>
    </div>
  );
}
