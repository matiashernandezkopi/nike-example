import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const RSideHome = () => {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1.5 } });
    tl.from("#shoe-img", { xPercent: 100, rotate: -35, opacity: 0 })
      .from("#right-circle", { scale: 0, opacity: 0 }, "<")
      .from("#new-arrival", {opacity:0}, "<+1")
  });
  return (
    <div className="relative flex items-center justify-center w-full md:w-1/2 z-40">
     <div
      id="right-circle"
      className="
        absolute
        w-screen 
        md:w-[170%] 
        md:min-w-[1100px] 
        aspect-square 
        rounded-full 
        bg-linear-to-b from-[#58c2ff]/60 to-[#0169a2]
        translate-x-65 
        -translate-y-65
        hidden md:block
      "
      />
      <div
        id="right-circle"
        className="absolute w-11/12 aspect-square rounded-full bg-linear-to-b from-[#58c2ff]/60 to-[#0169a2] md:hidden"
      />
      <img
        id="shoe-img"
        src="/nike-blue.png"
        alt="Nike Shoe"
        className="relative w-[80%] md:w-[275%] rotate-15 drop-shadow-2xl md:top-20 "
      />
      <h2 id='new-arrival' className="absolute text-white text-5xl md:text-6xl font-extrabold tracking-wide bottom-5 text-center md:text-left md:left-0 md:top-40 xl:left-0  leading-tight">
        NEW <br /> ARRIVAL
      </h2>
    </div>
  )
}

export default RSideHome