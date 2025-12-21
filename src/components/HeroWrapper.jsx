import { useEffect, useState } from "react";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export default function HeroWrapper() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    /* 👇 THIS IS THE IMPORTANT PART */
    <section id="home" className="scroll-mt-28">
      {isMobile ? <HeroMobile /> : <HeroDesktop />}
    </section>
  );
}
