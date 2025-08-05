import React from "react";
import { Code, Palette, Smartphone, Globe, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Services = () => {
  const services = [
    {
      icon: <Code size={40} />,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
      features: ["React & Next.js", "Full-Stack Solutions", "API Integration"]
    },
    {
      icon: <Palette size={40} />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that captivate users and drive engagement through thoughtful user experience strategies.",
      features: ["Design Systems", "User Research", "Prototyping"]
    },
    {
      icon: <Smartphone size={40} />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices and platforms.",
      features: ["iOS & Android", "Cross-Platform", "App Store Optimization"]
    },
    {
      icon: <Globe size={40} />,
      title: "Digital Strategy",
      description: "Comprehensive digital transformation strategies that align technology solutions with your business objectives.",
      features: ["Market Analysis", "Technology Roadmap", "Growth Planning"]
    },
    {
      icon: <Zap size={40} />,
      title: "Performance Optimization",
      description: "Speed up your digital presence with advanced optimization techniques that enhance user satisfaction.",
      features: ["Page Speed", "SEO Optimization", "Analytics"]
    },
    {
      icon: <Shield size={40} />,
      title: "Security & Maintenance",
      description: "Robust security solutions and ongoing maintenance to keep your digital assets safe and up-to-date.",
      features: ["Security Audits", "24/7 Monitoring", "Regular Updates"]
    }
  ];

  return (
    <section
      id="services"
      className="py-24"
      style={{
        background: `linear-gradient(180deg, 
          rgba(255, 255, 255, 1) 0%, 
          rgba(233, 229, 226, 0.1) 100%)`
      }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animation-ready opacity-0 translate-y-8">
          <div className="inline-block bg-[#e9e5e2] px-4 py-2 rounded-full mb-6">
            <span className="text-[#1d354a] font-semibold">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            What We <span style={{ color: "#1d354a" }}>Create</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we provide end-to-end digital solutions that transform ideas into powerful, scalable products.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-sm hover:bg-white transform hover:scale-105 hover:-translate-y-2 animation-ready opacity-0 translate-y-8`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "#e9e5e2" }}>
                  <div style={{ color: "#1d354a" }} className="group-hover:animate-pulse">
                    {service.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-black group-hover:text-[#1d354a] transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-500 group-hover:text-[#1d354a] transition-colors duration-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1d354a] mr-3 group-hover:animate-pulse"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;