import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";



function Header() {
  gsap.registerPlugin(useGSAP);
 const ref = useRef<HTMLHeadingElement[]>([]);

  const pushRef = (el: HTMLHeadingElement) => ref.current.push(el!);
  
  useGSAP(
    () => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { x: 100, opacity: 0, duration: 1 },
          { x: 0, opacity: 1, duration: 1 }
        ); // <-- automatically reverted
      }
    },
    { scope:ref }
  );
 
      // gsap code here...
    // <-- scope is for selector text (optional)
  return (
    <>
      <div className=" w-full md:flex md:justify-center md:mt-16 mt-24 overflow-x-hidden ">
        <div className="  flex md:h-[40rem] flex-col md:w-2/5 w-full items-center justify-center md:mx-0 px-12 md:px-0 gap-5">
          <div ref={pushRef} className="flex items-center  md:hidden  ">
            <img
              width={500}
              src="src/assets/headerIllustration.svg"
              alt="Illustration"
            />
          </div>
          <div ref={pushRef} className="flex flex-col md:gap-5 gap-2">
            <h1 className="md:text-6xl text-4xl md:text-start  text-center md:pr-40 pr-1 font-bold font-serif bg-gradient-to-r from-[#78fae2] to-[#ffffff] inline-block text-transparent bg-clip-text ">
              GROUP CHAT THAT’S ALL FUN & COLLAB!
            </h1>
            <p className="text-lg md:pr-20  md:text-2xl text-sans ">
              Blend Where Developers Stream, Connect, and Innovate. Chat, video
              call, and collaborate effortlessly in dedicated channels designed
              for creativity and productivity.
            </p>
          </div>
        </div>
        <div
          ref={pushRef}
          className="md:w-2/5  items-center mt-28 hidden md:block"
        >
          <img
            width={500}
            src="src/assets/headerIllustration.svg"
            alt="Illustration"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
