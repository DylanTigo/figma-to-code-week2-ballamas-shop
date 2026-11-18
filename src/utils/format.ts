const formatters = new Map<string, Intl.NumberFormat>();

/** Formate un montant : formatPrice(25, "CAD") -> "$25.00" */
export function formatPrice(amount: number, currencyCode = "CAD"): string {
  let formatter = formatters.get(currencyCode);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: currencyCode,
    });
    formatters.set(currencyCode, formatter);
  }
  return formatter.format(amount);
}

/** Texte lisible des options d'une variante : "Green - Small" */
export function formatOptions(options: Record<string, string>): string {
  return Object.entries(options)
    .filter(([name, value]) => !(name === "Title" && value === "Default Title"))
    .map(([, value]) => value)
    .join(" - ");
}
