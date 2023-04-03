import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductGetDetail } from '../../api/ProductApi';
import { Title,Text,Image } from '@mantine/core';
import moment from "moment";

function ProductDetail() {
  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(['product', product_id], () => {
    return ProductGetDetail(product_id);
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error:' + error.message;

  //const date = format(data.createdAt,'dd/MM/yyyy');
  console.log('Detay sayfası:', data);

  return (
  <>
  <Image width={750} height={500} mx="auto" radius="md" src={data.photos[0]} alt={data.title} />
   <Title order={3}>{data.title}</Title>
   <Text fs="italic">{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
   <Text tt="capitalize">{data.description}</Text>
   <Text c="blue">{data.price}</Text>
  </>
  );
}

export default ProductDetail;
