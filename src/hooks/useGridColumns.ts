import { useMediaQuery } from "./useMediaQuery";

export function useGridColumns() {
  const isLg = useMediaQuery("(min-width: 1024px)");    // lg:grid-cols-3
  const isSm = useMediaQuery("(min-width: 640px)");     // sm:grid-cols-2

  if (isLg) return 3;
  if (isSm) return 2;
  return 1; // default: mobile → 1 columna
}
