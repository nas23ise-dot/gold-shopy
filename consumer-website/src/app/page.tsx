import HeroCarousel from "@/components/HeroCarousel";
import FeaturedSections from "@/components/FeaturedSections";
import TrustSection from "@/components/TrustSection";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroCarousel />
      
      {/* Tagline Section */}
      <section className="bg-gradient-to-r from-amber-50 to-yellow-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            "Where tradition tells a story of jewels, and technology writes the future of design."
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Shiva Jewellers, we blend centuries-old Indian craftsmanship with modern innovation 
            to create jewelry that celebrates your most precious moments.
          </p>
        </div>
      </section>
      
      <FeaturedSections />
      <TrustSection />
      
      {/* Admin Access - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4">
          <Link 
            href="/admin" 
            className="text-xs text-gray-400 hover:text-amber-600 transition-colors"
          >
            Admin Access
          </Link>
        </div>
      )}
    </div>
  );
}