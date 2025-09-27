// src/components/StickyRevealCover.jsx
import React, { useEffect, useRef } from "react";

/**
 * StickyRevealCover
 * - Titre 2 lignes, révélation séquentielle via clip-path
 * - Texte sticky centré (ne “monte” pas)
 * - Section suivante qui recouvre avec arrondi et fond semi-transparent
 *
 * Props utiles :
 * line1, line2                 : contenus des 2 lignes
 * sectionHeight="h-[200vh]"    : durée de vie du sticky (plus grand = plus long)
 * stickyTop="top-1/2"          : position verticale du sticky (garde top-1/2)
 * baseClass="text-gray-100"    : couleur de base
 * revealClass="text-[#1d354a]" : couleur révélée
 * sizeClass="text-5xl md:text-8xl"
 * fontClass="font-ninna"
 * speed=2.5                    : accélération de la révélation (plus haut = plus rapide)
 * split=0.5                    : moment où la 2e ligne démarre (0..1)
 * coverOverlap="100vh"         : à quel moment la section suivante commence à recouvrir
 * coverBg="bg-white/90"        : fond de la section recouvrante (semi-transparent)
 * coverRadius="rounded-t-[80px]"
 *
 * La section recouvrante accepte des enfants : place ton contenu dedans.
 */
export default function StickyRevealCover({
  line1 = "Faire émerger",
  line2 = "ce qui est déjà là.",
  sectionHeight = "h-[200vh]",
  stickyTop = "top-1/2",
  baseClass = "text-gray-100",
  revealClass = "text-[#1d354a]",
  sizeClass = "text-5xl md:text-8xl",
  fontClass = "font-ninna",
  speed = 2.5,
  split = 0.5,
  coverOverlap = "100vh",
  coverBg = "bg-white/90",
  coverRadius = "rounded-t-[80px]",
  children,
}) {
  const sectionRef = useRef(null);
  const l1Ref = useRef(null);
  const l2Ref = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const l1 = l1Ref.current;
    const l2 = l2Ref.current;
    if (!el || !l1 || !l2) return;

    let raf = 0;
    let ticking = false;

    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

    const update = () => {
      ticking = false;

      const rect = el.getBoundingClientRect();
      const end = rect.height || 1;

      // progression 0→1 pendant la traversée de la section
      const y = clamp(-rect.top, 0, end);
      const progress = clamp(y / end, 0, 1);

      // révélation séquentielle avec vitesse ajustable
      const p1 = clamp(progress * speed, 0, 1);
      const p2 = clamp((progress - split) * speed, 0, 1);

      const right1 = 100 - p1 * 100;
      const right2 = 100 - p2 * 100;

      l1.style.clipPath = `inset(0 ${right1}% 0 0)`;
      l2.style.clipPath = `inset(0 ${right2}% 0 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, split]);

  return (
    <section
      ref={sectionRef}
      // dégradé clair → bleu foncé + hauteur contrôlant la durée
      className={`relative z-0 ${sectionHeight} select-none bg-gradient-to-r from-gray-100 to-[#1d354a]`}
    >
      {/* bloc sticky centré, ne bouge pas, reste recouvrable */}
      <div className={`sticky ${stickyTop} -translate-y-1/2 z-10 px-6`}>
        <div className="relative inline-block text-center leading-tight min-h-[340px]">
          {/* calque de base */}
          <h1 className={`relative z-[1] ${sizeClass} tracking-tight ${fontClass} ${baseClass}`}>
            <span className="block">{line1}</span>
            <span className="block">{line2}</span>
          </h1>

          {/* calque révélé au-dessus, masqué par clip-path */}
          <h1
            className={`absolute inset-0 z-[2] ${sizeClass} tracking-tight ${fontClass} ${revealClass} overflow-hidden`}
            aria-hidden="true"
          >
            <span
              ref={l1Ref}
              className="block"
              style={{ clipPath: "inset(0 100% 0 0)", willChange: "clip-path" }}
            >
              {line1}
            </span>
            <span
              ref={l2Ref}
              className="block"
              style={{ clipPath: "inset(0 100% 0 0)", willChange: "clip-path" }}
            >
              {line2}
            </span>
          </h1>
        </div>
      </div>

      {/* section recouvrante : commence plus tôt et passe au-dessus */}
      <div
        className={`relative z-20 -mt-[${coverOverlap}] pt-[${coverOverlap}] ${coverBg} ${coverRadius} overflow-hidden backdrop-blur-sm`}
      >
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          {children}
        </div>
      </div>
    </section>
  );
}
