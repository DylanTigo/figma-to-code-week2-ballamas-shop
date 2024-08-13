import { useEffect } from "react";

export default function useScrollTop(id: string | undefined = undefined) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
}
