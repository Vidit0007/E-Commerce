import React, { useState } from 'react';
import './Style.css';

const AtCart = ({ product, addToCart }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowModal(true);
  };

  return (
    <>
    <div className='cards' id='cards'>
      <div className="card" >
        <img src={product.image} alt={product.title} className="images" />
        <div className="card-content">
          <h2>{product.title}</h2>
          <p className="c1">{product.category}</p>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      </div>
    </>
  );
};

export default AtCart;

// import React, { useState } from 'react';
// import './Style.css';
// const AtCart = ({ product, addToCart }) => {
//   const [showModal, setShowModal] = useState(false);

//   const handleAddToCart = () => {
//     addToCart(product);
//     setShowModal(true);
//   };

//   return (
//     <>
//     <div class="card">
      
//       {<img src={product.image} alt={product.title} class="images">
//       <div class="card-content">
//        <h2>{product.title}</h2>
//          <p class="c1">{product.category}</p>
//       <p>{product.description}</p>
//       <p>Price: ${product.price}</p>
//       <button onClick={handleAddToCart}>Add to Cart</button>
//       </div>}
//             </div>
//             </>
//         );
// };


// export default AtCart;
