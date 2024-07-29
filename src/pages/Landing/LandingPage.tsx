import  { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import { gsap } from "gsap";
import DotBackground from "../../components/client/landingComponents/DotBackground";
import Nav from "../../components/client/landingComponents/Nav";
import Header from "../../components/client/landingComponents/Header";

// interface LandingPageProps {
//   // Define props here if needed
// }

function LandingPage() {
  const landingPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (landingPageRef.current) {
      gsap.fromTo(
        landingPageRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 3 }
      );
    }
  }, []);

  return (
    <>
      <Nav></Nav>
      <DotBackground>
        <div className="landing-page text-white ">
          <Header>{/* Header content */}</Header>
          <main ref={landingPageRef}>
            {/* <section className="hero-section ">
              <h1>Welcome to Blend</h1>
              <p>Discover, connect, and collaborate.</p>
            </section>
            <section className="content-section">
              <p>
                This is where you can provide detailed information about your
                platform.
              </p>
              <p>
                Include links or buttons to direct users to login or explore
                more.
              </p>
              <Link to="/home" className="btn btn-primary">
                Go to Home
              </Link>
            </section> */}
          </main>
          <footer>{/* Footer content */}</footer>
        </div>
      </DotBackground>
    </>
  );
}

export default LandingPage;
