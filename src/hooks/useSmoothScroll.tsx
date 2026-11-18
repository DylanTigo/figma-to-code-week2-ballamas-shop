import Lenis from "lenis";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

let lenis: Lenis | null = null;

/** Scroll doux vers un élément (ou une position), avec ou sans Lenis */
export function scrollToTarget(
  target: HTMLElement | number,
  { offset = 0, immediate = false } = {}
) {
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate });
    return;
  }
  const top =
    typeof target === "number"
      ? target
      : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Active Lenis sur tout le site (désactivé si l'utilisateur préfère réduire
 * les animations) et remonte en haut de page à chaque changement de page.
 */
export default function useSmoothScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ duration: 1, touchMultiplier: 2, autoRaf: true });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    // Si l'URL contient une ancre (#products), c'est la page qui gère le scroll
    if (!hash) scrollToTarget(0, { immediate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}
