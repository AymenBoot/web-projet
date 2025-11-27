import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShoppingBag, Eye, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product, onBuyNow, index = 0 }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
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
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => addItem(product)}
            className="bg-white hover:bg-gray-100 text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onBuyNow(product)}
            className="bg-amber-500 hover:bg-amber-600 text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
            title="Buy Now"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
          <Link 
            to={createPageUrl(`ProductDetail?id=${product.id}`)}
            className="bg-white hover:bg-gray-100 text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.original_price && product.original_price > product.price && (
            <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold tracking-wider">
              -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
            </span>
          )}
          {product.featured && (
            <span className="bg-amber-500 text-black px-3 py-1 text-xs font-bold tracking-wider">
              BESTSELLER
            </span>
          )}
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 text-xs font-medium tracking-wider uppercase">
          {product.category}
        </div>

        {/* Stock Status */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-white text-black px-6 py-2 font-semibold tracking-wider">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center px-2">
        <Link 
          to={createPageUrl(`ProductDetail?id=${product.id}`)}
          className="block text-lg font-medium text-black hover:text-amber-600 transition-colors line-clamp-1"
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
  );
}