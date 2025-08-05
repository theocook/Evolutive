import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c6?w=400&h=400&fit=crop&crop=face",
      bio: "Visionary designer with 12+ years creating award-winning digital experiences.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack architect passionate about scalable solutions and clean code.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Emily Johnson",
      role: "UX Strategist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Human-centered design advocate transforming complex problems into intuitive solutions.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "David Kim",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Technology innovator specializing in AI integration and performance optimization.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  return (
    <section
      id="team"
      className="py-24"
      style={{
        background: `linear-gradient(180deg, 
          rgba(233, 229, 226, 0.1) 0%, 
          rgba(255, 255, 255, 1) 100%)`
      }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animation-ready opacity-0 translate-y-8">
          <div className="inline-block bg-white border-2 border-[#1d354a] px-6 py-3 rounded-full mb-6">
            <span className="text-[#1d354a] font-semibold">Meet Our Team</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            The Minds Behind 
            <span style={{ color: "#1d354a" }} className="block mt-2">The Magic</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our diverse team of experts brings together creativity, technical excellence, and strategic thinking to deliver exceptional results.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-sm hover:bg-white transform hover:scale-105 hover:-translate-y-4 animation-ready opacity-0 translate-y-8 overflow-hidden`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d354a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {[
                      { icon: <Linkedin size={18} />, link: member.social.linkedin },
                      { icon: <Twitter size={18} />, link: member.social.twitter },
                      { icon: <Github size={18} />, link: member.social.github }
                    ].map((social, socialIndex) => (
                      <a
                        key={socialIndex}
                        href={social.link}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1d354a] hover:bg-white hover:scale-110 transition-all duration-300"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-[#1d354a] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <div className="text-[#1d354a] font-semibold mb-3 text-sm uppercase tracking-wide">
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team CTA */}
        <div className="text-center mt-16 animation-ready opacity-0 translate-y-8 delay-600">
          <div className="bg-[#e9e5e2] rounded-3xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our vision of creating exceptional digital experiences.
            </p>
            <button className="bg-[#1d354a] hover:bg-[#2a4a65] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              View Open Positions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;