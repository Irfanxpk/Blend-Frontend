import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loader = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (textRef.current && logoRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

      // Animation for each letter
      gsap.from(textRef.current.children, {
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.1,
      });

      // Animation for the logo (SVG)
      tl.fromTo(
        logoRef.current,
        { rotation: 0 },
        { rotation: 360, duration: 2, repeat: -1, ease: "linear" }
      );

      // Ensure the animation plays only once when the component mounts
      tl.play();
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <img
        className="logo"
        src="/src/assets/logo.svg"
        alt="Logo"
      />
      <p
        ref={textRef}
        className="text-blue-500 bg-gradient-to-b from-blue-300 to-blue-600 bg-clip-text text-transparent text-7xl font-BeadyReady"
      >
        {["B", "L", "E", "N", "D"].map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </p>
    </div>
  );
};

export default Loader;
