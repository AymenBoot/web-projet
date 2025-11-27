import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';
import CheckoutModal from '@/components/shared/CheckoutModal';

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'Shop', page: 'Shop' },
    { name: 'For Him', page: 'Shop?category=men' },
    { name: 'For Her', page: 'Shop?category=women' },
    { name: 'Contact', page: 'Contact' }
  ];

  const isHomePage = currentPageName === 'Home';
  const headerBg = isHomePage 
    ? (isScrolled ? 'bg-black' : 'bg-transparent') 
    : 'bg-black';

  return (
    <div className="min-h-screen">
      <style>{`
        :root {
          --color-primary: #f59e0b;
          --color-primary-dark: #d97706;
          --color-black: #000000;
          --color-white: #ffffff;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="text-2xl font-light tracking-wider text-white">
              TWIN<span className="text-amber-500 font-normal">FRAGRANCE</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`text-sm font-medium tracking-wider uppercase transition-colors ${
                    currentPageName === link.page.split('?')[0]
                      ? 'text-amber-500'
                      : 'text-white/80 hover:text-amber-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={toggleCart}
                className="relative p-2 text-white hover:text-amber-500 transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link 
                to={createPageUrl('Shop')}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-2.5 text-sm font-semibold tracking-wider uppercase transition-colors"
              >
                Shop Now
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleCart}
                className="relative w-10 h-10 flex items-center justify-center text-white hover:text-amber-500 transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black border-t border-white/10"
            >
              <nav className="container mx-auto px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-lg font-medium transition-colors ${
                      currentPageName === link.page.split('?')[0]
                        ? 'text-amber-500'
                        : 'text-white/80 hover:text-amber-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  to={createPageUrl('Shop')}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 font-semibold tracking-wider uppercase transition-colors mt-4"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className={isHomePage ? '' : 'pt-20'}>
        {children}
      </main>

      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        isCartCheckout={true}
      />
    </div>
  );
}