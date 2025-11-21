'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  User, 
  Heart,
  MapPin,
  Phone,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount, wishlistCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Close search modal when mobile menu opens
  useEffect(() => {
    if (isMenuOpen && isSearchOpen) {
      setIsSearchOpen(false);
    }
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    // Redirect to home page
    window.location.href = '/';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  const categories = {
    'Gold': [
      'Gold Necklaces',
      'Gold Earrings', 
      'Gold Bangles',
      'Gold Rings',
      'Gold Pendants'
    ],
    'Diamond': [
      'Diamond Rings',
      'Diamond Necklaces',
      'Diamond Earrings',
      'Diamond Bangles',
      'Diamond Pendants'
    ],
    'Platinum': [
      'Platinum Rings',
      'Platinum Necklaces',
      'Platinum Earrings',
      'Platinum Bangles'
    ],
    'Silver': [
      'Silver Necklaces',
      'Silver Earrings',
      'Silver Rings',
      'Silver Bangles'
    ],
    'Coins & Bars': [
      'Gold Coins',
      'Silver Coins',
      'Gold Bars',
      'Silver Bars'
    ]
  };

  const collections = [
    'Best Sellers',
    'New Arrivals',
    'Bridal Collection',
    'Traditional',
    'Contemporary',
    'Antique'
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-amber-50 text-amber-800 text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>+91 9845342431</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>Hotel Street, Azad Chowk, Chintamani-563125</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>GST: 29AVMPK4429J1Z2</span>
            <span>|</span>
            <span>Lifetime Maintenance & Buyback Guarantee</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-amber-600">
                SHIVA <span className="text-amber-800">JEWELLERS</span>
              </div>
              <div className="text-xs text-gray-600 -mt-1">Where tradition meets technology</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              
              {/* Collections Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('collections')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-amber-600 transition-colors py-2">
                  <span>Collections</span>
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'collections' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 bg-white shadow-xl rounded-lg p-6 min-w-[200px] mt-2"
                    >
                      {collections.map((collection) => (
                        <Link
                          key={collection}
                          href={`/collections/${encodeURIComponent(collection.toLowerCase().replace(/\s+/g, '-'))}`}
                          className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {collection}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Category Dropdowns */}
              {Object.entries(categories).map(([category, items]) => (
                <div
                  key={category}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(`category-${category}`)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-amber-600 transition-colors py-2">
                    <span>{category}</span>
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === `category-${category}` && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 bg-white shadow-xl rounded-lg p-6 min-w-[220px] mt-2"
                      >
                        {items.map((item) => (
                          <Link
                            key={item}
                            href={`/category/${encodeURIComponent(category.toLowerCase().replace(/&/g, 'and'))}/${encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))}`}
                            className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Other Menu Items */}
              <Link href="/digital-gold" className="text-gray-700 hover:text-amber-600 transition-colors">
                Digital Gold
              </Link>
              <Link href="/gold-scheme" className="text-gray-700 hover:text-amber-600 transition-colors">
                Gold Scheme
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-40 lg:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>
              
              {/* Search Icon for Mobile */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search size={20} className="text-gray-600" />
              </button>
              
              <Link href="/profile/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Heart size={20} className="text-gray-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* User Profile Dropdown */}
              <div className="relative">
                {user ? (
                  <div className="group relative">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center">
                      <User size={20} className="text-gray-600" />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Hi, {user.name}</p>
                      </div>
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link 
                        href="/profile/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/auth/signin" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <User size={20} className="text-gray-600" />
                  </Link>
                )}
              </div>
              
              <Link href="/profile/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingBag size={20} className="text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  // Close search modal if it's open
                  if (isSearchOpen) {
                    setIsSearchOpen(false);
                  }
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
            >
              <div className="bg-white rounded-lg p-4 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Search</h3>
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search jewelry..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      autoFocus
                    />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t z-50"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="space-y-4">
                  
                  {/* Search Input for Mobile */}
                  <div className="pb-4 border-b border-gray-200">
                    <form onSubmit={handleSearch} className="flex">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Search jewelry..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <button 
                          type="submit"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600"
                        >
                          <Search size={20} />
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Collections */}
                  <div>
                    <h3 className="font-semibold text-amber-600 mb-2">Collections</h3>
                    <div className="space-y-2 ml-4">
                      {collections.map((collection) => (
                        <Link
                          key={collection}
                          href={`/collections/${encodeURIComponent(collection.toLowerCase().replace(/\s+/g, '-'))}`}
                          className="block text-gray-700 hover:text-amber-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {collection}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  {Object.entries(categories).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-amber-600 mb-2">{category}</h3>
                      <div className="space-y-2 ml-4">
                        {items.map((item) => (
                          <Link
                            key={item}
                            href={`/category/${encodeURIComponent(category.toLowerCase().replace(/&/g, 'and'))}/${encodeURIComponent(item.toLowerCase().replace(/\s+/g, '-'))}`}
                            className="block text-gray-700 hover:text-amber-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Other Links */}
                  <div className="pt-4 border-t">
                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          className="block py-2 text-gray-700 hover:text-amber-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/profile/orders"
                          className="block py-2 text-gray-700 hover:text-amber-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left py-2 text-gray-700 hover:text-amber-600"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth/signin"
                          className="block py-2 text-gray-700 hover:text-amber-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="block py-2 text-gray-700 hover:text-amber-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                    <Link
                      href="/digital-gold"
                      className="block py-2 text-gray-700 hover:text-amber-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Digital Gold
                    </Link>
                    <Link
                      href="/gold-scheme"
                      className="block py-2 text-gray-700 hover:text-amber-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Gold Scheme
                    </Link>
                    <Link
                      href="/about"
                      className="block py-2 text-gray-700 hover:text-amber-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="block py-2 text-gray-700 hover:text-amber-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;