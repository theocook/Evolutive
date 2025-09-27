import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import ScrollRevealTitle from "../components/ScrollRevealTitle";
import StickyRevealCover from "../components/StickyRevealCover";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Team from "../components/Team";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer pour tes animations existantes
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const animateElements = document.querySelectorAll(".animation-ready");
    animateElements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);


  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Titre animé 2 lignes */}
        <ScrollRevealTitle
          line1="Faire émerger"
          line2="ce qui est déjà là."
        />
        <Hero />
        <StickyRevealCover
          line1="Faire émerger"
          line2="ce qui est déjà là."
          sectionHeight="h-[200vh]"   // plus petit = plus rapide
          stickyTop="top-1/2"
          speed={3}                  // augmente pour accélérer la révélation
          split={0.35}               // la 2e ligne commence un peu plus tôt
          coverOverlap="100vh"       // 100vh de recouvrement
          coverBg="bg-white/90"
          coverRadius="rounded-t-[80px]"
        >
          {/* contenu qui recouvre (intro, promesse, CTA, etc.) */}
          <p className="text-lg md:text-xl text-gray-700">
            EvolutiveS est un cabinet indépendant basé à Grandson, spécialisé en conseil stratégique et gestion de projet.
          </p>
          <p className="mt-4 text-2xl md:text-3xl font-medium text-gray-900">
            on clarifie, on structure et on fait avancer les choses, simplement.
          </p>
          <div className="mt-8 h-px bg-gray-200" />
        </StickyRevealCover>
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
