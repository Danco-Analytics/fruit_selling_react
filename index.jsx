import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Mock data for fruits
  const fruits = [
    {
      id: 1,
      name: 'Apple',
      category: 'Fruits',
      price: 2.99,
      image: 'https://placehold.co/300x300/FFB6C1/FFFFFF?text=Apple ',
      description: 'Fresh and crisp red apples perfect for snacking or baking.',
    },
    {
      id: 2,
      name: 'Banana',
      category: 'Fruits',
      price: 0.49,
      image: 'https://placehold.co/300x300/F8E71C/FFFFFF?text=Banana ',
      description: 'Ripe yellow bananas that are sweet and full of potassium.',
    },
    {
      id: 3,
      name: 'Orange',
      category: 'Citrus',
      price: 1.99,
      image: 'https://placehold.co/300x300/FFA500/FFFFFF?text=Orange ',
      description: 'Juicy and tangy oranges rich in vitamin C.',
    },
    {
      id: 4,
      name: 'Grapes',
      category: 'Berries',
      price: 3.49,
      image: 'https://placehold.co/300x300/6495ED/FFFFFF?text=Grapes ',
      description: 'Sweet and juicy grapes perfect for a healthy snack.',
    },
    {
      id: 5,
      name: 'Strawberry',
      category: 'Berries',
      price: 4.99,
      image: 'https://placehold.co/300x300/FF69B4/FFFFFF?text=Strawberry ',
      description: 'Delicious and nutritious strawberries with a natural sweetness.',
    },
    {
      id: 6,
      name: 'Mango',
      category: 'Tropical',
      price: 2.49,
      image: 'https://placehold.co/300x300/FFD700/FFFFFF?text=Mango ',
      description: 'Sweet and tropical mangoes with vibrant color and flavor.',
    },
    {
      id: 7,
      name: 'Pineapple',
      category: 'Tropical',
      price: 3.99,
      image: 'https://placehold.co/300x300/FEF261/FFFFFF?text=Pineapple ',
      description: 'Tangy and refreshing pineapple perfect for summer recipes.',
    },
    {
      id: 8,
      name: 'Blueberry',
      category: 'Berries',
      price: 5.99,
      image: 'https://placehold.co/300x300/4682B4/FFFFFF?text=Blueberry ',
      description: 'Tiny but mighty blueberries packed with antioxidants.',
    },
  ];

  const categories = ['all', ...new Set(fruits.map((fruit) => fruit.category))];

  const addToCart = (fruit) => {
    setCart([...cart, fruit]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const incrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
  };

  const filteredAndSortedFruits = [...fruits]
    .filter((fruit) => {
      if (activeTab !== 'all' && fruit.category !== activeTab) return false;
      if (searchTerm && !fruit.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low-high') {
        return a.price - b.price;
      } else if (sortOption === 'price-high-low') {
        return b.price - a.price;
      } else if (sortOption === 'name-a-z') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'name-z-a') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">FruitMart</h1>
          <nav className="space-x-6 hidden md:flex">
            <a href="#home" className="hover:text-yellow-200 transition-colors">Home</a>
            <a href="#products" className="hover:text-yellow-200 transition-colors">Products</a>
            <a href="#about" className="hover:text-yellow-200 transition-colors">About</a>
            <a href="#contact" className="hover:text-yellow-200 transition-colors">Contact</a>
          </nav>
          <button className="md:hidden text-xl">
            ☰
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-green-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to FruitMart</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Fresh, organic, and locally sourced fruits delivered straight to your door.
          </p>
          <a
            href="#products"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Product Filters */}
      <section id="products" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-full sm:w-1/2 lg:w-1/4">
              <input
                type="text"
                placeholder="Search fruits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="default">Default Sorting</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A-Z</option>
                <option value="name-z-a">Name: Z-A</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === category
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedFruits.length > 0 ? (
              filteredAndSortedFruits.map((fruit) => (
                <div
                  key={fruit.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
                >
                  <img src={fruit.image} alt={fruit.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{fruit.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{fruit.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-green-600 font-bold">${fruit.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(fruit)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No fruits found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      <section id="cart" className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md rounded-lg shadow-xl p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length > 0 ? (
            <>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600 text-sm">${item.price.toFixed(2)} x {item.quantity || 1}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="text-gray-600 hover:text-green-500"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty.</p>
              <button
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="mt-4 text-green-600 hover:text-green-800 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          )}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FruitMart</h3>
              <p className="text-gray-400">
                We bring you the freshest fruits directly from local farms.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-green-400">Home</a></li>
                <li><a href="#products" className="hover:text-green-400">Products</a></li>
                <li><a href="#about" className="hover:text-green-400">About Us</a></li>
                <li><a href="#contact" className="hover:text-green-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: support@fruitmart.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
              <p className="text-gray-400">Address: 123 Fresh Street, Nature City</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2025 FruitMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;