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
  },
  {
    id: "5",
    name: "Velvet Orchid",
    description: "Un parfum luxueux et séduisant aux notes florales profondes.",
    price: 420,
    original_price: 480,
    category: "women",
    image_url: "https://images.unsplash.com/photo-1588405764498-956512775f0a?w=800&h=800&fit=crop",
    featured: true,
    in_stock: true,
    notes: ["Orchidée", "Miel", "Rhum"],
    size: "100ml",
    created_date: new Date().toISOString()
  },
  {
    id: "6",
    name: "Cedar Wood",
    description: "L'essence brute de la forêt dans un flacon élégant.",
    price: 380,
    original_price: null,
    category: "men",
    image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop",
    featured: false,
    in_stock: true,
    notes: ["Cèdre", "Poivre noir", "Vétiver"],
    size: "100ml",
    created_date: new Date().toISOString()
  },
  {
    id: "7",
    name: "Vanilla Dream",
    description: "Une douceur sucrée et réconfortante pour tous les jours.",
    price: 250,
    original_price: 300,
    category: "women",
    image_url: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop",
    featured: false,
    in_stock: true,
    notes: ["Vanille", "Caramel", "Musc blanc"],
    size: "50ml",
    created_date: new Date().toISOString()
  },
  {
    id: "8",
    name: "Spice Market",
    description: "Un voyage olfactif au cœur des souks orientaux.",
    price: 550,
    original_price: 650,
    category: "unisex",
    image_url: "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?w=800&h=800&fit=crop",
    featured: true,
    in_stock: true,
    notes: ["Cannelle", "Cardamome", "Encens"],
    size: "100ml",
    created_date: new Date().toISOString()
  },
  {
    id: "9",
    name: "Citrus Splash",
    description: "Une explosion de fraîcheur citronnée pour l'été.",
    price: 220,
    original_price: null,
    category: "unisex",
    image_url: "https://images.unsplash.com/photo-1595181180295-d60235391d14?w=800&h=800&fit=crop",
    featured: false,
    in_stock: true,
    notes: ["Citron", "Pamplemousse", "Menthe"],
    size: "100ml",
    created_date: new Date().toISOString()
  },
  {
    id: "10",
    name: "Midnight Musk",
    description: "L'élégance intemporelle du musc noir.",
    price: 480,
    original_price: 550,
    category: "men",
    image_url: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=800&h=800&fit=crop",
    featured: false,
    in_stock: true,
    notes: ["Musc noir", "Patchouli", "Cuir"],
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
