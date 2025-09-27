// src/components/ScrollRevealTwoLine.js
import React, { useEffect, useRef } from "react";

import Logo from "../assets/logos/EvolutiveS-Logo.png";

/**
 * Effet 2 lignes avec révélation séquentielle au scroll
 * — même structure et animations que dans ton Home.js d’origine :
 *   - section haute h-[120vh]
 *   - bloc sticky top-[30vh]
 *   - double calque (base grise + calque couleur) avec clip-path
 *
 * Props (toutes optionnelles) :
 * - line1, line2 : contenus des 2 lignes
 * - baseClass    : classes tailwind du calque de base (gris clair)
 * - revealClass  : classes tailwind du calque révélé (couleur finale)
 * - fontClass    : classes de font (ex: "font-ninna")
 * - sizeClass    : taille du titre (ex: "text-5xl md:text-8xl")
 * - sectionHeight: hauteur de la section (ex: "h-[120vh]")
 * - stickyTop    : position sticky top (ex: "top-[30vh]")
 */
export default function ScrollRevealTwoLine({
  line1 = "Faire émerger",
  line2 = "ce qui est déjà là !",
  baseClass = "text-gray-200",
  revealClass = "text-[#1d354a]",
  fontClass = "font-ninna",
  sizeClass = "text-5xl md:text-8xl",
  sectionHeight = "h-[300vh]",
  stickyTop = "top-[50%]",
}) {
  const sectionRef = useRef(null);
  const lineRef1 = useRef(null);
  const lineRef2 = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const l1 = lineRef1.current;
    const l2 = lineRef2.current;
    if (!section || !l1 || !l2) return;

    let rafId = 0;
    let ticking = false;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const update = () => {
      ticking = false;

      const rect = section.getBoundingClientRect();
      const end = rect.height || 1;

      // progression 0 → 1 : démarre à 0 à l’arrivée sur la page
      const y = clamp(-rect.top, 0, end);
      const progress = clamp(y / end, 0, 1);

      // ligne 1 sur la première moitié, ligne 2 sur la seconde
      const p1 = clamp(progress * 4.2, 0, 1);
      const p2 = clamp((progress - 0.185) * 4.2, 0, 1);

      // ouverture de gauche → droite via clip-path
      const right1 = 100 - p1 * 100;
      const right2 = 100 - p2 * 100;

      l1.style.clipPath = `inset(0 ${right1}% -20px 0)`;
      l2.style.clipPath = `inset(0 ${right2}% -20px 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };

    // init
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative z-0 ${sectionHeight} select-none bg-gradient-to-r from-gray-100 to-[#1d354a]`}
    >
      <div className={`pointer-events-none sticky ${stickyTop} -translate-y-1/2 z-0 flex px-6 ml-12`}>
        <div className="relative inline-block leading-tight min-h-[340px]">
          {/* calque de base */}
          <h1 className={`relative z-[1] ${sizeClass} tracking-tight ${fontClass} ${baseClass}`}>
            <img src={Logo} alt="Evolutive logo" className="h-24 w-auto mb-8" />
            <span className="block">{line1}</span>
            <span className="block">{line2}</span>
          </h1>

          {/* calque révélé */}
          <h1
            className={`absolute inset-0 z-[2] ${sizeClass} tracking-tight ${fontClass} ${revealClass} overflow-hidden`}
            aria-hidden="true"
          >
            <img src={Logo} alt="Evolutive logo" className="h-24 w-auto mb-8" />
            <span
              ref={lineRef1}
              className="block"
              style={{ clipPath: "inset(0 100% 0 0)", willChange: "clip-path" }}
            >
              {line1}
            </span>
            <span
              ref={lineRef2}
              className="block"
              style={{ clipPath: "inset(0 100% 0 0)", willChange: "clip-path" }}
            >
              {line2}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
