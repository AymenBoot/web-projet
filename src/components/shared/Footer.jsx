import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-light tracking-wider mb-4">
              TWIN<span className="text-amber-500">FRAGRANCE</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Discover luxury fragrances crafted for the modern connoisseur. 
              Experience the art of perfumery.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-500 font-semibold tracking-wider uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl('Home')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Shop')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Shop?category=men')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  For Him
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Shop?category=women')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  For Her
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Contact')} className="text-gray-400 hover:text-amber-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-amber-500 font-semibold tracking-wider uppercase mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Shipping Information</span>
              </li>
              <li>
                <span className="text-gray-400">Return Policy</span>
              </li>
              <li>
                <span className="text-gray-400">FAQ</span>
              </li>
              <li>
                <span className="text-gray-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-gray-400">Terms & Conditions</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-amber-500 font-semibold tracking-wider uppercase mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Morocco
                </span>
              </li>
              <li>
                <a 
                  href="tel:+212663069357" 
                  className="flex items-center gap-3 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <Phone className="w-5 h-5 text-amber-500" />
                  +212 663 069 357
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@twinfragrance.shop" 
                  className="flex items-center gap-3 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <Mail className="w-5 h-5 text-amber-500" />
                  contact@twinfragrance.shop
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Twin Fragrance. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 opacity-50" />
              <span className="text-gray-500 text-sm">Cash on Delivery Available</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}