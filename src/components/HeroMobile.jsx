import { useEffect, useState } from "react";
import png1 from "../assets/png1.png";
import png2 from "../assets/png2.png";
import png3 from "../assets/png3.png";
import png4 from "../assets/png4.png";

const salads = [png1, png2, png3, png4];

export default function HeroMobile() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1️⃣ Fade out
      setVisible(false);

      // 2️⃣ Change image after fade-out
      setTimeout(() => {
        setActive((prev) => (prev + 1) % salads.length);
        setVisible(true); // 3️⃣ Fade in
      }, 350); // fade-out duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
   
      className="
        min-h-screen
        bg-[#FAFAF8]
        px-6
        pt-24
        pb-10
      "
    >
      <span className="text-sm text-gray-500">
        Fresh • Nutritious • Handcrafted
      </span>

      <h1 className="mt-3 text-4xl font-semibold text-gray-900">
        Healthy Salad
      </h1>

      <p className="text-red-600 text-2xl font-semibold mt-1">$24.00</p>

      <p className="mt-4 text-gray-600 leading-relaxed">
        A nutritionally complete bowl made with farm-fresh vegetables.
        Balanced flavors, rich nutrients, and natural goodness.
      </p>

      <button className="mt-6 px-8 py-3 rounded-full bg-[#99ff66] font-medium active:scale-95 transition">
        Order Now →
      </button>

      {/* IMAGE WITH FADE */}
      <div className="mt-10 flex justify-center">
        <div className="w-[280px] h-[280px] rounded-full overflow-hidden">
          <img
            src={salads[active]}
            alt=""
            className={`
              w-full h-full object-cover
              transition-opacity duration-300 ease-in-out
              ${visible ? "opacity-100" : "opacity-0"}
            `}
          />
        </div>
      </div>
    </section>
  );
}
