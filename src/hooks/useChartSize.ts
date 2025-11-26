import { useMediaQuery } from "./useMediaQuery";

export function useChartSize() {
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  if (isLg) {
    return { w: 500, h: 350 };   // Desktop grande
  }
  if (isMd) {
    return { w: 380, h: 260 };   // Tablets / Laptops chicas
  }
  return { w: 300, h: 220 };     // Mobile
}
