import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import leaf1 from "../assets/leaf1.png";
import leaf2 from "../assets/leaf2.png";
import leaf3 from "../assets/leaf3.png";
import leaf4 from "../assets/leaf4.png";
import leaf5 from "../assets/leaf5.png";
import png1 from "../assets/png1.png"
import png2 from "../assets/png2.png"
import png3 from "../assets/png3.png"
import png4 from "../assets/png4.png"

gsap.registerPlugin(ScrollTrigger);

const salads = [
  {
    id: 1,
    title: "Greek Salad",
    image: png1,
  },
  {
    id: 2,
    title: "Veggie Mix",
    image: png2,
  },
  {
    id: 3,
    title: "Avocado Bowl",
    image: png3,
  },
  {
    id: 4,
    title: "Fresh Greens",
    image: png4,
  },
];

export default function HeroDesktop() {
  const [active, setActive] = useState(0);

  const heroRef = useRef(null);
  const rightRef = useRef(null);
  const leftRef = useRef(null);
  const plateRef = useRef(null);
  const iconRefs = useRef([]);
  const leafRefs = useRef([]);
  const arc = useRef(null);

  const radius = 580;
  const STEP_ANGLE = 18;
  const arcRotation = useRef(0);

  /* 🍃 LEAF FLOAT */
  const startLeafAnimation = () => {
    leafRefs.current.forEach((leaf, i) => {
      if (!leaf) return;

      const depth = i < 2 ? 1 : i < 4 ? 0.8 : 0.6;

      gsap.timeline({ repeat: -1, yoyo: true })
        .to(leaf, {
          x: gsap.utils.random(-30, 30) * depth,
          y: gsap.utils.random(20, 50) * depth,
          rotate: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(5, 8),
          ease: "sine.inOut",
        })
        .to(leaf, {
          x: gsap.utils.random(-20, 20) * depth,
          y: gsap.utils.random(-15, 25) * depth,
          rotate: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(5, 8),
          ease: "sine.inOut",
        });
    });
  };

  /* 🧠 ARC POSITIONING */
  const positionIcons = (activeIndex) => {
    iconRefs.current.forEach((icon, i) => {
      if (!icon) return;

      const baseAngle = -165 + i * STEP_ANGLE;
      const angle =
        (baseAngle + arcRotation.current) * (Math.PI / 180);

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      gsap.to(icon, {
        x,
        y,
        scale: i === activeIndex ? 1.15 : 1,
        opacity: i === activeIndex ? 1 : 0.6,
        duration: 0.9,
        ease: "power3.inOut",
      });
    });
  };

  /* 🎬 INTRO SEQUENCE */
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 }
    )
    tl.fromTo(
      arc.current,
      { y: 500, x: 600, scale: 0.8, opacity: 0 },
      { y: 0, x: 0, scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" }
    );
   

    // 🥗 Plate
    tl.fromTo(
      plateRef.current,
      { y: 500, x: 600, scale: 0.8, opacity: 0 },
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
      }
    );

    // 📝 Left content
    tl.fromTo(
      leftRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=1.1"
    );

    // 🎯 Icons initial state
    tl.set(iconRefs.current, {
      x: 100,
      y: 100,
      scale: 0.6,
      opacity: 0,
    });

    // 🚀 Icons → arc
    tl.to(
      iconRefs.current,
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out",
        onStart: () => positionIcons(active),
        onComplete: startLeafAnimation,
      },
      "-=0.4"
    );
     tl.fromTo(
      leafRefs.current,
      {  scale: 0.8, opacity: 0 },
      { y: 0, x: 0, scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" } 
    )
  }, []);

  /* 🥗 CHANGE SALAD */
  const changeSalad = (index) => {
    if (index === active) return;

    arcRotation.current = -index * STEP_ANGLE;
    positionIcons(index);
    const tl2=gsap.timeline();

    tl2.to(plateRef.current, {
      // x: 420,
      y:-20,
      // rotate: 50,
      opacity: 0,
      duration: 1,
      scale: 0.8,
      ease: "power2.in",
      onComplete: () => {
        setActive(index);

        tl2.set(plateRef.current, {
          // x: 450,
          y:- 20,
          // rotate: 50,
          opacity: 0,
          scale: 0.8,
        });

        tl2.to(plateRef.current, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      },
    });
  };

  /* 🔥 SCROLL EXIT */
  useEffect(() => {
    gsap.to(rightRef.current, {
      x: 420,
      y: 200,
      scale: 0.7,
      opacity: 0,
      rotate: 4,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "-top 10%",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(leftRef.current, {
      y: -200,
      scale: 0.7,
      opacity: 0,
      rotate: 4,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 20%",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-[#FAFAF8] flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 px-6 gap-12">

        {/* LEFT */}
        <div ref={leftRef} className="flex flex-col justify-center max-w-lg">
          <span className="text-sm font-medium text-gray-500">
            Fresh • Nutritious • Handcrafted
          </span>

          <h1 className="mt-4 text-[52px] font-semibold text-gray-900">
            Healthy Salad
          </h1>
          <p className="text-red-600 text-[30px]  font-semibold">$24.00</p>

          <p className="mt-4 text-gray-600">
            A nutritionally complete bowl made with farm-fresh vegetables.
Balanced flavors, rich nutrients, and natural goodness.
Perfect for a light yet satisfying meal.
          </p>

          <button className="mt-8 w-44 px-2 py-3 rounded-full bg-[#99ff66] text-black">
            Order Now →
          </button>
        </div>

        {/* RIGHT */}
        <div
          ref={rightRef}
          className="relative w-[520px] h-[520px] flex items-center justify-center"
        >
          {/* 🌿 GREEN SEMICIRCLE — UNTOUCHED */}
          <div
          ref={arc}
            className="absolute w-[900px] h-[900px] rounded-full bg-[#EAF5EC]"
            style={{ right: "-550px", top: "-200px" }}
          />

          {/* Leaves */}
         {/* Leaf 1 – Foreground, top-right accent */}
<img
  ref={(el) => (leafRefs.current[0] = el)}
  src={leaf1}
  className="absolute w-28 top-6 right-32 opacity-80 blur-[0.2px] rotate-[8deg]"
/>

{/* Leaf 2 – Mid-depth, bottom-left balance */}
<img
  ref={(el) => (leafRefs.current[1] = el)}
  src={leaf2}
  className="absolute w-20 bottom-56 left-44   opacity-65 blur-[0.6px] -rotate-[12deg]"
/>

{/* Leaf 3 – Background, soft right filler */}
<img
  ref={(el) => (leafRefs.current[2] = el)}
  src={leaf3}
  className="absolute w-16 top-[45%] -right-44 opacity-45 blur-[1.2px] rotate-[18deg]"
/>

{/* Leaf 4 – Foreground, bottom-right anchor */}
<img
  ref={(el) => (leafRefs.current[3] = el)}
  src={leaf4}
  className="absolute w-24 bottom-10 right-12 opacity-75 blur-[0.3px] rotate-[-6deg]"
/>

{/* Leaf 5 – Background edge break */}
<img
  ref={(el) => (leafRefs.current[4] = el)}
  src={leaf5}
  className="absolute w-14 top-28 -right-44 opacity-35 blur-[1.4px] rotate-[22deg]"
/>

          {/* Plate */}
          
          <div
            ref={plateRef}
            className="relative z-10 w-[420px] h-[420px] rounded-full overflow-hidden -right-44"
          >
            <img
              src={salads[active].image}
              className="w-full h-full object-cover scale-[1.05]"
              alt=""
            />
          </div>

          {/* Arc Icons */}
          {salads.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => (iconRefs.current[i] = el)}
              onClick={() => changeSalad(i)}
              className="absolute z-20 w-14 h-14 top-[300px] -right-40 rounded-full bg-white shadow-lg overflow-hidden cursor-pointer"
              style={{ opacity: 0 }}
            >
              <img src={item.image} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}