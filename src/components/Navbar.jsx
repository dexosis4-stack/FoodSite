import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // INTRO ANIMATION
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    ).fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // 🔥 MAGNETIC LINK HOVER
    const links = gsap.utils.toArray(".nav-link");

    links.forEach((link) => {
      const underline = link.querySelector(".nav-underline");

      const enter = () => {
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.4,
          ease: "power3.out",
          transformOrigin: "left",
        });

        gsap.to(link, {
          y: -2,
          color: "#111827",
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const leave = () => {
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.3,
          ease: "power3.in",
          transformOrigin: "right",
        });

        gsap.to(link, {
          y: 0,
          color: "#4b5563",
          duration: 0.3,
          ease: "power3.out",
        });
      };

      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);

      // Cleanup (important)
      return () => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      };
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className=" fixed top-6 left-0 right-0 z-50 flex justify-center"
    >
      <nav
        ref={navRef}
        className="
          flex items-center justify-between
          w-[90%] max-w-6xl
          px-6 py-3
          rounded-full
          bg-white/70 backdrop-blur-xl
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        "
      >
        {/* LOGO */}
        <div className="text-lg font-semibold tracking-wide text-gray-900">
          Salad<span className="text-green-600">.</span>
        </div>

        {/* LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          {["Home", "Menu", "Nutrition", "Recipes"].map((item) => (
            <li
              key={item}
              className="nav-link relative cursor-pointer px-1"
            >
              {item}
              <span
                className="
                  nav-underline
                  absolute left-0 -bottom-1
                  h-[2px] w-full
                  bg-green-500
                  scale-x-0
                "
              />
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="
            px-5 py-2
            rounded-full
            bg-[#99ff66] text-black text-sm font-medium
            transition-all duration-300
            shadow-md shadow-green-200
            hover:shadow-[0_8px_24px_rgba(34,197,94,0.35)]
            hover:scale-105
            cursor-pointer
          "
        >
          Order Now
        </button>
      </nav>
    </header>
  );
}
