import React from "react";
import { ArrowUp, Heart, Linkedin, Twitter, Github, Instagram } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Web Development", href: "#services" },
        { name: "UI/UX Design", href: "#services" },
        { name: "Mobile Apps", href: "#services" },
        { name: "Digital Strategy", href: "#services" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Team", href: "#team" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Support", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "#", name: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "#", name: "Twitter" },
    { icon: <Github size={20} />, href: "#", name: "GitHub" },
    { icon: <Instagram size={20} />, href: "#", name: "Instagram" }
  ];

  return (
    <footer className="relative" style={{ backgroundColor: "#1d354a" }}>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      >
        <ArrowUp size={20} className="text-[#1d354a] group-hover:animate-bounce" />
      </button>

      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="text-3xl font-bold tracking-tight text-white mb-4">
                <span>Nexus</span>
                <span style={{ color: "#e9e5e2" }}>Lab</span>
              </div>
              <p className="text-blue-100 leading-relaxed max-w-md">
                Transforming digital visions into reality through innovative design, cutting-edge development, and strategic thinking.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white hover:text-[#e9e5e2] transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-6 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-blue-100 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white font-semibold text-xl mb-2">
                Stay Updated
              </h3>
              <p className="text-blue-100 text-sm">
                Get the latest insights on digital trends and innovation delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
              />
              <button className="px-6 py-3 bg-white hover:bg-[#e9e5e2] text-[#1d354a] font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center text-blue-100 text-sm">
            <span>© 2025 NexusLab. Made with</span>
            <Heart size={16} className="mx-2 text-red-400 animate-pulse" />
            <span>in San Francisco</span>
          </div>
          
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e9e5e2] to-transparent opacity-30"></div>
    </footer>
  );
};

export default Footer;