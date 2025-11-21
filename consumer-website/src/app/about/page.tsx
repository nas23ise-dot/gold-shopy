'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Clock, Shield, Heart } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: <Clock className="w-8 h-8" />, number: "Est. 2010", label: "Years of Excellence" },
    { icon: <Users className="w-8 h-8" />, number: "10K+", label: "Happy Customers" },
    { icon: <Globe className="w-8 h-8" />, number: "Chintamani", label: "Trusted Locally" },
    { icon: <Award className="w-8 h-8" />, number: "500+", label: "Unique Designs" }
  ];

  const values = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Quality & Trust",
      description: "Every piece is crafted with the highest standards and comes with our lifetime guarantee."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're committed to exceeding your expectations."
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Craftsmanship",
      description: "Our master artisans bring decades of experience to create timeless masterpieces."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-6">About Shiva Jewellers</h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Where tradition tells a story of jewels, and technology writes the future of design. 
              Located in Chintamani, we bring you authentic Indian jewelry crafted with passion and precision.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-full mb-4 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Heritage</h2>
              <p className="text-gray-600 mb-6">
                Founded in 1952 by Master Craftsman Rajesh Gupta, Gold Palace began as a small family workshop 
                in the heart of the jewelry district. With a vision to create jewelry that tells stories and 
                celebrates life's precious moments, we have grown into one of the most trusted names in fine jewelry.
              </p>
              <p className="text-gray-600">
                Today, under the third generation of leadership, we continue to honor our founder's vision while 
                embracing modern techniques and designs. Every piece that leaves our workshop carries with it 
                70+ years of expertise, passion, and unwavering commitment to excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://via.placeholder.com/600x500/D4AF37/FFFFFF?text=Shiva+Jewellers+Store"
                alt="Shiva Jewellers Store"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-bold">Est. 2010</div>
                <div className="text-amber-100">Chintamani</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and define who we are as a company.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="flex items-center justify-center text-amber-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Visit Our Showrooms</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience our collections in person at any of our 500+ locations worldwide. 
              Our expert consultants are ready to help you find the perfect piece.
            </p>
            <button className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Find a Store Near You
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;