import React, { useRef } from "react";
import Navbar from "./Navbar";
import SaladHero from "./Hero";
import StorySection from "./StorySection";
import PopularMenu from "./PopularMenu";
import Footer from "./Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Landing = () => {
  const landingRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(landingRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity",
      });
    },
    { scope: landingRef }
  );

  return (
    <div
      ref={landingRef}
      className="landing"
      style={{ opacity: 0 }}
    >
      <Navbar />
      <SaladHero />
      <StorySection />
      <PopularMenu />
      <Footer />
    </div>
  );
};

export default Landing;
