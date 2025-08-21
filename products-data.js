// Sample Products Data for BuyOn E-commerce Website
const productsData = [
    // Electronics
    {
        id: 1,
        title: "iPhone 15 Pro Max - 256GB",
        brand: "Apple",
        category: "electronics",
        price: 134900,
        originalPrice: 149900,
        discount: 10,
        rating: 4.8,
        reviewCount: 1234,
        image: "https://m.media-amazon.com/images/I/31KxpX7Xk7L._SX300_SY300_QL70_FMwebp_.jpg",
        description: "The most advanced iPhone yet with titanium design, A17 Pro chip, and revolutionary camera system.",
        inStock: true,
        features: ["A17 Pro Chip", "48MP Camera", "Titanium Design", "Action Button"],
        specifications: {
            "Display": "6.7-inch Super Retina XDR",
            "Processor": "A17 Pro chip",
            "Storage": "256GB",
            "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
            "Battery": "Up to 29 hours video playback"
        }
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        category: "electronics",
        price: 124999,
        originalPrice: 134999,
        discount: 7,
        rating: 4.7,
        reviewCount: 987,
        image: "https://m.media-amazon.com/images/I/41CDymsLqvL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Galaxy AI is here. The most powerful Galaxy yet with S Pen built-in and advanced camera capabilities.",
        inStock: true,
        features: ["Galaxy AI", "S Pen Built-in", "200MP Camera", "5000mAh Battery"],
        specifications: {
            "Display": "6.8-inch Dynamic AMOLED 2X",
            "Processor": "Snapdragon 8 Gen 3",
            "Storage": "256GB",
            "Camera": "200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto",
            "Battery": "5000mAh with 45W fast charging"
        }
    },
    {
        id: 3,
        title: "MacBook Air M3 - 13 inch",
        brand: "Apple",
        category: "electronics",
        price: 114900,
        originalPrice: 124900,
        discount: 8,
        rating: 4.9,
        reviewCount: 756,
        image: "https://m.media-amazon.com/images/I/41PlpJ2I5bL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Supercharged by the M3 chip, the redesigned MacBook Air is more capable than ever.",
        inStock: true,
        features: ["M3 Chip", "18-hour battery", "Liquid Retina Display", "MagSafe Charging"],
        specifications: {
            "Processor": "Apple M3 chip",
            "Memory": "8GB unified memory",
            "Storage": "256GB SSD",
            "Display": "13.6-inch Liquid Retina",
            "Battery": "Up to 18 hours"
        }
    },
    {
        id: 4,
        title: "Sony WH-1000XM5 Wireless Headphones",
        brand: "Sony",
        category: "electronics",
        price: 29990,
        originalPrice: 34990,
        discount: 14,
        rating: 4.6,
        reviewCount: 2341,
        image: "https://m.media-amazon.com/images/I/31+CMjgVyHL._SY300_SX300_.jpg",
        description: "Industry-leading noise canceling with premium sound quality and comfort.",
        inStock: true,
        features: ["Industry-leading Noise Canceling", "30-hour battery", "Multipoint Connection", "Quick Charge"],
        specifications: {
            "Driver": "30mm dynamic driver",
            "Battery": "30 hours with NC ON",
            "Charging": "3 min charge = 3 hours playback",
            "Weight": "250g",
            "Connectivity": "Bluetooth 5.2"
        }
    },
    {
        id: 5,
        title: "Dell XPS 13 Plus Laptop",
        brand: "Dell",
        category: "electronics",
        price: 94999,
        originalPrice: 109999,
        discount: 14,
        rating: 4.5,
        reviewCount: 432,
        image: "https://m.media-amazon.com/images/I/41FrSXF3SRL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Premium ultrabook with stunning InfinityEdge display and powerful performance.",
        inStock: true,
        features: ["12th Gen Intel Core", "13.4-inch InfinityEdge", "Premium Materials", "Thunderbolt 4"],
        specifications: {
            "Processor": "12th Gen Intel Core i7",
            "Memory": "16GB LPDDR5",
            "Storage": "512GB PCIe SSD",
            "Display": "13.4-inch 3.5K OLED",
            "Graphics": "Intel Iris Xe"
        }
    },

    // Fashion
    {
        id: 6,
        title: "Levi's 511 Slim Jeans",
        brand: "Levi's",
        category: "fashion",
        price: 3499,
        originalPrice: 4499,
        discount: 22,
        rating: 4.4,
        reviewCount: 1876,
        image: "https://m.media-amazon.com/images/I/51itz3BOlEL._SX679_.jpg",
        description: "Classic slim-fit jeans that sit below the waist with a slim leg from hip to ankle.",
        inStock: true,
        features: ["Slim Fit", "Cotton Blend", "5-Pocket Design", "Button Fly"],
        specifications: {
            "Fit": "Slim",
            "Rise": "Mid Rise",
            "Material": "99% Cotton, 1% Elastane",
            "Care": "Machine Wash",
            "Origin": "Made in India"
        }
    },
    {
        id: 7,
        title: "Nike Air Force 1 '07",
        brand: "Nike",
        category: "fashion",
        price: 7495,
        originalPrice: 8295,
        discount: 10,
        rating: 4.7,
        reviewCount: 3421,
        image: "https://m.media-amazon.com/images/I/6151YmI-c8L._SY695_.jpg",
        description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best.",
        inStock: true,
        features: ["Leather Upper", "Air Cushioning", "Rubber Outsole", "Perforated Toe"],
        specifications: {
            "Upper": "Leather",
            "Sole": "Rubber",
            "Closure": "Lace-up",
            "Toe Shape": "Round Toe",
            "Weight": "1.2 lbs"
        }
    },
    {
        id: 8,
        title: "Adidas Ultraboost 22 Running Shoes",
        brand: "Adidas",
        category: "fashion",
        price: 16999,
        originalPrice: 18999,
        discount: 11,
        rating: 4.6,
        reviewCount: 1543,
        image: "https://m.media-amazon.com/images/I/61YqfEHKZWL._SX695_.jpg",
        description: "Experience incredible energy return with every step in these performance running shoes.",
        inStock: true,
        features: ["BOOST Midsole", "Primeknit Upper", "Continental Rubber", "Torsion System"],
        specifications: {
            "Technology": "BOOST",
            "Upper": "Primeknit",
            "Outsole": "Continental Rubber",
            "Drop": "10mm",
            "Weight": "320g"
        }
    },
    {
        id: 9,
        title: "Ray-Ban Aviator Classic",
        brand: "Ray-Ban",
        category: "fashion",
        price: 8990,
        originalPrice: 10500,
        discount: 14,
        rating: 4.8,
        reviewCount: 987,
        image: "https://m.media-amazon.com/images/I/41kZqKE3uIL._SX679_.jpg",
        description: "The original pilot sunglasses that have been a style icon for decades.",
        inStock: true,
        features: ["G-15 Lens", "Gold Frame", "100% UV Protection", "Case Included"],
        specifications: {
            "Frame Material": "Metal",
            "Lens Material": "Glass",
            "UV Protection": "100%",
            "Frame Width": "140mm",
            "Lens Width": "58mm"
        }
    },
    {
        id: 10,
        title: "Tommy Hilfiger Cotton Polo Shirt",
        brand: "Tommy Hilfiger",
        category: "fashion",
        price: 2899,
        originalPrice: 3599,
        discount: 19,
        rating: 4.3,
        reviewCount: 654,
        image: "https://m.media-amazon.com/images/I/714GX4MiKuL._SY879_.jpg",
        description: "Classic polo shirt crafted from premium cotton with signature flag logo.",
        inStock: true,
        features: ["100% Cotton", "Classic Fit", "Ribbed Collar", "Flag Logo"],
        specifications: {
            "Material": "100% Cotton",
            "Fit": "Classic",
            "Collar": "Ribbed",
            "Sleeves": "Short",
            "Care": "Machine Wash"
        }
    },

    // Home & Living
    {
        id: 11,
        title: "IKEA HEMNES Bed Frame",
        brand: "IKEA",
        category: "home",
        price: 12999,
        originalPrice: 14999,
        discount: 13,
        rating: 4.5,
        reviewCount: 876,
        image: "https://m.media-amazon.com/images/I/81I1QrilMrL._SX679_.jpg",
        description: "Solid wood bed frame with timeless design and sturdy construction.",
        inStock: true,
        features: ["Solid Pine", "Adjustable Sides", "Under-bed Storage", "Easy Assembly"],
        specifications: {
            "Material": "Solid Pine",
            "Size": "Queen",
            "Dimensions": "209x174 cm",
            "Weight": "45 kg",
            "Assembly": "Required"
        }
    },
    {
        id: 12,
        title: "Philips Hue Smart Light Starter Kit",
        brand: "Philips",
        category: "home",
        price: 8999,
        originalPrice: 10999,
        discount: 18,
        rating: 4.7,
        reviewCount: 1234,
        image: "https://m.media-amazon.com/images/I/41KKNxhNhNL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Smart lighting system with millions of colors and wireless control.",
        inStock: true,
        features: ["16 Million Colors", "App Control", "Voice Control", "Scheduling"],
        specifications: {
            "Type": "LED Smart Bulbs",
            "Connectivity": "Zigbee",
            "Power": "9W",
            "Lifespan": "25000 hours",
            "Compatibility": "Alexa, Google, Apple HomeKit"
        }
    },
    {
        id: 13,
        title: "Dyson V15 Detect Absolute",
        brand: "Dyson",
        category: "home",
        price: 54900,
        originalPrice: 59900,
        discount: 8,
        rating: 4.8,
        reviewCount: 543,
        image: "https://m.media-amazon.com/images/I/31DMXHLTSWL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Powerful cordless vacuum with laser technology to reveal microscopic dust.",
        inStock: true,
        features: ["Laser Detection", "60 Minutes Runtime", "LCD Screen", "5 Attachments"],
        specifications: {
            "Type": "Cordless Stick Vacuum",
            "Runtime": "Up to 60 minutes",
            "Dustbin": "0.77L",
            "Weight": "3.0kg",
            "Filtration": "Advanced whole-machine filtration"
        }
    },
    {
        id: 14,
        title: "KitchenAid Stand Mixer Classic",
        brand: "KitchenAid",
        category: "home",
        price: 34999,
        originalPrice: 39999,
        discount: 13,
        rating: 4.9,
        reviewCount: 765,
        image: "https://m.media-amazon.com/images/I/41YZy+kYyfL._SY300_SX300_.jpg",
        description: "Professional-grade stand mixer for all your baking and cooking needs.",
        inStock: true,
        features: ["10-Speed Control", "4.5qt Bowl", "Tilt-Head Design", "Multiple Attachments"],
        specifications: {
            "Capacity": "4.5 Quart",
            "Power": "275 Watts",
            "Speeds": "10",
            "Dimensions": "35.3 x 22.1 x 35.1 cm",
            "Weight": "10.9 kg"
        }
    },

    // Books
    {
        id: 15,
        title: "Atomic Habits by James Clear",
        brand: "Random House",
        category: "books",
        price: 599,
        originalPrice: 799,
        discount: 25,
        rating: 4.9,
        reviewCount: 12543,
        image: "https://m.media-amazon.com/images/I/419aJfhczCL._SY445_SX342_.jpg",
        description: "Tiny Changes, Remarkable Results. The life-changing million-copy bestseller.",
        inStock: true,
        features: ["Paperback", "320 Pages", "Self-Help", "New York Times Bestseller"],
        specifications: {
            "Author": "James Clear",
            "Publisher": "Random House Business",
            "Pages": "320",
            "Language": "English",
            "ISBN": "9781847941831"
        }
    },
    {
        id: 16,
        title: "The Psychology of Money",
        brand: "Jaico Publishing",
        category: "books",
        price: 349,
        originalPrice: 499,
        discount: 30,
        rating: 4.7,
        reviewCount: 8765,
        image: "https://m.media-amazon.com/images/I/41mxvU9Tu6L._SY445_SX342_.jpg",
        description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.",
        inStock: true,
        features: ["Paperback", "252 Pages", "Finance", "Bestseller"],
        specifications: {
            "Author": "Morgan Housel",
            "Publisher": "Jaico Publishing House",
            "Pages": "252",
            "Language": "English",
            "ISBN": "9788194790420"
        }
    },
    {
        id: 17,
        title: "Think and Grow Rich",
        brand: "Penguin Random House",
        category: "books",
        price: 199,
        originalPrice: 299,
        discount: 33,
        rating: 4.6,
        reviewCount: 15432,
        image: "https://m.media-amazon.com/images/I/41aL70yoloL._SX342_SY445_.jpg",
        description: "The classic guide to wealth and success by Napoleon Hill.",
        inStock: true,
        features: ["Paperback", "384 Pages", "Self-Help", "Classic"],
        specifications: {
            "Author": "Napoleon Hill",
            "Publisher": "Penguin Random House",
            "Pages": "384",
            "Language": "English",
            "ISBN": "9780143442295"
        }
    },

    // Sports
    {
        id: 18,
        title: "Yonex Arcsaber 11 Badminton Racket",
        brand: "Yonex",
        category: "sports",
        price: 14999,
        originalPrice: 17999,
        discount: 17,
        rating: 4.7,
        reviewCount: 432,
        image: "https://m.media-amazon.com/images/I/418StjeAwgL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Professional badminton racket with excellent control and power.",
        inStock: true,
        features: ["Carbon Fiber", "Isometric Head", "Built-in T-Joint", "Professional Grade"],
        specifications: {
            "Weight": "88g",
            "Balance": "Even",
            "Flexibility": "Medium",
            "String Tension": "20-28 lbs",
            "Material": "HM Graphite + Nanomesh Neo"
        }
    },
    {
        id: 19,
        title: "Nike Mercurial Vapor 15 Football Boots",
        brand: "Nike",
        category: "sports",
        price: 12995,
        originalPrice: 14995,
        discount: 13,
        rating: 4.5,
        reviewCount: 876,
        image: "https://m.media-amazon.com/images/I/71GFRZbZgpL._SX695_.jpg",
        description: "Lightweight football boots designed for speed and agility on the pitch.",
        inStock: true,
        features: ["Flyknit Upper", "Zoom Air Unit", "Speed Cage", "All Conditions Control"],
        specifications: {
            "Upper": "Flyknit",
            "Sole": "TPU with conical studs",
            "Closure": "Lace-up",
            "Surface": "Firm Ground",
            "Weight": "210g"
        }
    },
    {
        id: 20,
        title: "Decathlon Gym Bag - 35L",
        brand: "Decathlon",
        category: "sports",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        rating: 4.4,
        reviewCount: 1234,
        image: "https://m.media-amazon.com/images/I/41aOlOAL6-L._SY300_SX300_.jpg",
        description: "Durable gym bag with multiple compartments for all your fitness gear.",
        inStock: true,
        features: ["Water Resistant", "Shoe Compartment", "Multiple Pockets", "Adjustable Straps"],
        specifications: {
            "Capacity": "35 Liters",
            "Material": "Polyester",
            "Dimensions": "50 x 25 x 28 cm",
            "Weight": "0.8 kg",
            "Compartments": "3 main + 2 side"
        }
    },

    // Beauty
    {
        id: 21,
        title: "Lakme Absolute Perfect Radiance Kit",
        brand: "Lakme",
        category: "beauty",
        price: 2999,
        originalPrice: 3999,
        discount: 25,
        rating: 4.3,
        reviewCount: 2876,
        image: "https://m.media-amazon.com/images/I/31H3RGxnFHL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Complete skincare routine for radiant and glowing skin.",
        inStock: true,
        features: ["Face Wash", "Day Cream", "Night Cream", "Serum"],
        specifications: {
            "Skin Type": "All Skin Types",
            "Benefits": "Brightening, Anti-aging",
            "Quantity": "4 products",
            "Suitable For": "Women",
            "Shelf Life": "3 years"
        }
    },
    {
        id: 22,
        title: "The Body Shop Tea Tree Oil",
        brand: "The Body Shop",
        category: "beauty",
        price: 1295,
        originalPrice: 1695,
        discount: 24,
        rating: 4.6,
        reviewCount: 1543,
        image: "https://m.media-amazon.com/images/I/413c1v1DvXL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "100% pure tea tree oil for blemish-prone skin treatment.",
        inStock: true,
        features: ["100% Pure", "Anti-bacterial", "Blemish Treatment", "Natural"],
        specifications: {
            "Volume": "10ml",
            "Type": "Essential Oil",
            "Skin Type": "Oily, Acne-prone",
            "Application": "Spot treatment",
            "Origin": "Australia"
        }
    },
    {
        id: 23,
        title: "Maybelline New York Mascara",
        brand: "Maybelline",
        category: "beauty",
        price: 799,
        originalPrice: 1099,
        discount: 27,
        rating: 4.4,
        reviewCount: 3456,
        image: "https://m.media-amazon.com/images/I/31sEz5bPt6L._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Voluminous lashes with dramatic length and definition.",
        inStock: true,
        features: ["Waterproof", "Volume & Length", "Curved Brush", "12-hour Wear"],
        specifications: {
            "Type": "Mascara",
            "Formula": "Waterproof",
            "Color": "Black",
            "Brush Type": "Curved",
            "Wear Time": "12 hours"
        }
    },
    {
        id: 24,
        title: "Neutrogena Ultra Sheer Sunscreen SPF 50+",
        brand: "Neutrogena",
        category: "beauty",
        price: 649,
        originalPrice: 799,
        discount: 19,
        rating: 4.7,
        reviewCount: 2109,
        image: "https://m.media-amazon.com/images/I/31noQFqHpVL._SX300_SY300_QL70_FMwebp_.jpg",
        description: "Lightweight, non-greasy sunscreen with broad spectrum protection.",
        inStock: true,
        features: ["SPF 50+", "PA+++", "Water Resistant", "Non-comedogenic"],
        specifications: {
            "Volume": "88ml",
            "SPF": "50+",
            "Type": "Chemical Sunscreen",
            "Skin Type": "All Skin Types",
            "Water Resistance": "80 minutes"
        }
    }
];

// Categories data
const categories = [
    { id: 'all', name: 'All Products', icon: 'fas fa-th-large' },
    { id: 'electronics', name: 'Electronics', icon: 'fas fa-mobile-alt' },
    { id: 'fashion', name: 'Fashion', icon: 'fas fa-tshirt' },
    { id: 'home', name: 'Home & Living', icon: 'fas fa-home' },
    { id: 'books', name: 'Books', icon: 'fas fa-book' },
    { id: 'sports', name: 'Sports', icon: 'fas fa-dumbbell' },
    { id: 'beauty', name: 'Beauty', icon: 'fas fa-spa' }
];

// Brands data
const brands = [
    'Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Levi\'s', 'Dell', 'IKEA', 
    'Philips', 'Dyson', 'KitchenAid', 'Yonex', 'Decathlon', 'Lakme', 
    'The Body Shop', 'Maybelline', 'Neutrogena', 'Random House', 
    'Penguin Random House', 'Jaico Publishing', 'Tommy Hilfiger', 'Ray-Ban'
];

// Utility functions for products
const ProductUtils = {
    // Get products by category
    getByCategory: (category) => {
        if (category === 'all') return productsData;
        return productsData.filter(product => product.category === category);
    },

    // Get products by brand
    getByBrand: (brand) => {
        return productsData.filter(product => product.brand === brand);
    },

    // Get products by price range
    getByPriceRange: (min, max) => {
        return productsData.filter(product => product.price >= min && product.price <= max);
    },

    // Get products by rating
    getByRating: (minRating) => {
        return productsData.filter(product => product.rating >= minRating);
    },

    // Search products
    search: (query) => {
        const searchTerm = query.toLowerCase();
        return productsData.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    },

    // Sort products
    sort: (products, sortBy) => {
        const sorted = [...products];

        switch(sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sorted.sort((a, b) => b.id - a.id);
            case 'relevance':
            default:
                return sorted;
        }
    },

    // Get product by ID
    getById: (id) => {
        return productsData.find(product => product.id === parseInt(id));
    },

    // Get featured products
    getFeatured: (limit = 8) => {
        return productsData
            .filter(product => product.rating >= 4.5)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    },

    // Get discounted products
    getDiscounted: (minDiscount = 15, limit = 12) => {
        return productsData
            .filter(product => product.discount >= minDiscount)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, limit);
    },

    // Get related products
    getRelated: (productId, limit = 4) => {
        const product = ProductUtils.getById(productId);
        if (!product) return [];

        return productsData
            .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
            .slice(0, limit);
    },

    // Format price
    formatPrice: (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    },

    // Generate star rating HTML
    generateStarRating: (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star star empty"></i>';
        }

        return stars;
    },

    // Get product image placeholder
    getImagePlaceholder: (category) => {
        const categoryIcons = {
            electronics: 'fas fa-mobile-alt',
            fashion: 'fas fa-tshirt',
            home: 'fas fa-couch',
            books: 'fas fa-book',
            sports: 'fas fa-dumbbell',
            beauty: 'fas fa-spa'
        };

        return categoryIcons[category] || 'fas fa-box';
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsData, categories, brands, ProductUtils };
}
