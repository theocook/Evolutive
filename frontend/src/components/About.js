import React from "react";
import { Award, Users, Target, Lightbulb } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: <Award size={32} />,
      number: "8+",
      label: "Years Experience",
      color: "#1d354a"
    },
    {
      icon: <Users size={32} />,
      number: "50+",
      label: "Team Members",
      color: "#1d354a"
    },
    {
      icon: <Target size={32} />,
      number: "15+",
      label: "Industries Served",
      color: "#1d354a"
    },
    {
      icon: <Lightbulb size={32} />,
      number: "1000+",
      label: "Solutions Delivered",
      color: "#1d354a"
    }
  ];

  return (
    <section
      id="about"
      className="py-24"
      style={{
        background: `linear-gradient(135deg, 
          rgba(29, 53, 74, 0.02) 0%, 
          rgba(255, 255, 255, 1) 50%, 
          rgba(233, 229, 226, 0.2) 100%)`
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="animation-ready opacity-0 translate-x-8">
            <div className="inline-block bg-[#1d354a] text-white px-4 py-2 rounded-full mb-6">
              <span className="font-semibold">About NexusLab</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black leading-tight">
              Crafting Digital Excellence 
              <span style={{ color: "#1d354a" }} className="block mt-2">Since 2016</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                At NexusLab, we believe that exceptional digital experiences are born from the perfect fusion of creativity, technology, and strategic thinking. Our journey began with a simple mission: to bridge the gap between innovative ideas and their digital realization.
              </p>
              
              <p>
                Today, we're a team of passionate designers, developers, and strategists who collaborate with forward-thinking businesses to create digital solutions that don't just meet expectations – they exceed them.
              </p>
              
              <p>
                Every project we undertake is an opportunity to push boundaries, explore new possibilities, and deliver results that drive real business growth.
              </p>
            </div>

            {/* Core Values */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Innovation First", desc: "Cutting-edge solutions for modern challenges" },
                { title: "Client-Centric", desc: "Your success is our primary objective" },
                { title: "Quality Driven", desc: "Excellence in every detail, every time" },
                { title: "Future Ready", desc: "Building for tomorrow's possibilities" }
              ].map((value, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:bg-white transition-all duration-300 transform hover:scale-105">
                  <h4 className="font-semibold text-[#1d354a] mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="animation-ready opacity-0 translate-x-8 delay-300">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-2xl">
              <h3 className="text-2xl font-bold text-center mb-8 text-black">Our Impact</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center group cursor-pointer hover:transform hover:scale-110 transition-all duration-300"
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse"
                      style={{ backgroundColor: "#e9e5e2" }}
                    >
                      <div style={{ color: stat.color }}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="mt-8 flex justify-center space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#1d354a] opacity-20 animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;