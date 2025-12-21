import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Menu,
  X,
  Leaf,
  Utensils,
  Apple,
  Users,
} from "lucide-react";

export default function Navbar() {
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [open, setOpen] = useState(false);

  /* ---------------- SCROLL HELPER ---------------- */
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpen(false); // close mobile menu
  };

  /* ---------------- INTRO ---------------- */
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  /* ---------------- MOBILE MENU ANIMATION ---------------- */
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (open) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          pointerEvents: "auto",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.98,
        duration: 0.3,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center"
    >
      <nav
        ref={navRef}
        className="
          relative
          flex items-center justify-between
          w-[90%] max-w-6xl
          px-6 py-3
          rounded-full
          bg-white/70 backdrop-blur-xl
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        "
      >
        {/* LOGO */}
        <div
          onClick={() => scrollToSection("home")}
          className="text-lg font-semibold tracking-wide text-gray-900 flex items-center gap-1 cursor-pointer"
        >
          Salad<span className="text-green-600">.</span>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <NavItem label="Home" onClick={() => scrollToSection("home")} />
          <NavItem label="Menu" onClick={() => scrollToSection("menu")} />
          <NavItem label="Nutrition" onClick={() => scrollToSection("nutrition")} />
          <NavItem label="Connect" onClick={() => scrollToSection("connect")} />
        </ul>

        {/* DESKTOP CTA */}
        <button
          onClick={() => scrollToSection("menu")}
          className="
            hidden md:inline-flex
            px-5 py-2
            rounded-full
            bg-[#99ff66] text-black text-sm font-medium
            transition-all duration-300
            shadow-md shadow-green-200
            hover:shadow-[0_8px_24px_rgba(34,197,94,0.35)]
            hover:scale-105
          "
        >
          Order Now
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="
            md:hidden
            p-2 rounded-full
            bg-green-100 text-green-700
            active:scale-95 transition
          "
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* MOBILE MENU */}
        <div
          ref={mobileMenuRef}
          className="
            absolute top-[110%] left-0 right-0
            mx-auto
            w-[95%]
            rounded-3xl
            bg-white
            shadow-[0_20px_40px_rgba(0,0,0,0.12)]
            p-6
            opacity-0 pointer-events-none
          "
        >
          <ul className="flex flex-col gap-4">
            <MobileItem icon={Leaf} label="Home" onClick={() => scrollToSection("home")} />
            <MobileItem icon={Utensils} label="Menu" onClick={() => scrollToSection("menu")} />
            <MobileItem icon={Apple} label="Nutrition" onClick={() => scrollToSection("nutrition")} />
            <MobileItem icon={Users} label="Connect" onClick={() => scrollToSection("connect")} />
          </ul>

          <button
            onClick={() => scrollToSection("menu")}
            className="
              mt-6 w-full
              py-3 rounded-full
              bg-[#99ff66] text-black font-medium
              active:scale-95 transition
            "
          >
            Order Now →
          </button>
        </div>
      </nav>
    </header>
  );
}

/* ---------------- DESKTOP ITEM ---------------- */
function NavItem({ label, onClick }) {
  return (
    <li
      onClick={onClick}
      className="relative cursor-pointer px-1 group"
    >
      {label}
      <span
        className="
          absolute left-0 -bottom-1
          h-[2px] w-full
          bg-green-500
          scale-x-0
          group-hover:scale-x-100
          transition-transform duration-300
          origin-left
        "
      />
    </li>
  );
}

/* ---------------- MOBILE ITEM ---------------- */
function MobileItem({ icon: Icon, label, onClick }) {
  return (
    <li
      onClick={onClick}
      className="
        flex items-center gap-3
        text-gray-700 font-medium
        px-4 py-3
        rounded-xl
        hover:bg-green-50
        transition
        cursor-pointer
      "
    >
      <Icon size={20} className="text-green-600" />
      {label}
    </li>
  );
}
