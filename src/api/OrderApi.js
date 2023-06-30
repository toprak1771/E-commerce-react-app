import React from 'react';
import axios from 'axios';

export const OrderApi = async (input) => {
  const token = localStorage.getItem('access_token');
  console.log("token:",token);
  const { data } = await axios.post(`http://localhost:4000/order`, input, {
    headers: {
      authorization: token,
    },
  });
  return data;
};

export const OrderList = async () => {
  const token = localStorage.getItem('access_token');
  console.log("token:",token);
  const { data } = await axios.get('http://localhost:4000/order',{
    headers: {
      authorization: token,
    },
  });
  return data;
}
