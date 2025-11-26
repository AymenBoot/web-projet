import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'men',
    title: 'For Him',
    subtitle: 'Bold & Masculine',
    image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&h=800&fit=crop'
  },
  {
    id: 'women',
    title: 'For Her',
    subtitle: 'Elegant & Feminine',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&h=800&fit=crop'
  },
  {
    id: 'unisex',
    title: 'Unisex',
    subtitle: 'Universal Appeal',
    image: 'https://images.unsplash.com/photo-1595425964272-fc617fa5a992?w=600&h=800&fit=crop'
  }
];

export default function Categories() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">
            Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-black mt-4 mb-6">
            Shop by Category
          </h2>
          <div className="w-24 h-0.5 bg-amber-500 mx-auto" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link 
                to={createPageUrl(`Shop?category=${category.id}`)}
                className="group block relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                {/* Image */}
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-amber-500 text-sm font-medium tracking-wider uppercase mb-2">
                    {category.subtitle}
                  </p>
                  <h3 className="text-white text-3xl font-light mb-4">
                    {category.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white group-hover:text-amber-500 transition-colors">
                    <span className="text-sm font-semibold tracking-wider uppercase">
                      Explore
                    </span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}