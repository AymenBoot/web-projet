import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <section className="relative min-h-[90vh] bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-500 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-amber-600 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">
                Collection 2024
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
              Discover Your
              <span className="block font-serif italic text-amber-500">Signature Scent</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
              Luxury fragrances crafted for the modern connoisseur. 
              Experience the art of perfumery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to={createPageUrl('Shop')}
                className="group inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to={createPageUrl('Shop')}
                className="inline-flex items-center justify-center gap-3 border border-white/30 hover:border-amber-500 text-white hover:text-amber-500 px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300"
              >
                View All
              </Link>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop"
                alt="Luxury Perfume"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-black font-bold text-xs text-center">NEW<br/>2024</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}