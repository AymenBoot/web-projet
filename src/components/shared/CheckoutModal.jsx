import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, MessageCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function CheckoutModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  if (!product) return null;

  const totalPrice = product.price * quantity;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateWhatsAppLink = () => {
    const message = `🛒 *New Order*
━━━━━━━━━━━━━━
📦 *Product:* ${product.name}
💰 *Price:* ${product.price} MAD
📊 *Quantity:* ${quantity}
💵 *Total:* ${totalPrice} MAD
━━━━━━━━━━━━━━
👤 *Name:* ${formData.customer_name}
📱 *Phone:* ${formData.phone}
📍 *Address:* ${formData.address}
🏙️ *City:* ${formData.city}
${formData.notes ? `📝 *Notes:* ${formData.notes}` : ''}
━━━━━━━━━━━━━━
💳 *Payment:* Cash on Delivery`;

    return `https://wa.me/212663069357?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save order to database
    await base44.entities.Order.create({
      ...formData,
      product_id: product.id,
      product_name: product.name,
      quantity: quantity,
      total_price: totalPrice,
      status: 'pending'
    });

    setIsSubmitting(false);
    setOrderComplete(true);
  };

  const handleWhatsAppCheckout = () => {
    window.open(generateWhatsAppLink(), '_blank');
    onClose();
  };

  const resetAndClose = () => {
    setOrderComplete(false);
    setQuantity(1);
    setFormData({
      customer_name: '',
      phone: '',
      address: '',
      city: '',
      notes: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-black p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-amber-500" />
                <h2 className="text-xl font-semibold">
                  {orderComplete ? 'Order Confirmed!' : 'Complete Your Order'}
                </h2>
              </div>
              <button 
                onClick={resetAndClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderComplete ? (
              /* Success State */
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-black mb-3">Thank You!</h3>
                <p className="text-gray-600 mb-8">
                  Your order has been placed successfully. We'll contact you shortly to confirm delivery.
                </p>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Confirm via WhatsApp
                </button>
                <button
                  onClick={resetAndClose}
                  className="w-full mt-4 border border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Product Summary */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex gap-4">
                    <img 
                      src={product.image_url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop"}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{product.name}</h3>
                      <p className="text-gray-500 text-sm">{product.size || '100ml'}</p>
                      <p className="text-amber-600 font-bold mt-2">{product.price} MAD</p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700 font-medium">Quantity</span>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-amber-500 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-amber-500 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between mt-4 text-lg">
                    <span className="text-gray-700">Total</span>
                    <span className="font-bold text-black">{totalPrice} MAD</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="customer_name"
                      required
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                      placeholder="Enter your full address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                      placeholder="Any special instructions"
                    />
                  </div>

                  {/* Payment Info */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                    <p className="text-amber-800 text-sm font-medium">
                      💵 Payment: Cash on Delivery (COD)
                    </p>
                    <p className="text-amber-700 text-xs mt-1">
                      Pay when you receive your order
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Confirm Order
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}