import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import des pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import { CartProvider } from './context/CartContext';

// Import du Layout
import Layout from './components/Layout';

// Configuration de React Query
const queryClient = new QueryClient();

// Composant qui gère le contenu et détecte la page active pour le menu
function AppContent() {
  const location = useLocation();
  
  // Fonction simple pour dire au Layout sur quelle page on est
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.includes('shop')) return 'Shop';
    if (path.includes('contact')) return 'Contact';
    return '';
  };

  return (
    <Layout currentPageName={getCurrentPage()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}
