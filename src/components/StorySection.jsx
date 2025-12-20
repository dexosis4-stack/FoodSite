import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import leaf1 from "../assets/leaf1.png";
import leaf2 from "../assets/leaf2.png";
import leaf3 from "../assets/leaf3.png";
import storyPng from "../assets/storyPng.png";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const heroRef = useRef(null);
  const plateRef = useRef(null);
  const arcRef = useRef(null);
  const leftRef = useRef(null);
  const leafRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // 1️⃣ White arc (slow, background)
      tl.fromTo(
        arcRef.current,
        { x: 120, scale: 1.05, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
        }
      );

      // 2️⃣ Plate (foreground)
      tl.fromTo(
        plateRef.current,
        { x: 180, scale: 0.9, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.9"
      );

      // 3️⃣ Left text
      tl.fromTo(
        leftRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // 4️⃣ Leaves entry
      tl.fromTo(
        leafRefs.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.7"
      );

      // 5️⃣ Continuous floating leaves
      leafRefs.current.forEach((leaf, i) => {
        gsap.to(leaf, {
          y: 30,
          rotate: 15,
          duration: 5 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-[#FAFAF8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <div ref={leftRef} className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
            Fuel Your Body with{" "}
            <span className="text-[#4cdc04]">Nutrient-Rich Salads</span>
          </h1>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Eating healthy has never been this tasty! Our salads are packed with
            superfoods, proteins, and fresh greens to keep you energized all day.
          </p>

          <button className="mt-8 px-6 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 cursor-pointer hover:text-[#bdff9c] transition">
            Order Now
          </button>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex items-center justify-center">

          {/* WHITE ARC (ANIMATED) */}
          <div
            ref={arcRef}
            className="absolute -right-[420px] top-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-0"
            style={{
              background: `
                radial-gradient(
                  circle,
                  transparent 58%,
                  rgba(255,255,255,0.96) 60%,
                  rgba(255,255,255,0.96) 66%,
                  rgba(240,240,240,0.85) 70%,
                  rgba(230,230,230,0.35) 76%
                )
              `,
              boxShadow: "inset -8px 0 16px rgba(0,0,0,0.04)",
            }}
          />

          {/* Floating leaves */}
          <img
            ref={(el) => (leafRefs.current[0] = el)}
            src={leaf1}
            className="absolute w-20 top-0 left-50 opacity-0"
            alt=""
          />
          <img
            ref={(el) => (leafRefs.current[1] = el)}
            src={leaf2}
            className="absolute w-16 bottom-10 right-6 opacity-0"
            alt=""
          />
          <img
            ref={(el) => (leafRefs.current[2] = el)}
            src={leaf3}
            className="absolute w-12 top-1/2 right-0 opacity-0"
            alt=""
          />

          {/* Plate */}
          <div
            ref={plateRef}
            className="relative z-10 left-20 w-[380px] h-[380px] rounded-full overflow-hidden opacity-0"
           
          >
            <img
              src={storyPng}
              className="w-full h-full object-cover scale-[1.05]"
              alt="Salad Bowl"
            />

            <div
              className="absolute  pointer-events-none"
              
            />
          </div>
        </div>
      </div>
    </section>
  );
}
