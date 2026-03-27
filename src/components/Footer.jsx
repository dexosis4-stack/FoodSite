import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";

export default function Footer() {
  const footerRef = useRef(null);
  const colsRef = useRef([]);
  const bottomRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(colsRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(bottomRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
    id="connect"
      ref={footerRef}
      className="
        relative z-10
        bg-[#bdff67]
        -mt-32
        pt-60 pb-[130px]
        rounded-t-[48px]
      "
    >
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-900">

        {/* Address */}
        <div ref={(el) => (colsRef.current[0] = el)}>
          <h4 className="font-semibold mb-4">Address</h4>
          <p className="leading-relaxed">
            123 Salad Street, Foodie Town,<br />
            NY 56789
          </p>
          <p className="mt-3 font-medium">+1 (555) 123-4567</p>
          <p className="text-gray-700">info@saladit.com</p>
        </div>

        {/* Opening Hours */}
        <div ref={(el) => (colsRef.current[1] = el)}>
          <h4 className="font-semibold mb-4">Opening hours</h4>
          <p>Mon – Fri</p>
          <p className="text-gray-700 mb-2">11:00 AM – 11:00 PM</p>
          <p>Sat – Sun</p>
          <p className="text-gray-700">12:00 PM – 12:00 AM</p>
        </div>

        {/* Quick Links */}
        <div ref={(el) => (colsRef.current[2] = el)}>
          <h4 className="font-semibold mb-4">Quick links</h4>
          <ul className="space-y-2">
            {["Home", "About", "Contact"].map((item) => (
              <li
                key={item}
                className="cursor-pointer text-gray-800 hover:text-black transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div ref={(el) => (colsRef.current[3] = el)}>
          <h4 className="font-semibold mb-4">Social Media</h4>

          <div className="flex gap-4">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }, i) => (
              <button
                key={i}
                aria-label={label}
                className="
                  w-10 h-10
                  rounded-full
                  bg-black/90
                  flex items-center justify-center
                  text-white
                  transition-all duration-300
                  hover:scale-110 hover:bg-black
                  focus:outline-none
                "
              >
                <Icon size={18} strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        ref={bottomRef}
        className="
          border-t border-black/10
          mt-14 pt-5
          flex flex-col md:flex-row
          justify-between items-center
          text-xs text-black/70
          px-8
        "
      >
       
        <div className="flex gap-4 mt-3 md:mt-0 text-center">
          <span className="cursor-pointer hover:text-black">Terms of Use</span>
          <span className="cursor-pointer hover:text-black">Privacy Policy</span>
          <span className="cursor-pointer hover:text-black">
            Cookie Settings | Do Not Sell My Personal Information
          </span>
        </div>
      </div>
    </footer>
  );
}
