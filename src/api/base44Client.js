// src/api/base44Client.js

// Données simulées pour que le site s'affiche correctement
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Oud Royal",
    description: "Un parfum intense et mystérieux aux notes boisées et épicées.",
    price: 450,
    original_price: 600,
    category: "men",
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop",
    featured: true,
    in_stock: true,
    notes: ["Oud", "Ambre", "Musc"],
    size: "100ml",
    created_date: new Date().toISOString()
  },
  {
    id: "2",
    name: "Rose Élégance",
    description: "Une fragrance florale délicate pour une touche de féminité absolue.",
    price: 350,
    original_price: 400,
    category: "women",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop",
    featured: true,
    in_stock: true,
    notes: ["Rose", "Jasmin", "Vanille"],
    size: "100ml",
    created_date: new Date().toISOString()
  },
  {
    id: "3",
    name: "Amber Gold",
    description: "L'équilibre parfait entre la chaleur de l'ambre et la fraîcheur des agrumes.",
    price: 500,
    original_price: null,
    category: "unisex",
    image_url: "https://images.unsplash.com/photo-1595425964272-fc617fa5a992?w=800&h=800&fit=crop",
    featured: false,
    in_stock: true,
    notes: ["Ambre", "Bergamote", "Santal"],
    size: "100ml",
    created_date: new Date().toISOString()
  },
  {
    id: "4",
    name: "Night Ocean",
    description: "Une fraîcheur marine intense pour l'homme moderne.",
    price: 299,
    original_price: 350,
    category: "men",
    image_url: "https://images.unsplash.com/photo-1523293188086-b589b9e01230?w=800&h=800&fit=crop",
    featured: false,
    in_stock: true,
    notes: ["Notes marines", "Cèdre", "Menthe"],
    size: "100ml",
    created_date: new Date().toISOString()
  }
];

// Simulation du client API
export const base44 = {
  entities: {
    Product: {
      list: async () => {
        // Simule un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_PRODUCTS;
      },
      filter: async (criteria) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        let results = [...MOCK_PRODUCTS];
        
        if (criteria.id) {
          results = results.filter(p => p.id === criteria.id);
        }
        if (criteria.category) {
          results = results.filter(p => p.category === criteria.category);
        }
        return results;
      }
    },
    Order: {
      create: async (orderData) => {
        console.log("COMMANDE ENREGISTRÉE (Simulation) :", orderData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, id: Math.random().toString(36).substr(2, 9) };
      }
    }
  }
};