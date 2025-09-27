// src/components/Header.jsx
// Menu responsive avec logo, plein écran mobile via portal, z-index max,
// animation fade+slide des liens et blocage du scroll.

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Logo from "../assets/logos/EvolutiveS-Logo.png";
import LogoBlanc from "../assets/logos/EvolutiveS-Logo2.png";
import MorphingLogo from "./MorphingLogo";
import small from "../assets/logos/L.png";
import full from "../assets/logos/EvolutiveS-Logo-Sans-L.png";

function Underline({ active = false }) {
  return (
    <span
      className={[
        "pointer-events-none absolute left-1/2 -bottom-0.5 h-0.5 w-full -translate-x-1/2",
        "origin-center scale-x-0 transform rounded-full bg-[#1d354a]",
        "transition-transform duration-300 ease-out",
        active ? "scale-x-100" : "group-hover:scale-x-100",
      ].join(" ")}
      aria-hidden="true"
    />
  );
}

function NavLink({ to, children, onClick }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative inline-flex items-center px-1 py-2 group outline-offset-4"
    >
      <span className={["transition-colors", "group-hover:text-[#1d354a]", isActive ? "text-[#1d354a]" : "text-gray-700"].join(" ")}>{children}</span>
      <Underline active={isActive} />
    </Link>
  );
}

function ServicesDropdown() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onKey(e) {
    if (e.key === "Escape") setOpen(false);
  }

  const items = [
    { to: "/services/conseil", label: "Conseil stratégique", desc: "Clarté et trajectoire" },
    { to: "/services/projets", label: "Gestion de projet", desc: "Cadre et exécution" },
    { to: "/services/accompagnement", label: "Accompagnement terrain", desc: "Appui opérationnel" },
  ];

  const isParentActive = pathname.startsWith("/services");

  return (
    <div ref={wrapRef} className="relative" onKeyDown={onKey}>
      <button
        type="button"
        className="relative inline-flex items-center gap-2 px-1 py-2 group text-gray-700 hover:text-[#1d354a] focus:outline-none"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={isParentActive ? "text-[#1d354a]" : undefined}>Services</span>
        <svg className={["h-4 w-4 transition-transform", open ? "rotate-180" : "rotate-0"].join(" ")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        <Underline active={isParentActive} />
      </button>

      <div
        role="menu"
        className={[
          "absolute left-1/2 z-40 mt-3 w-[28rem] -translate-x-1/2",
          "origin-top scale-95 opacity-0 shadow-xl ring-1 ring-black/5",
          "rounded-2xl overflow-hidden bg-white",
          "transition-all duration-200",
          open ? "scale-100 opacity-100" : "pointer-events-none",
        ].join(" ")}
      >
        <div className="h-2 bg-gradient-to-r from-[#1d354a] via-[#1d354a]/80 to-[#1d354a]/60" />
        <ul className="grid grid-cols-1 gap-1 p-2">
          {items.map((it) => (
            <li key={it.to}>
              <Link
                to={it.to}
                className={[
                  "group flex items-center justify-between rounded-xl px-4 py-3",
                  "transition-colors hover:bg-[#e9e5e2]",
                  pathname === it.to ? "text-[#1d354a]" : "text-gray-700",
                ].join(" ")}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{it.label}</span>
                  <span className="text-xs opacity-70">{it.desc}</span>
                </div>
                <svg className="h-4 w-4 opacity-60 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // états d’affichage
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  // refs pour la perf
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  // bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // fermer le menu mobile au changement de route et ré-afficher le header
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // logique scroll: cacher en descendant, montrer en remontant
  useEffect(() => {
    if (typeof window === "undefined") return;

    const THRESHOLD = 6; // évite l’effet yoyo sur de petits mouvements

    const onScroll = () => {
      const y = window.scrollY || 0;

      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const lastY = lastYRef.current;

        // seulement cacher si on a dépassé un petit offset et que le menu n’est pas ouvert
        if (!open && y > lastY + THRESHOLD && y > 80) {
          setHidden(true);
        } else if (y < lastY - THRESHOLD) {
          setHidden(false);
        }

        setAtTop(y <= 4);
        lastYRef.current = y;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // init
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  function toggle() {
    setOpen((v) => !v);
  }

  return (
    <>
      <header
        className={[
          // position et styles
          "fixed inset-x-0 top-0 z-50",
          "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70",
          // animation d’apparition/disparition
          "transition-transform duration-700 will-change-transform",
          hidden ? "-translate-y-full" : "translate-y-0",
          atTop ? "shadow-none" : "shadow-sm",
        ].join(" ")}
      >
        <div className="flex mx-8 items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <MorphingLogo
          srcSmall={small}
          srcFull={full}
          width={260}
          height={60}
          lStartOffset={{ x: 0, y: 0 }}
          lTargetOffset={{ x: 59, y: 0 }}
          lStartScale={1}
          lTargetScale={0.85}
          fullDelayIn={0.4}     // attend 0.6s avant que le logo complet apparaisse
          fullDelayOut={0.4}      // le logo complet disparait sans délai
          className="cursor-pointer"
        />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/">Accueil</NavLink>
            <ServicesDropdown />
            <NavLink to="/about">Qui sommes-nous</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="hidden md:flex">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#1d354a] px-4 py-2 text-white shadow-sm transition hover:opacity-90"
            >
              Nous contacter
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggle}
              aria-controls="mobile-fullscreen"
              aria-expanded={open}
              className="inline-flex items-center justify-center rounded-xl p-2 text-gray-700 hover:text-[#1d354a] focus:outline-none focus:ring-2 focus:ring-[#1d354a]/40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        <MobileFullscreen open={open} onClose={() => setOpen(false)} />
      </header>

      {/* espace réservé pour éviter le “jump” du layout avec le header en position fixed */}
      <div aria-hidden="true" className="h-20 md:h-[76px]" />
    </>
  );
}


function MobileFullscreen({ open, onClose }) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      id="mobile-fullscreen"
      className={["fixed inset-0 z-[9999] md:hidden", "transition-opacity duration-200", open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"].join(" ")}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-[#1d354a] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_45%)] z-0" />

      <div className="relative z-20 flex h-full flex-col animate-fadeIn">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <img src={LogoBlanc} alt="Evolutive logo" className="h-9 w-auto drop-shadow" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl p-2 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Fermer le menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" stroke="currentColor" fill="none"><path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <nav className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-6">
          {[
            <MobileLink key="accueil" to="/" onClick={onClose}>Accueil</MobileLink>,
            <MobileGroup key="services" title="Services">
              <MobileSublink to="/services/conseil" onClick={onClose}>Conseil stratégique</MobileSublink>
              <MobileSublink to="/services/projets" onClick={onClose}>Gestion de projet</MobileSublink>
              <MobileSublink to="/services/accompagnement" onClick={onClose}>Accompagnement terrain</MobileSublink>
            </MobileGroup>,
            <MobileLink key="about" to="/about" onClick={onClose}>Qui sommes-nous</MobileLink>,
            <MobileLink key="projects" to="/projects" onClick={onClose}>Projects</MobileLink>,
            <MobileLink key="contact" to="/contact" onClick={onClose}>Contact</MobileLink>
          ].map((el, idx) => (
            <div key={idx} className="animate-slideIn opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: `${idx * 100 + 150}ms` }}>
              {el}
            </div>
          ))}
        </nav>

        <div className="px-6 pb-8 animate-slideIn opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: `${600}ms` }}>
          <Link to="/contact" onClick={onClose} className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-[#1d354a] shadow-sm transition hover:opacity-90">Nous contacter</Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

function MobileLink({ to, children, onClick }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm transition hover:bg-white/10"
    >
      <span className={["text-xl", "text-white", active ? "font-semibold" : ""].join(" ")}>{children}</span>
      <span className="pointer-events-none absolute left-1/2 -bottom-0.5 h-0.5 w-[90%] -translate-x-1/2 origin-center scale-x-0 rounded-full bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

function MobileGroup({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm">
      <div className="mb-3 text-sm uppercase tracking-wide text-white">{title}</div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function MobileSublink({ to, children, onClick }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative inline-flex items-center justify-between rounded-xl px-2 py-2 text-white transition hover:bg-white/10"
    >
      <span className="text-base text-white">{children}</span>
      <svg className="h-4 w-4 opacity-70 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      {active && <span className="sr-only">(actif)</span>}
    </Link>
  );
}

// animations CSS custom à ajouter dans tailwind.config.css
// @keyframes fadeIn { from {opacity:0} to {opacity:1} }
// @keyframes slideIn { from {opacity:0; transform:translateY(20px)} to {opacity:1; transform:translateY(0)} }
// .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
// .animate-slideIn { animation: slideIn 0.4s ease-out; }