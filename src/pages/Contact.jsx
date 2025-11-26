import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

import Footer from '@/components/shared/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate WhatsApp link
    const message = `📩 *Contact Form*
━━━━━━━━━━━━━━
👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
━━━━━━━━━━━━━━
💬 *Message:*
${formData.message}`;

    window.open(`https://wa.me/212663069357?text=${encodeURIComponent(message)}`, '_blank');
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=600&fit=crop"
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-light text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">
                Get in Touch
              </span>
              <h2 className="text-4xl font-light text-black mt-4 mb-8">
                We're Here to Help
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-12">
                Have questions about our products? Need assistance with your order? 
                Our team is ready to help you find your perfect fragrance.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                <motion.a
                  href="https://wa.me/212663069357"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-6 bg-green-50 border border-green-200 rounded-2xl hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">WhatsApp</h3>
                    <p className="text-gray-600 mb-2">Quick response, chat with us directly</p>
                    <span className="text-green-600 font-medium">+212 663 069 357</span>
                  </div>
                </motion.a>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
                  <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Phone</h3>
                    <p className="text-gray-600 mb-2">Call us during business hours</p>
                    <a href="tel:+212663069357" className="text-amber-600 font-medium hover:text-amber-700">
                      +212 663 069 357
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
                  <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Email</h3>
                    <p className="text-gray-600 mb-2">Send us a message anytime</p>
                    <a href="mailto:contact@twinfragrance.shop" className="text-black font-medium hover:text-amber-600">
                      contact@twinfragrance.shop
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
                  <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-black mb-3">Message Sent!</h3>
                    <p className="text-gray-600 mb-8">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', phone: '', message: '' });
                      }}
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold text-black mb-2">Send us a Message</h3>
                    <p className="text-gray-600 mb-8">We'll respond via WhatsApp for faster communication</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                          placeholder="+212 6XX XXX XXX"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Message *
                        </label>
                        <textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-black rounded-3xl p-8 md:p-16 text-center">
            <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-6" />
            <h3 className="text-3xl font-light text-white mb-4">
              Based in Morocco
            </h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              We deliver across Morocco. Fast shipping to all major cities including 
              Casablanca, Rabat, Marrakech, Fes, and more.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}