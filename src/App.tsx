import { useGSAP } from "@gsap/react";
import Main from "./sections/Main";
import gsap from "gsap";
import Showcase from "./sections/Showcase";
import Marquee from "./components/Marquee";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Charts from "./sections/Charts";
import { useState } from "react";
import LoginModal from "./components/LoginModal";

gsap.registerPlugin(ScrollTrigger);
function App() {
  useGSAP(() => {
    // Animación inicial del header + navbar (ya lo tenías)
    gsap.from("#header", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      delay: 1,
    });

    gsap.from("#navbar > *", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      delay: 1.2,
    });

    // Hover del botón Login
    const btn = document.querySelector("#login-btn");
    if (btn) {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
          backgroundColor: "#0077ff",
          color: "white",
          duration: 0.6,
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          backgroundColor: "transparent",
          color: "#0077ff",
          duration: 0.6,
        });
      });
    }

    // ⭐ MOBILE MENU ⭐// ⭐ MOBILE MENU ⭐
    const menuBtn = document.querySelector("#menu-btn");
    const closeBtn = document.querySelector("#close-menu");
    const mobileMenu = document.querySelector("#mobile-menu");
    const overlay = document.querySelector("#overlay");
    const items = gsap.utils.toArray(".mobile-item");

    if (menuBtn && mobileMenu && overlay && closeBtn) {

      // TIMELINE PARA ABRIR Y CERRAR
      const tl = gsap.timeline({ paused: true });

      tl.to(overlay, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          mobileMenu,
          {
            right: 0,
            duration: 0.5,
            ease: "power3",
          },
          "<" // al mismo tiempo que el overlay
        )
        .from(
          items,
          {
            x: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          "#login-btn-mobile",
          {
            opacity: 1,
            duration: 1,
          },
          "<"
        );

      // abrir
      menuBtn.addEventListener("click", () => tl.play());

      // cerrar
      closeBtn.addEventListener("click", () => tl.reverse());

      // cerrar tocando el overlay
      overlay.addEventListener("click", () => tl.reverse());
    }
    


  });



  const [loginOpen, setLoginOpen] = useState(false)


  return (
    <main className=" bg-linear-to-br from-[#f7f9ff] via-[#e5f1ff] to-[#b3dcff]  overflow-x-hidden">
      <header
        id="header"
        className="fixed md:absolute top-0 w-full z-50 flex justify-between items-center p-4 px-5 md:bg-transparent  bg-white"
      >
        <h1 className="font-bold text-lg tracking-wide cursor-pointer hover:text-[#0077ff] transition-colors duration-500">NIKI SPORT</h1>

        <nav
          id="navbar"
          className="hidden md:flex gap-8 text-black font-medium items-center bg-transparent"
        >
          
          <a href="#products" className=" hover:text-white transition-colors duration-500">Product</a>
          <a href="#stats" className=" hover:text-white transition-colors duration-500">Contact</a>

          <button
            id="login-btn"
            onClick={() => setLoginOpen(true)}
            className=" border border-[#0077ff] text-[#0077ff] px-5 py-1.5 rounded-full font-semibold cursor-pointer hover:bg-[#0077ff] transition-colors duration-500 hover:border-white hover:text-white"
          >
            Login
          </button>
        </nav>

        <button
          id="menu-btn"
          className="md:hidden text-3xl focus:outline-none hover:text-[#0077ff] transition-colors duration-500 hover:cursor-pointer"
        >
          ☰
        </button>

        <div
          id="mobile-menu"
          className=" z-50 fixed top-0 -right-full h-screen w-2/3 bg-white shadow-lg p-6 flex flex-col gap-6 text-lg font-medium md:hidden"
        >
          <button id="close-menu" className="text-3xl mb-4 text-gray-700 hover:cursor-pointer">×</button>

          <a href="#products" className=" border-b pb-2 hover:border-[#0077ff] transition-colors duration-500 hover:text-[#0077ff]">Product</a>
          <a href="#stats" className=" border-b pb-2 hover:border-[#0077ff] transition-colors duration-500 hover:text-[#0077ff]">Stats</a>

          <button
            id="login-btn-mobile"
            onClick={() => setLoginOpen(true)}
            className=" mt-4 border border-[#0077ff] text-[#0077ff] px-5 py-2 rounded-full font-semibold opacity-0"
          >
            Login
          </button>
        </div>

        <div
          id="overlay"
          className="fixed inset-0 bg-black/20 backdrop-blur-xs opacity-0 pointer-events-none md:hidde h-screen"
        ></div>
      </header>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />

      <Main />

      <Marquee
        items={["choose", "your", "style", "choose", "your", "style", "choose", "your", "style", "choose", "your", "style"]}

        className=" bg-linear-to-b to-[#58c2ff] from-[#0169a2] border-y-5 border-white text-white "

      />
      <Showcase />

      <Marquee
        items={["choose", "your", "style", "choose", "your", "style", "choose", "your", "style", "choose", "your", "style"]}

        className=" bg-linear-to-b to-[#58c2ff] from-[#0169a2] border-y-5 border-white text-white "
        reverse={true}

      />


      <Charts />
    </main>
  );
}

export default App;
