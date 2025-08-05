import React from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.95) 0%, 
          rgba(233, 229, 226, 0.3) 50%, 
          rgba(29, 53, 74, 0.05) 100%)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#e9e5e2] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1d354a] rounded-full opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-200 rounded-full opacity-10 animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8 group cursor-pointer hover:bg-white/90 transition-all duration-300">
            <Sparkles size={16} className="text-[#1d354a] animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Innovative Digital Solutions</span>
            <div className="w-2 h-2 bg-[#1d354a] rounded-full group-hover:animate-ping"></div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animation-ready opacity-0 translate-y-8">
            <span className="block text-black mb-2">Transform Your</span>
            <span className="block" style={{ color: "#1d354a" }}>
              Digital Vision
            </span>
            <span className="block text-gray-600 text-3xl md:text-4xl font-normal mt-4">
              Into Reality
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animation-ready opacity-0 translate-y-8 delay-200">
            We craft exceptional digital experiences that drive growth, engage audiences, and revolutionize how businesses connect with their customers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animation-ready opacity-0 translate-y-8 delay-400">
            <Button
              onClick={scrollToServices}
              className="bg-[#1d354a] hover:bg-[#2a4a65] text-white px-8 py-4 text-lg font-semibold rounded-xl group transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Explore Our Work
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-[#1d354a] text-[#1d354a] hover:bg-[#1d354a] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl group transition-all duration-300 transform hover:scale-105"
            >
              <Zap size={20} className="mr-2 group-hover:animate-pulse" />
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 animation-ready opacity-0 translate-y-8 delay-600">
            {[
              { number: "500+", label: "Projects Delivered" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl font-bold mb-2" style={{ color: "#1d354a" }}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;