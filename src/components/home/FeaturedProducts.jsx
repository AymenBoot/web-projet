import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedProducts({ products, onBuyNow }) {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">
            Bestsellers
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-black mt-4 mb-6">
            Featured Collection
          </h2>
          <div className="w-24 h-0.5 bg-amber-500 mx-auto" />
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-gray-50 rounded-2xl overflow-hidden mb-4">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={product.image_url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=500&fit=crop"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => onBuyNow(product)}
                    className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 font-semibold text-sm tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Buy Now
                  </button>
                </div>

                {/* Badge */}
                {product.original_price && product.original_price > product.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-bold tracking-wider">
                    SALE
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 text-xs font-medium tracking-wider uppercase">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <Link 
                  to={createPageUrl(`ProductDetail?id=${product.id}`)}
                  className="text-lg font-medium text-black hover:text-amber-600 transition-colors"
                >
                  {product.name}
                </Link>
                <p className="text-gray-500 text-sm mt-1">{product.size || '100ml'}</p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-xl font-semibold text-black">{product.price} MAD</span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-gray-400 line-through text-sm">{product.original_price} MAD</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link 
            to={createPageUrl('Shop')}
            className="inline-flex items-center gap-3 border-2 border-black hover:bg-black hover:text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}