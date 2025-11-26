import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, Heart, Share2, ChevronLeft, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

import Footer from '@/components/shared/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CheckoutModal from '@/components/shared/CheckoutModal';
import ProductCard from '@/components/shared/ProductCard';

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ id: productId });
      return products[0];
    },
    enabled: !!productId
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['related-products', product?.category],
    queryFn: () => base44.entities.Product.filter({ category: product.category }),
    enabled: !!product?.category
  });

  const handleBuyNow = () => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleBuyRelated = (prod) => {
    setSelectedProduct(prod);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-100 aspect-square rounded-2xl animate-pulse" />
            <div className="space-y-6">
              <div className="h-8 bg-gray-100 rounded w-3/4 animate-pulse" />
              <div className="h-12 bg-gray-100 rounded w-1/2 animate-pulse" />
              <div className="h-32 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Product not found</h2>
          <Link 
            to={createPageUrl('Shop')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const filteredRelated = relatedProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to={createPageUrl('Home')} className="text-gray-500 hover:text-black">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to={createPageUrl('Shop')} className="text-gray-500 hover:text-black">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link 
            to={createPageUrl('Shop')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden">
                <img 
                  src={product.image_url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.original_price && product.original_price > product.price && (
                  <span className="bg-red-500 text-white px-4 py-2 text-sm font-bold tracking-wider">
                    -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                  </span>
                )}
                {product.featured && (
                  <span className="bg-amber-500 text-black px-4 py-2 text-sm font-bold tracking-wider">
                    BESTSELLER
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              {/* Category */}
              <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase mb-2">
                {product.category}
              </span>

              {/* Name */}
              <h1 className="text-3xl md:text-4xl font-light text-black mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-semibold text-black">{product.price} MAD</span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-xl text-gray-400 line-through">{product.original_price} MAD</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description || "Experience luxury with this exquisite fragrance. Crafted with the finest ingredients, it delivers a captivating scent that lasts all day."}
              </p>

              {/* Size */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Size</h4>
                <div className="inline-flex items-center px-4 py-2 border-2 border-black rounded-lg">
                  <span className="font-medium">{product.size || '100ml'}</span>
                </div>
              </div>

              {/* Notes */}
              {product.notes && product.notes.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Fragrance Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Buy */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded-xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-14 text-center text-lg font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={!product.in_stock}
                  className="flex-1 bg-black hover:bg-gray-900 disabled:bg-gray-300 text-white py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {product.in_stock ? 'Buy Now' : 'Out of Stock'}
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-8 border-t border-gray-100">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                  <p className="text-sm text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                  <p className="text-sm text-gray-600">Authentic</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                  <p className="text-sm text-gray-600">Easy Returns</p>
                </div>
              </div>

              {/* COD Badge */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 font-medium">
                  💵 Cash on Delivery Available
                </p>
                <p className="text-amber-700 text-sm mt-1">
                  Pay when you receive your order
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {filteredRelated.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-light text-black mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredRelated.map((prod, index) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onBuyNow={handleBuyRelated}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
      
      <CheckoutModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}