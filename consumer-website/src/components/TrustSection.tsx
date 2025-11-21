'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  RotateCcw, 
  Wrench, 
  Award, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  Star,
  Users,
  Globe
} from 'lucide-react';

interface TrustFeature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
}

const TrustSection = () => {
  const trustFeatures: TrustFeature[] = [
    {
      id: 1,
      icon: <Shield className="w-8 h-8" />,
      title: "Complimentary Insurance",
      description: "Complete protection for your precious jewelry with comprehensive insurance coverage.",
      details: [
        "Free insurance up to $10,000",
        "Covers theft, loss & damage",
        "Worldwide coverage",
        "Easy claim process"
      ]
    },
    {
      id: 2,
      icon: <RotateCcw className="w-8 h-8" />,
      title: "Guaranteed Buyback",
      description: "100% guaranteed buyback policy with transparent and fair valuation.",
      details: [
        "Lifetime buyback guarantee",
        "Current market rates",
        "No hidden charges",
        "Instant evaluation"
      ]
    },
    {
      id: 3,
      icon: <Wrench className="w-8 h-8" />,
      title: "Lifetime Maintenance",
      description: "Free lifetime maintenance and cleaning services for all your jewelry.",
      details: [
        "Free cleaning & polishing",
        "Professional repairs",
        "Stone re-setting",
        "Size adjustments"
      ]
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8" />,
      title: "BIS Hallmarked",
      description: "All gold jewelry is BIS hallmarked ensuring purity and authenticity.",
      details: [
        "Bureau of Indian Standards certified",
        "Guaranteed purity",
        "Quality assurance",
        "Authentic documentation"
      ]
    },
    {
      id: 5,
      icon: <CreditCard className="w-8 h-8" />,
      title: "Transparent Pricing",
      description: "Clear, upfront pricing with no hidden costs or charges.",
      details: [
        "All-inclusive pricing",
        "No making charges surprise",
        "Real-time gold rates",
        "Tax transparency"
      ]
    },
    {
      id: 6,
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Secure and insured free shipping on all orders above $500.",
      details: [
        "Free shipping nationwide",
        "Secure packaging",
        "Insurance included",
        "Tracking provided"
      ]
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "10K+", label: "Happy Customers" },
    { icon: <Star className="w-8 h-8" />, number: "4.8/5", label: "Average Rating" },
    { icon: <Globe className="w-8 h-8" />, number: "Chintamani", label: "Trusted Locally" },
    { icon: <Award className="w-8 h-8" />, number: "500+", label: "Unique Designs" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
          >
            Our <span className="text-amber-600">Promises</span> to You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            At Shiva Jewellers, we are committed to excellence in every aspect of our service. 
            These are not just promises – they are our guarantee to you.
          </motion.p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-600 rounded-xl mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Details List */}
              <ul className="space-y-2">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Trusted by Millions Worldwide
            </h3>
            <p className="text-amber-100 text-lg">
              Our numbers speak for themselves
            </p>
          </div>

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
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 mx-auto text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-amber-100 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certification Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h4 className="text-xl font-semibold text-gray-800 mb-8">
            Certified & Trusted By
          </h4>
          
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            {/* Placeholder for certification badges */}
            <div className="bg-gray-200 rounded-lg p-4 w-32 h-16 flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">BIS</span>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 w-32 h-16 flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">ISO 9001</span>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 w-32 h-16 flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">GIA</span>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 w-32 h-16 flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">ASSOCHAM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;