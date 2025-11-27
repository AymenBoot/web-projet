import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, MessageCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/context/CartContext';

export default function CheckoutModal({ product, isOpen, onClose, isCartCheckout = false }) {
  const { cart, clearCart, totalPrice: cartTotal } = useCart();
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

  // Determine what we are buying (single product or whole cart)
  const isSingleProduct = !!product;
  const items = isSingleProduct ? [{ ...product, quantity }] : cart;
  const total = isSingleProduct ? (product?.price * quantity) : cartTotal;

  if (!isOpen) return null;
  if (!isSingleProduct && cart.length === 0 && !orderComplete) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateWhatsAppLink = () => {
    const itemsList = items.map(item =>
      `📦 ${item.name} (x${item.quantity}) - ${item.price * item.quantity} MAD`
    ).join('\n');

    const message = `🛒 *New Order*
━━━━━━━━━━━━━━
${itemsList}
━━━━━━━━━━━━━━
💰 *Total Amount:* ${total} MAD
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
      items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      total_price: total,
      status: 'pending'
    });

    if (isCartCheckout) {
      clearCart();
    }

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
                {/* Order Summary */}
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

                  {isSingleProduct ? (
                    /* Single Product View */
                    <div>
                      <div className="flex gap-4">
                        <img
                          src={product.image_url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop"}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-black">{product.name}</h3>
                          <p className="text-gray-500 text-sm">{product.size || '100ml'}</p>
                          <div className="flex items-center justify-between mt-2">
                             <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-amber-500"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-semibold">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-amber-500"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                             </div>
                             <span className="font-bold text-amber-600">{product.price * quantity} MAD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Cart Summary View */
                    <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-1.5 py-0.5 rounded">
                              {item.quantity}x
                            </span>
                            <span className="text-gray-700 truncate max-w-[180px]">{item.name}</span>
                          </div>
                          <span className="font-medium text-gray-900">{item.price * item.quantity} MAD</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 text-lg">
                    <span className="text-gray-700">Total Amount</span>
                    <span className="font-bold text-black">{total} MAD</span>
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
