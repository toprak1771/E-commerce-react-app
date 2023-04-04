import React from 'react';
import Index from '../../components/card/Index';
import { Grid } from '@mantine/core';
import {
  useQuery ,
} from '@tanstack/react-query';
import { ProductApi } from '../../api/ProductApi';

function Product() {
  const {isLoading,error,data} = useQuery({ queryKey: ['products'], queryFn: ProductApi,refetchOnWindowFocus:false,refetchOnMount:false })

  if(isLoading) return "Loading...";
  if(error) return "Error:" + error.message;

  //console.log(data);
  return (
    <Grid justify='space-between' sx={{paddingLeft:"15px",paddingTop:"15px",margin:"0"}}>
      {data.map((item,key) => (
        <Grid.Col span={4}><Index key={key} item={item} /></Grid.Col>
      ))}
    </Grid>
  );
}

export default Product;

