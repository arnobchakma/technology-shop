import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Orders from '../Orders/Orders';

const CheckOut = () => {
   const [orderProduct, setOrderProduct] = useState({});

   const { id } = useParams();
   useEffect(() => {
      fetch(`https://whispering-stream-19575.herokuapp.com/product/${id}`)
         .then(res => res.json())
         .then(data => {
            setOrderProduct(data[0]);
         });
   }, []);

   return <div>{<Orders orderProduct={orderProduct}></Orders>}</div>;
};

export default CheckOut;
