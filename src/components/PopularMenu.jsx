import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import cardpng1 from "../assets/cardpng1.png";
import cardpng2 from "../assets/cardpng2.png";
import cardpng3 from "../assets/cardpng3.png";
import cardpng4 from "../assets/cardpng4.png";

gsap.registerPlugin(ScrollTrigger);

const menu = [
  {
    title: "Paneer Salad",
    price: "$15",
    description: "Soft paneer cubes paired with fresh greens,\nlightly seasoned for a rich yet balanced taste.\nA wholesome bowl that feels both filling and fresh.",
    img: cardpng1,
  },
  {
    title: "Cabbage Salad",
    price: "$5",
    description: "Crisp cabbage tossed with fresh vegetables,\nbringing a light crunch in every bite.\nSimple, refreshing, and perfect for everyday meals.",
    img: cardpng2,
  },
  {
    title: "Crunchy Salad",
    price: "$10",
    description: "A colorful mix of crunchy vegetables,\nlayered with bold textures and fresh flavors.\nMade to satisfy cravings without feeling heavy.",
    img: cardpng3,
  },
  {
    title: "New Veg Salad",
    price: "$15",
    description: "A modern blend of seasonal vegetables,\ncrafted for freshness and natural taste.\nClean, vibrant, and easy to enjoy anytime.",
    img: cardpng4,
  },
];


export default function PopularMenu() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 35%",
        },
      });

      /* HEADER TEXT */
      tl.fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      /* FILTER PILLS */
      tl.fromTo(
        filterRef.current.children,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },"-=0.8",
      );

      /* MENU CARDS */
      gsap.set(cardsRef.current, {
        x: 160,
        opacity: 0,
        scale: 0.94,
      });

      tl.to(
        cardsRef.current,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.7,
          ease: "power3.out",
        },"-=0.9",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="menu"
      ref={sectionRef}
      className="bg-[#f0fbee] py-28 relative z-40 rounded-b-[55px] overflow-hidden shadow-2xl  shadow-black/25"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* HEADER */}
        <div ref={headerRef}>
          <span className="text-sm text-[#49db00] font-medium tracking-wide">
            Our Popular Menu
          </span>

          <h2 className="mt-3 text-4xl font-semibold text-gray-900">
            Discover our best-selling salads
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Crafted with the freshest ingredients and balanced flavors
            to keep you healthy and satisfied.
          </p>
        </div>

        {/* FILTER PILLS */}
        <div
          ref={filterRef}
          className="mt-10 flex justify-center gap-3 flex-wrap"
        >
          {["All", "Top Rated", "New Items", "Green Salad", "Healthy"].map(
            (item, i) => (
              <button
                key={i}
                className={`px-5 py-2 rounded-full text-sm transition
                ${
                  i === 0
                    ? "bg-[#99ff66] text-black"
                    : "bg-white text-gray-600 hover:bg-green-50"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* MENU GRID */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {menu.map((item, i) => {
            const isCenter = i === 1;

            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`
                  bg-[#fcfffb] shadow-md shadow-green-200 rounded-2xl p-6
                  transition-all duration-500 ease-out cursor-pointer
                  ${
                    isCenter
                      ? "scale-100 opacity-100 shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
                      : "scale-[0.94] opacity-80 shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                  }
                  hover:scale-100 hover:opacity-100
                  hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]
                `}
              >
                <div className=" relative w-32 h-32 mx-auto rounded-full ">
                  <img
                    src={item.img}
                    alt={item.title}
                    className=" absolute -top-20  rounded-full object-cover w-full h-full"
                  />
                </div>

                <h3 className=" text-start font-medium text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-start text-sm text-gray-500">
                 {item.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-semibold text-gray-900 text-lg">
                    {item.price}
                  </span>

                  <button className="px-4 py-2 rounded-full text-sm bg-[#85f84b] text-black hover:bg-[#99ff66] transition">
                    + Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <button className="px-8 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 hover:text-[#baf99a] cursor-pointer transition">
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
}
