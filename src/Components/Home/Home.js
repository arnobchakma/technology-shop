import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import './Home.css';

const Home = () => {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      fetch('https://whispering-stream-19575.herokuapp.com/allProducts')
         .then(res => res.json())
         .then(data => {
            setProducts(data);
         });
   }, []);

   return (
      <div className="home-section">
         <div className="container my-2">
            <h1 className="text-center my-2">WELCOME TO TECHNOLOGY SERVICE</h1>
            {products.length > 0 ? (
               <div className="d-flex justify-content-center">
                  <div className="spinner-border d-none" role="status"></div>
               </div>
            ) : (
               <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status"></div>
               </div>
            )}

            {/* Main Product Section */}
            <div className="row">
               {products.map(product => (
                  <Products key={product._id} product={product}></Products>
               ))}
            </div>

            {/* Footer Part */}
            <h5 className="text-center my-5 pb-5 text-dark">
               Copyright {(new Date()).getFullYear()} | Privacy Policy | All Rights Reserved | Powered by <span className='text-info'>ARNOB</span>
            </h5>
         </div>
      </div>
   );
};

export default Home;
