import React, { useState } from "react";
import { Send, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
        duration: 5000,
      });
      
      setFormData({
        name: "",
        email: "",
        company: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: ["123 Innovation Drive", "Tech District, San Francisco", "CA 94107"],
      color: "#1d354a"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568", "Mon-Fri 9AM-6PM PST"],
      color: "#1d354a"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: ["hello@nexuslab.com", "support@nexuslab.com", "24/7 Response Time"],
      color: "#1d354a"
    }
  ];

  return (
    <section
      id="contact"
      className="py-24"
      style={{
        background: `linear-gradient(135deg, 
          rgba(255, 255, 255, 1) 0%, 
          rgba(233, 229, 226, 0.3) 100%)`
      }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 animation-ready opacity-0 translate-y-8">
          <div className="inline-flex items-center gap-2 bg-[#1d354a] text-white px-6 py-3 rounded-full mb-6">
            <Calendar size={16} />
            <span className="font-semibold">Let's Start Your Project</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            Ready to Transform
            <span style={{ color: "#1d354a" }} className="block mt-2">Your Ideas?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with us today and let's discuss how we can bring your digital vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 animation-ready opacity-0 translate-x-8">
            <Card className="border-0 shadow-2xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black">
                  Send us a message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="h-12 border-gray-300 focus:border-[#1d354a] focus:ring-[#1d354a] transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12 border-gray-300 focus:border-[#1d354a] focus:ring-[#1d354a] transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300 focus:border-[#1d354a] focus:ring-[#1d354a] transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Project Details *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project, goals, and how we can help..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="border-gray-300 focus:border-[#1d354a] focus:ring-[#1d354a] transition-colors duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#1d354a] hover:bg-[#2a4a65] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={18} />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animation-ready opacity-0 translate-x-8 delay-300">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-0 bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#e9e5e2" }}
                    >
                      <div style={{ color: info.color }}>
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-black mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 text-sm leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* CTA Card */}
            <Card className="border-0 bg-[#1d354a] text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Quick Response Guarantee</h3>
                <p className="text-blue-100 text-sm mb-4">
                  We respond to all inquiries within 2 hours during business days.
                </p>
                <div className="flex justify-center">
                  <div className="w-12 h-1 bg-white/30 rounded-full">
                    <div className="w-8 h-1 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;