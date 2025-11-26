import { useRef, useEffect } from "react";
import gsap from "gsap";

const CircleDiv = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shoeRef = useRef<HTMLImageElement | null>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    /** ========================
     *   ANIMACIÓN DE ENTRADA
     * ======================== */
    const el = containerRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 50 }); // posición inicial

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            });
            observer.unobserve(el); // solo una vez
          }
        });
      },
      {
        threshold: 0.3, // se activa cuando el 30% es visible
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /** ========================
   *      ANIMACIÓN HOVER
   * ======================== */
  useEffect(() => {
    hoverTl.current = gsap.timeline({ paused: true });

    hoverTl.current
      .to(
        shoeRef.current,
        {
          scale: 1,
          rotate: 10,
          duration: 0.4,
          ease: "power2.out",
        }
      )
     
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-between md:justify-around w-full aspect-square  cursor-pointer"
      onMouseEnter={() => hoverTl.current?.play()}
      onMouseLeave={() => hoverTl.current?.reverse()}
    >
      <div className="w-1 h-3 bg-transparent" />

      <div className="absolute w-5/6 aspect-square rounded-full bg-linear-to-b to-[#58c2ff]/60 from-[#e1e5e7] drop-shadow-2xl" />

      <img
        ref={shoeRef}
        src="/nike-blue.png"
        alt="Nike Shoe"
        className="absolute rotate-15 drop-shadow-2xl scale-75 -translate-y-10"
      />

      

      <h2 className="text-white text-5xl font-extrabold tracking-wide text-center leading-tight z-30 mb-3 md:mb-0 ">
        NEW <br /> ARRIVAL
      </h2>
    </div>
  );
};

export default CircleDiv;
