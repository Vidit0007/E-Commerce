import React, { useState, useEffect } from 'react';
import AtCart from './AtCart';
// import ThreeImageSlider from './ThreeImageSlider';
import './Style.css';


const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('en');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [category]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products${category ? `?category=${category}` : ''}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleAddToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      // If item already exists in cart, increase its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      setCart(updatedCart);
    } else {
      // If item doesn't exist in cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalQuantityOfItem = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())&&
    (category ? product.category === category : true)
  );

  return (
    <div className="container">

      <header className="bgi">
        
        <div className="top-bar">
          <div>
            <label>Category:</label>
            <select value={category} onChange={handleCategoryChange}>
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Search:</label>
            <input type="text"
                   value={searchTerm}
                   onChange={handleSearchChange}
                   placeholder={language === 'en' ? 'Search...' : 'Buscar...'}
                   className='inpu' />
          </div>
          <div>
            <label>Language:</label>
            <select value={language} onChange={handleLanguageChange} className="language-select">
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <button onClick={() => setShowCartModal(true)} className="cart-btn">View Cart ({getTotalItemsInCart()})</button>
        </div>
      <h1 className='head'>WELCOME TO AN ERA <br/>OF <br/>PREMIUM QUALITY OF PRODUCTS</h1>

      </header>
      <h1 className='hh'>CLOTHING & GADGETS</h1>
      {showCartModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCartModal(false)}>&times;</span>
            <h2>Shopping Cart</h2>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <p>{item.title} - ${item.price} x {item.quantity}</p>
                <button onClick={() => handleRemoveFromCart(item.id)} className="remove-btn">Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="product-container">
        {filteredProducts.map(product => (
          <AtCart key={product.id} product={product} addToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default App;
