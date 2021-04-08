import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import './Home.css';

const Home = () => {
   const [products, setPorducts] = useState([]);

   console.log(products)
   useEffect(() => {
      fetch('https://whispering-stream-19575.herokuapp.com/allProducts')
         .then(res => res.json())
         .then(data => {
            setPorducts(data);
         });
   }, []);

   return (
      <div>
         <div className="container mb-5 mt-2">
            <h3 className="text-center title">Welcome to Technology Shop</h3>
            {products.length > 0 ? (
               <div className="d-flex justify-content-center">
                  <div className="spinner-border d-none" role="status"></div>
               </div>
            ) : (
               <div className="d-flex justify-content-center">
                  <div className="spinner-border " role="status"></div>
               </div>
            )}

            <div className="row mr-4">
               {products.map(product => (
                  <Products key={product._id} product={product}></Products>
               ))}
            </div>
            <p className="text-center  mt-5 mb-5 text-danger">
               2021@ Technology Shop All rights reserved by Arnob Dhaka, Bangladesh.
            </p>
         </div>
      </div>
   );
};

export default Home;
