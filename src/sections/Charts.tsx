import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MultiLineAxisTick } from "../components/MultiLineAxisTick";
import CustomBarLegend from "../components/CustomBarLegend";

import { useChartSize } from "../hooks/useChartSize"; // 👈 nuevo hook

export default function Charts() {
  const { w, h } = useChartSize(); // 👈 tamaño dinámico de charts

  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, []);

  // ────────────────────────────
  // DATOS
  // ────────────────────────────

  const radarData = [
    { stat: "Comfort", AirMax: 92, Pegasus: 85, Infinity: 88, Others: 60 },
    { stat: "Stability", AirMax: 80, Pegasus: 95, Infinity: 90, Others: 55 },
    { stat: "Durability", AirMax: 88, Pegasus: 90, Infinity: 94, Others: 58 },
    { stat: "Energy Return", AirMax: 75, Pegasus: 98, Infinity: 85, Others: 50 },
  ];

  const barData = [
    { model: "Air Max", speed: 78, response: 65, force: 40 },
    { model: "Pegasus", speed: 92, response: 90, force: 45 },
    { model: "Infinity", speed: 85, response: 82, force: 42 },
  ];

  const pieData = [
    { name: "Air Max", value: 30 },
    { name: "Pegasus", value: 45 },
    { name: "Infinity Run", value: 25 },
    { name: "Others", value: 10 },
  ];

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="w-full py-20 px-6 md:px-16 bg-white mt-10 rounded-3xl shadow-lg"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Performance & Comfort Analysis
      </h2>

      <div className="flex w-full justify-evenly items-center gap-10 flex-wrap">
        
        {/* BAR */}
        {/* RADAR */}
        <div
          ref={(el) => {cardsRef.current[0] = el}}
          className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 opacity-0 translate-y-[60px] flex flex-col items-center w-fit"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Comfort Breakdown
          </h3>

          <RadarChart width={w} height={h} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="stat" tick={<MultiLineAxisTick />} />

            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Air Max" dataKey="AirMax" fill="#4dabff" fillOpacity={0.6} />
            <Radar name="Pegasus" dataKey="Pegasus" fill="#0077ff" fillOpacity={0.6} />
            <Radar name="Infinity Run" dataKey="Infinity" fill="#58c2ff" fillOpacity={0.6} />
            <Radar name="Others" dataKey="Others" stroke="#999" fill="#ccc" fillOpacity={0.4} />
            <Legend />
          </RadarChart>
        </div>
        <div
          ref={(el) => {cardsRef.current[1] = el}}
          className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 opacity-0 translate-y-[60px] flex flex-col items-center w-fit"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Running Speed & Response
          </h3>

          <BarChart width={w} height={h} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="model" />
            <YAxis />
            <Tooltip />
            <Legend content={<CustomBarLegend />} />

            <Bar dataKey="speed" fill="#58c2ff" />
            <Bar dataKey="response" fill="#0077ff" />
            <Bar dataKey="force" fill="#bbbbbb" />
          </BarChart>
        </div>

        {/* PIE */}
        <div
          ref={(el) => {cardsRef.current[2] = el}}
          className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 opacity-0 translate-y-[60px] flex flex-col items-center w-fit"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Popularity Among Runners
          </h3>

          <PieChart width={w} height={h}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={h / 3}
              fill="#0077ff"
              dataKey="value"
              label
            />
            <Tooltip />
          </PieChart>
        </div>

      </div>
    </section>
  );
}
