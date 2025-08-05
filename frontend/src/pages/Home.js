import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Team from "../components/Team";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  const observerRef = useRef();

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all elements with animation-ready class
    const animateElements = document.querySelectorAll(".animation-ready");
    animateElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;