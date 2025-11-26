import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import RSideHome from "../components/RSideHome";

const Main = () => {
  useGSAP(() => {
    gsap.from("#hero-text", { xPercent: -20, opacity: 0 })
  });
  return (
    <section className="relative flex flex-col justify-between md:flex-row min-h-screen overflow-hidden w-full pt-15 gap-y-10 ">

      {/* Left Section */}
      <div id="hero-text" className="flex flex-col justify-center px-10 md:px-24 z-40 w-full md:w-1/2 gap-6 md:pb-35 text-center md:text-left items-center md:items-start">
        <h2 className="text-[#3ba4ff] font-bold text-3xl md:text-4xl">SPORT</h2>
        <h1 className="text-black text-5xl md:text-6xl font-extrabold">Landing Page</h1>
        <p className="text-gray-600 max-w-md leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>

        <div className="flex gap-4 pt-4">
          <button className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition">
            LOGIN
          </button>
          <button className="border border-[#3ba4ff] text-[#3ba4ff] px-6 py-2 rounded-full font-semibold hover:bg-[#3ba4ff] hover:text-white transition">
            START TRIAL
          </button>
        </div>
      </div>

      {/* Right Section */}
      <RSideHome/>
      
    </section>
  )
}

export default Main