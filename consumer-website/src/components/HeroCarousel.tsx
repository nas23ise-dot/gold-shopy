'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
}

const HeroCarousel = () => {
  console.log('HeroCarousel rendered'); // Add logging
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides: Slide[] = useMemo(() => [
    {
      id: 1,
      image: 'https://via.placeholder.com/1920x800/D4AF37/FFFFFF?text=Exquisite+Gold+Collection',
      title: 'Exquisite Gold Collection',
      subtitle: 'Where Tradition Meets Excellence',
      description: 'Handcrafted gold jewelry that tells your unique story. Each piece is BIS hallmarked and crafted with traditional Indian techniques.',
      ctaText: 'Explore Gold Collection',
      ctaLink: '/category/gold/gold-necklaces',
      bgGradient: 'from-amber-900/70 to-amber-600/70'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/1920x800/E5E7EB/1F2937?text=Brilliant+Diamond+Jewelry',
      title: 'Brilliant Diamond Jewelry',
      subtitle: 'Sparkle Like Never Before',
      description: 'Certified diamonds that capture light and hearts. Experience the brilliance of our premium diamond collection at Shiva Jewellers.',
      ctaText: 'Shop Diamonds',
      ctaLink: '/category/diamond/diamond-rings',
      bgGradient: 'from-gray-900/70 to-gray-600/70'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/1920x800/C0C0C0/000000?text=Silver+Elegance',
      title: 'Silver Elegance',
      subtitle: 'Affordable Luxury for Everyone',
      description: 'Pure silver jewelry combining traditional craftsmanship with modern designs. Perfect for everyday wear and special occasions.',
      ctaText: 'Discover Silver',
      ctaLink: '/category/silver/silver-necklaces',
      bgGradient: 'from-slate-900/70 to-slate-600/70'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/1920x800/FEF3C7/F59E0B?text=Traditional+Collections',
      title: 'Traditional Collections',
      subtitle: 'Celebrating Indian Heritage',
      description: 'Authentic Indian jewelry designs including Kundan, Temple jewelry, and traditional sets. Perfect for weddings and festivals.',
      ctaText: 'View Traditional Sets',
      ctaLink: '/collections/traditional',
      bgGradient: 'from-yellow-900/70 to-yellow-600/70'
    }
  ], []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <div className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          
          {/* Overlay Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgGradient}`} />
          
          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl text-white">
                
                {/* Animated Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-lg md:text-xl font-light mb-2 text-amber-200">
                    {slides[currentSlide].subtitle}
                  </h3>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slides[currentSlide].title}
                  </h1>
                  
                  <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-200">
                    {slides[currentSlide].description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={slides[currentSlide].ctaLink}
                      className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {slides[currentSlide].ctaText}
                    </Link>
                    
                    <Link
                      href="/about"
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                    >
                      Our Heritage
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
      >
        <Play 
          size={16} 
          className={`${isPlaying ? 'opacity-50' : 'opacity-100'} transition-opacity`}
        />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 right-6 text-white/70 flex flex-col items-center">
        <span className="text-xs mb-2">Scroll Down</span>
        <div className="w-px h-8 bg-white/50" />
      </div>
    </div>
  );
};

export default HeroCarousel;