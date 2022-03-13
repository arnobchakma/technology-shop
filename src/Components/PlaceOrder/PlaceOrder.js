import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import { UserContext } from '../../App';

const PlaceOrder = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const history = useHistory();
   const [getOrders, setGetOrder] = useState([]);
   const getOrder = getOrders.length < 0 || getOrders;

   const user = loggedInUser && loggedInUser.email;
   useEffect(() => {
      fetch(`https://whispering-stream-19575.herokuapp.com/getOrder/${user}`)
         .then(res => res.json())
         .then(data => setGetOrder(data));
   }, []);

   const { customer, email, date } = getOrder.length > 0 && getOrder[0];

   // Confirmation message with popup
   const confirmOrder = () => {
      swal('Good Job', 'You bought the products!', 'success');
      history.push('/');
   };

   return (
      <div className="p-4">
         <h3 className="fw-bolder text-info">Orders Summary</h3>
         <hr />
         {getOrder ? (
            <div className="d-flex justify-content-center">
               <div className="spinner-border d-none" role="status"></div>
            </div>
         ) : (
            <div className="d-flex justify-content-center">
               <div className="spinner-border " role="status"></div>
            </div>
         )}
         <div>
            <h5 className="fw-bolder mt-4 text-info">Customer Details</h5>
            <div className="text-info">
               <p>Name: {customer}</p>
               <p>Email: {email}</p>
               <p>Order Date: {date}</p>
            </div>
         </div>
         <div>
            <h5 className="fw-bolder mt-5 text-info">Order Details</h5>
            <Table responsive>
               <thead>
                  <tr className="text-info">
                     <th>No</th>
                     <th>Products</th>
                     <th>Quantity</th>
                     <th>Price</th>
                  </tr>
               </thead>
               {getOrders.map(product => (
                  <tbody>
                     <tr className="text-info">
                        <td></td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>$ {product.price}.00</td>
                     </tr>
                  </tbody>
               ))}
            </Table>
         </div>
         <button onClick={confirmOrder} className="btn btn-success">
            Order Confirm
         </button>
      </div>
   );
};

export default PlaceOrder;
