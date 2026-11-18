import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../services/api/datas";

/** Collections affichées par défaut dans les filtres (comme sur la maquette) */
const FEATURED_FILTERS = ["accessories", "featured", "unisex"];

type FilterNavProps = {
  active: string | null;
  onChange: (collection: string | null) => void;
};

export default function FilterNav({ active, onChange }: FilterNavProps) {
  const { data, isPending } = useQuery({
    queryKey: ["collections"],
    queryFn: ({ signal }) => getCollections(signal),
    staleTime: 1000 * 60 * 30,
  });

  const collections = data?.collections ?? [];
  // On affiche les filtres de la maquette + la collection active si elle vient
  // d'ailleurs (ex: lien "Men" du header)
  const visible = collections.filter(
    (c) => FEATURED_FILTERS.includes(c.handle) || c.handle === active
  );

  const buttons = [
    { handle: null, label: "All", count: data?.total },
    ...(visible.length
      ? visible.map((c) => ({ handle: c.handle, label: c.title, count: c.count }))
      : FEATURED_FILTERS.map((handle) => ({
          handle,
          label: handle.charAt(0).toUpperCase() + handle.slice(1),
          count: undefined,
        }))),
  ];

  return (
    <nav
      aria-label="Filter products by collection"
      className="flex items-center sm:justify-center flex-wrap gap-3.5"
    >
      {buttons.map((button) => (
        <button
          key={button.handle ?? "all"}
          type="button"
          aria-pressed={active === button.handle}
          onClick={() => onChange(button.handle)}
          className={`text-black bg-none text-xl flex gap-2 items-center outline outline-2 px-3.5 py-2.5 rounded-full outline-black transition-colors hover:bg-black/5 ${
            active === button.handle ? "active" : ""
          }`}
        >
          {button.label}
          {button.count !== undefined ? (
            <span className="text-base">{button.count}</span>
          ) : (
            isPending && (
              <span
                aria-hidden="true"
                className="inline-block h-4 w-5 rounded-full bg-current opacity-20 animate-pulse"
              />
            )
          )}
        </button>
      ))}
    </nav>
  );
}
