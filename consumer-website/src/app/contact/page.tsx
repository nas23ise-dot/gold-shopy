export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Shiva Jewellers</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            We're here to help you find the perfect jewelry piece. Visit us or get in touch today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-3">Visit Our Store</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hotel Street, Azad Chowk<br />
              Chintamani-563125<br />
              Karnataka, India
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-3">Call Us</h3>
            <p className="text-gray-600 text-sm">
              <strong className="text-amber-600">+91 9845342431</strong><br />
              Available during business hours
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-3">Email Us</h3>
            <p className="text-gray-600 text-sm">
              <strong className="text-amber-600">shivu.47248@gmail.com</strong><br />
              We reply within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-3">GST Details</h3>
            <p className="text-gray-600 text-sm">
              <strong className="text-amber-600">GST No:</strong><br />
              29AVMPK4429J1Z2<br />
              <span className="text-xs text-gray-500">Registered Business</span>
            </p>
          </div>
        </div>

        {/* Contact Form & Business Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="Your Phone Number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  rows={5} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Business Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">About Shiva Jewellers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Located in the heart of Chintamani, Shiva Jewellers has been serving customers 
                with exquisite jewelry collections and exceptional craftsmanship. We blend 
                traditional Indian jewelry-making techniques with modern technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">✓</span>
                  <span className="text-gray-700">BIS Hallmarked Gold & Silver</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">✓</span>
                  <span className="text-gray-700">Certified Diamond Jewelry</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">✓</span>
                  <span className="text-gray-700">Custom Design Services</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600">✓</span>
                  <span className="text-gray-700">Lifetime Maintenance & Repair</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
              </div>
              <p className="text-amber-100 text-sm mt-4">
                *Please call ahead during festival seasons
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information Sections */}
        <div className="mt-16 space-y-12">
          {/* Shipping Info */}
          <section id="shipping" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
              <div className="space-y-4 text-gray-600">
                <p>We offer secure and insured shipping for all orders within India.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Free shipping on orders above ₹50,000</li>
                  <li>Standard shipping: 5-7 business days</li>
                  <li>Express shipping: 2-3 business days (additional charges apply)</li>
                  <li>All jewelry is packed in secure, tamper-proof packaging</li>
                  <li>Full insurance coverage during transit</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Returns Policy */}
          <section id="returns" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Returns & Exchange Policy</h2>
              <div className="space-y-4 text-gray-600">
                <p>We want you to be completely satisfied with your purchase.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>7-day return policy for unworn jewelry in original condition</li>
                  <li>Exchange available within 15 days of purchase</li>
                  <li>Custom-made items are non-returnable</li>
                  <li>Original packaging and certificates must be included</li>
                  <li>Refunds processed within 5-7 business days</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Care Instructions */}
          <section id="care" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Jewelry Care Instructions</h2>
              <div className="space-y-4 text-gray-600">
                <p>Proper care ensures your jewelry maintains its beauty for generations.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Store jewelry in separate soft pouches to prevent scratches</li>
                  <li>Clean with mild soap and warm water, then dry with soft cloth</li>
                  <li>Avoid contact with chemicals, perfumes, and cosmetics</li>
                  <li>Remove jewelry before swimming or exercising</li>
                  <li>Regular professional cleaning recommended every 6 months</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Size Guide */}
          <section id="size-guide" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Size Guide</h2>
              <div className="space-y-4 text-gray-600">
                <p>Find the perfect fit for your jewelry.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Rings</h3>
                    <p className="text-sm">Visit our store for accurate ring sizing. We offer free resizing within 30 days of purchase.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Bangles & Bracelets</h3>
                    <p className="text-sm">Available in standard sizes. Custom sizing available upon request.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Do you offer customization?</h3>
                  <p className="text-gray-600 text-sm">Yes, we offer custom design services. Visit our store or contact us to discuss your requirements.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Is the jewelry hallmarked?</h3>
                  <p className="text-gray-600 text-sm">All our gold and silver jewelry is BIS hallmarked, ensuring purity and authenticity.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Do you provide certificates?</h3>
                  <p className="text-gray-600 text-sm">Yes, all diamond jewelry comes with certification. Gold and silver items include hallmark certificates.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600 text-sm">We accept cash, credit/debit cards, UPI, and bank transfers. EMI options available for select items.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy Policy</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>At Shiva Jewellers, we are committed to protecting your privacy.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We collect only necessary information for order processing and customer service</li>
                  <li>Your personal information is never shared with third parties</li>
                  <li>Secure payment processing with encrypted transactions</li>
                  <li>You can request access to or deletion of your personal data at any time</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Terms of Service */}
          <section id="terms" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms of Service</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>By using our services, you agree to the following terms:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All prices are subject to change based on current market rates</li>
                  <li>Product images are for reference; actual items may vary slightly</li>
                  <li>We reserve the right to refuse service at our discretion</li>
                  <li>All disputes are subject to the jurisdiction of Chintamani, Karnataka</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Buyback Policy */}
          <section id="buyback" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Buyback Policy</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>We offer lifetime buyback guarantee on all our jewelry.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Buyback at current market rates</li>
                  <li>Original purchase certificate required</li>
                  <li>Jewelry must be in good condition</li>
                  <li>Deduction for making charges may apply</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Policy */}
          <section id="refund" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Refund Policy</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>Refunds are processed according to the following guidelines:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Refunds processed within 5-7 business days of return approval</li>
                  <li>Original payment method will be credited</li>
                  <li>Shipping charges are non-refundable unless item is defective</li>
                  <li>Custom-made items are non-refundable</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Security</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>We take your security seriously.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encrypted website for secure transactions</li>
                  <li>PCI DSS compliant payment processing</li>
                  <li>Secure storage of customer information</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* GST Info */}
          <section id="gst" className="scroll-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">GST Information</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p><strong>GST Number:</strong> 29AVMPK4429J1Z2</p>
                <p>All prices displayed are inclusive of applicable GST. Tax invoices are provided with every purchase.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}