import { useState } from "react";
import { motion } from "framer-motion";

/**
 * MorphingLogo – effet « aspiré puis ressort » avec timings entrée/sortie et délai configurable
 *
 * Nouveauté: possibilité d'attendre avant que le logo complet apparaisse
 * via fullDelayIn (par défaut égal à suckDurationIn + travelDelayIn).
 */
export default function MorphingLogo({
  srcSmall,
  srcFull,
  width = 260,
  height = 86,
  // Entrée (hover true)
  suckDurationIn = 0.45,
  travelDelayIn = 0.45,
  popDurationIn = 0.45,
  revealDurationIn = 1.0,
  // Sortie (hover false)
  suckDurationOut = 0.35,
  travelDelayOut = 1,
  popDurationOut = 0.4,
  revealDurationOut = 0.9,
  // Easing
  suckEaseIn = [0.2, 0.8, 0.2, 1],
  popEaseIn = [0.25, 0.9, 0.25, 1],
  revealEaseIn = [0.2, 0.8, 0.2, 1],
  suckEaseOut = [0.2, 0.8, 0.2, 1],
  popEaseOut = [0.2, 0.8, 0.2, 1],
  revealEaseOut = [0.2, 0.8, 0.2, 1],
  // Offsets et échelles
  lStartOffset = { x: 0, y: 0 },
  lTargetOffset = { x: 50, y: 0 },
  lStartScale = 1,
  lTargetScale = 0.92,
  // Rayon du « trou »
  holeRadiusStart = 60, // %
  holeRadiusEnd = 0,    // %
  // Délais spécifiques pour le logo complet (facultatifs)
  fullDelayIn,   // si non défini, calculé = suckDurationIn + travelDelayIn
  fullDelayOut = 0,
  className = "",
  altSmall = "Logo réduit L",
  altFull = "Logo complet EvolutiveS",
  debug = false,
}) {
  const [hovered, setHovered] = useState(false);

  // Délais cumulés
  const totalDelayPopIn = suckDurationIn + travelDelayIn;
  const totalDelayPopOut = suckDurationOut + travelDelayOut;
  const computedFullDelayIn =
    typeof fullDelayIn === "number" ? fullDelayIn : suckDurationIn + travelDelayIn;

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      role="img"
      aria-label="Animation logo EvolutiveS"
      tabIndex={0}
    >
      {/* Calque 1: logo complet – wipe gauche→droite avec délai configurable */}
      <motion.div
        className="absolute inset-0"
        style={{ willChange: "clip-path, opacity" }}
        initial={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0.95 }}
        animate={{
          clipPath: hovered ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
          opacity: hovered ? 1 : 0.95,
        }}
        transition={{
          duration: hovered ? revealDurationIn : revealDurationOut,
          ease: hovered ? revealEaseIn : revealEaseOut,
          delay: hovered ? computedFullDelayIn : fullDelayOut,
        }}
      >
        <img
          src={srcFull}
          alt={altFull}
          className="absolute inset-0 h-full w-full object-contain"
          draggable={false}
        />
      </motion.div>

      {/* Calque 2a: L départ – aspiré par un trou */}
      <motion.div
        className="absolute h-full"
        style={{ left: -25, top: 0, willChange: "clip-path, transform, opacity" }}
        initial={{
          clipPath: `circle(${holeRadiusStart}% at 50% 50%)`,
          opacity: 1,
          scale: lStartScale,
          x: lStartOffset.x,
          y: lStartOffset.y,
        }}
        animate={
          hovered
            ? { clipPath: `circle(${holeRadiusEnd}% at 50% 50%)`, opacity: 0, scale: lStartScale * 0.9 }
            : { clipPath: `circle(${holeRadiusStart}% at 50% 50%)`, opacity: 1, scale: lStartScale }
        }
        transition={{
          duration: hovered ? suckDurationIn : suckDurationOut,
          ease: hovered ? suckEaseIn : suckEaseOut,
          delay: hovered ? 0 : totalDelayPopOut,
        }}
      >
        <img src={srcSmall} alt={altSmall} className="h-full object-contain" draggable={false} />
      </motion.div>

      {/* Calque 2b: L arrivée – ressort au point cible */}
      <motion.div
        className="absolute h-full"
        style={{ left: 0, top: 0, willChange: "clip-path, transform, opacity" }}
        initial={{
          clipPath: `circle(${holeRadiusEnd}% at 50% 50%)`,
          opacity: 0,
          scale: lTargetScale * 0.6,
          x: lTargetOffset.x,
          y: lTargetOffset.y,
        }}
        animate={
          hovered
            ? { clipPath: `circle(${holeRadiusStart}% at 50% 50%)`, opacity: 1, scale: lTargetScale * 1.05 }
            : { clipPath: `circle(${holeRadiusEnd}% at 50% 50%)`, opacity: 0, scale: lTargetScale * 0.6 }
        }
        transition={{
          duration: hovered ? popDurationIn : popDurationOut,
          ease: hovered ? popEaseIn : popEaseOut,
          delay: hovered ? totalDelayPopIn : 0,
        }}
      >
        <img src={srcSmall} alt={`${altSmall} – arrivée`} className="h-full w-full object-contain" draggable={false} />
      </motion.div>

      {/* Masque arrondi discret et anti-overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" />

      {debug && (
        <div className="pointer-events-none absolute inset-0 grid grid-cols-12 grid-rows-4">
          {Array.from({ length: 12 * 4 }).map((_, i) => (
            <div key={i} className="border border-dashed border-black/10" />
          ))}
          <div
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40"
            style={{ left: lTargetOffset.x, top: lTargetOffset.y }}
            title="Cible L"
          />
        </div>
      )}
    </div>
  );
}

/*
  Usage avec délai:
  <MorphingLogo
          srcSmall={small}
          srcFull={full}
          width={260}
          height={86}
          lStartOffset={{ x: 0, y: 0 }}
          lTargetOffset={{ x: 50, y: 0 }}
          lStartScale={1}
          lTargetScale={0.92}
          fullDelayIn={0.6}     // attend 0.6s avant que le logo complet apparaisse
          fullDelayOut={0}      // le logo complet disparait sans délai
          className="cursor-pointer"
        />

  Par défaut, si fullDelayIn n'est pas fourni, il vaut suckDurationIn + travelDelayIn.
  fullDelayOut permet d'attendre avant de masquer le logo complet au retour (par défaut 0).
*/
