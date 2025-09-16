import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/logos/EvolutiveS-Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100"
        : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 font-lausanne font-[250] text-xl">
            <Link to="/" className="text-gray-700 hover:text-[#1d354a]">Accueil</Link>
            <Link to="/services" className="text-gray-700 hover:text-[#1d354a]">Services</Link>
            <Link to="/about" className="text-gray-700 hover:text-[#1d354a]">Qui sommes-nous</Link>
            <Link to="/projects" className="text-gray-700 hover:text-[#1d354a]">Projects</Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#1d354a]">Contact</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-[#1d354a] hover:bg-[#2a4a65] text-white px-6 py-2 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-[#1d354a] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-64 mt-4" : "max-h-0"
            }`}
        >
          <div className="py-4 space-y-3">
            <Link to="/" className="text-gray-700 hover:text-[#1d354a]">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-[#1d354a]">Services</Link>
            <Link to="/about" className="text-gray-700 hover:text-[#1d354a]">About</Link>
            <Link to="/projects" className="text-gray-700 hover:text-[#1d354a]">Projects</Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#1d354a]">Contact</Link>
          </div>
        </div>
      </nav>
    </header >
  );
};

export default Header;