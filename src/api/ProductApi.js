import React from 'react';
import axios from 'axios';

export const ProductApi = async () => {
  const {data} = await axios.get(`http://localhost:4000/product`);
  return data;
};

export const ProductGetDetail = async (product_id) => {
  const {data} = await axios.get(`http://localhost:4000/product/${product_id}`);
  return data;
}
