// src/utils/index.js

export const createPageUrl = (page) => {
  // Gestion simple des URLs
  if (!page || page === 'Home') return '/';
  
  // Si la page contient déjà des paramètres (ex: "Shop?category=men")
  if (page.includes('?')) {
    const [path, query] = page.split('?');
    return `/${path.toLowerCase()}?${query}`;
  }

  return `/${page.toLowerCase()}`;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD'
  }).format(price);
};