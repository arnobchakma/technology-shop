import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table } from 'react-bootstrap';

const Orders = props => {
   const [startDate, setStartDate] = useState(new Date());
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const orderProduct = props.orderProduct;
   const history = useHistory();
   const handleOrder = data => {
      const checkOutData = {
         ...data,
         email: loggedInUser.email,
         customer: loggedInUser.displayName,
         date: startDate,
      };
      fetch('https://whispering-stream-19575.herokuapp.com/orderAdd', {
         // mode: 'no-cors',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(checkOutData),
      });
      history.push('/placeOrder');
   };

   return (
      <div>
         <h1 className="mt-4 text-danger">Order Checkout</h1>
         <Table striped bordered hover responsive>
            <thead>
               <tr className="text-success">
                  <th>Serial No:</th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Price</th>
               </tr>
            </thead>
            <tbody>
               <tr className="text-success">
                  <td>1</td>
                  <td>{orderProduct.name}</td>
                  <td>{orderProduct.quantity}</td>
                  <td>$ {orderProduct.price}.00</td>
               </tr>
               <tr className="text-success">
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>$ {orderProduct.price}.00</td>
               </tr>
            </tbody>
         </Table>
         <DatePicker
            className="mt-4 text-danger"
            selected={startDate}
            onChange={date => setStartDate(date)}
         />{' '}
         <br />
         <button
            className="mt-4 btn btn-danger"
            onClick={() => handleOrder(orderProduct)}>
            Checkout
         </button>
      </div>
   );
};

export default Orders;
