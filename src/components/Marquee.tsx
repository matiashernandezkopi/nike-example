import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef } from "react";



gsap.registerPlugin(Observer);


interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
}

const Marquee = ({
  items,
  className = "text-white bg-black",
  reverse = false,
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLSpanElement[]>([]);

  /** ========= Horizontal Loop Function (GSAP) ========= **/
  function horizontalLoop(
    items: HTMLElement[],
    config: {
      repeat?: number;
      paused?: boolean;
      speed?: number;
      snap?: number | false;
      paddingRight?: number;
      reversed?: boolean;
    } = {}
  ) {
    items = gsap.utils.toArray(items) as HTMLElement[];
    const tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    });

    const length = items.length;
    const startX = items[0].offsetLeft;

    const times: number[] = [];
    const widths: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;

    const pixelsPerSecond = (config.speed ?? 1) * 100;

    const snap =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap(config.snap || 1);

    let totalWidth = 0;

    // Convert to xPercent
    gsap.set(items, {
      xPercent: (i, el) => {
        const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number)
        );
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth +
      (config.paddingRight || 0);

    // Build GSAP timeline
    items.forEach((item, i) => {
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;
      const distanceToLoop = distanceToStart + widths[i];

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) /
              pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        );

      times[i] = distanceToStart / pixelsPerSecond;
    });

    // Go to specific index
    function toIndex(index: number, vars: gsap.TweenVars = {}) {
      const lengthWrapped = gsap.utils.wrap(0, length, index);
      const time = times[lengthWrapped];

      vars.overwrite = true;

      curIndex = lengthWrapped;
      return tl.tweenTo(time, vars);
    }

    tl.toIndex = (index: number, vars?: gsap.TweenVars) =>
      toIndex(index, vars);
    tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);

    tl.progress(1).progress(0);

    if (config.reversed) {
      tl.vars.onReverseComplete!();
      tl.reverse();
    }

    return tl;
  }

  /** ========= Setup Effect ========= **/
  useEffect(() => {
    if (itemsRef.current.length === 0) return;

    const tl = horizontalLoop(itemsRef.current as HTMLElement[], {
      repeat: -1,
      paddingRight: 30,
      reversed: reverse,
    });

    const observer = Observer.create({
      onChangeY(self) {
        let factor = 2.5;
        if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
          factor *= -1;
        }

        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tl, { timeScale: factor * 2.5, duration: 0.2 })
          .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
      },
    });

    return () => {
      tl.kill();
      observer.kill();
    };
  }, [items, reverse]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center uppercase whitespace-nowrap ${className}`}
    >
      <div className="flex">
        {items.map((text, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="flex items-center text-4xl px-16 font-bold"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
