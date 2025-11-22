'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  CreditCard,
  Shield,
  Truck,
  Award
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Digital Gold', href: '/digital-gold' },
    { name: 'Gold Scheme', href: '/gold-scheme' },
    { name: 'Collections', href: '/collections' },
    { name: 'Search', href: '/search' }
  ];

  const customerService = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping Info', href: '/contact#shipping' },
    { name: 'Returns Policy', href: '/contact#returns' },
    { name: 'Care Instructions', href: '/contact#care' },
    { name: 'FAQ', href: '/contact#faq' },
    { name: 'Size Guide', href: '/contact#size-guide' }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/contact#privacy' },
    { name: 'Terms of Service', href: '/contact#terms' },
    { name: 'Buyback Policy', href: '/contact#buyback' },
    { name: 'Refund Policy', href: '/contact#refund' },
    { name: 'Security', href: '/contact#security' },
    { name: 'GST Info', href: '/contact#gst' }
  ];

  const collections = [
    { name: 'Best Sellers', href: '/collections/best-sellers' },
    { name: 'New Arrivals', href: '/collections/new-arrivals' },
    { name: 'Bridal Collection', href: '/collections/bridal-collection' },
    { name: 'Traditional', href: '/collections/traditional' },
    { name: 'Contemporary', href: '/collections/contemporary' },
    { name: 'Antique Collection', href: '/collections/antique' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={20} />, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: <Instagram size={20} />, href: '#', color: 'hover:text-pink-600' },
    { name: 'Twitter', icon: <Twitter size={20} />, href: '#', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: <Youtube size={20} />, href: '#', color: 'hover:text-red-600' }
  ];

  const trustBadges = [
    { icon: <Shield size={20} />, text: 'BIS Hallmarked' },
    { icon: <Award size={20} />, text: 'Certified Quality' },
    { icon: <Truck size={20} />, text: 'Free Shipping' },
    { icon: <CreditCard size={20} />, text: 'Secure Payment' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Collections
            </h3>
            <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new arrivals, 
              festival offers, and jewelry care tips from Shiva Jewellers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <div className="text-2xl font-bold text-amber-400 mb-2">
                    SHIVA <span className="text-white">JEWELLERS</span>
                  </div>
                  <div className="text-sm text-gray-400">Where tradition tells a story of jewels</div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  At Shiva Jewellers, we blend traditional Indian craftsmanship with modern technology 
                  to create exquisite jewelry pieces. Located in the heart of Chintamani, we are 
                  committed to making your precious moments even more special.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={16} className="text-amber-400 flex-shrink-0" />
                    <span className="text-sm">Hotel Street, Azad Chowk, Chintamani-563125</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone size={16} className="text-amber-400 flex-shrink-0" />
                    <span className="text-sm">+91 9845342431</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail size={16} className="text-amber-400 flex-shrink-0" />
                    <span className="text-sm">shivu.47248@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-amber-400 text-sm font-semibold">GST:</span>
                    <span className="text-sm">29AVMPK4429J1Z2</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`p-2 bg-gray-800 rounded-full text-gray-300 transition-all duration-200 ${social.color} hover:scale-110`}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Collections */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-lg font-semibold text-amber-400 mb-6">Collections</h4>
                <ul className="space-y-3">
                  {collections.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-amber-400 mb-6">Company</h4>
                <ul className="space-y-3">
                  {quickLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Customer Service & Policies */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-amber-400 mb-6">Support</h4>
                <ul className="space-y-3">
                  {customerService.slice(0, 3).map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {policies.slice(0, 3).map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-400">
                <div className="text-amber-400">
                  {badge.icon}
                </div>
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © 2024 Shiva Jewellers. All rights reserved. | GST: 29AVMPK4429J1Z2
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <Link href="/contact#privacy" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact#terms" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/collections" className="hover:text-amber-400 transition-colors">
                Collections
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>We Accept:</span>
              <div className="flex gap-2">
                {/* Payment method icons would go here */}
                <div className="bg-gray-800 rounded px-2 py-1 text-xs">VISA</div>
                <div className="bg-gray-800 rounded px-2 py-1 text-xs">MC</div>
                <div className="bg-gray-800 rounded px-2 py-1 text-xs">AMEX</div>
                <div className="bg-gray-800 rounded px-2 py-1 text-xs">PP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;