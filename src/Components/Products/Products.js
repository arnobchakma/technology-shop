import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Products.css';
import { useHistory } from 'react-router';

const Products = ({ product }) => {
   const history = useHistory();
   const handleProduct = id => {
      history.push(`/product/${id}`);
   };

   return (
      <div className="col-lg-4 col-md-6 mt-5">
         <div className="single-product card-body text-center">
            {/* Image and name part */}
            <div>
               <img className="product-image" src={product.imageURL} alt="product images" />
               <h6 className='my-3'>{product.name}</h6>
            </div>

            {/* Price and button part */}
            <div className="d-flex align-items-center justify-content-between">
               <h4>${product.price}</h4>
               <button
                  className="btn border"
                  onClick={() => handleProduct(product._id)}
                  type="button"
               >
                  <FontAwesomeIcon icon={faShoppingCart} /> Buy now
               </button>
            </div>

         </div>
      </div>
   );
};

export default Products;

