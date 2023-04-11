import React from 'react';
import Index from '../../components/card/Index';
import { Grid } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductApi } from '../../api/ProductApi';

function Product() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  console.log(page);
  const { isLoading, error, data } = useQuery(['products', page], () => {
    return ProductApi(page);
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error:' + error.message;

  console.log(data);

  const pageFunc = () => {
   if(data.totalPages > 0){
    console.log("total:",data.totalPages);
    for(let i=1;i<=data.totalPages;i++){
      return (<button>1</button>)
    }
   }
  };
  return (
    <>
      <Grid
      justify="space-between"
      sx={{ paddingLeft: '15px', paddingTop: '15px', margin: '0' }}
    >
      {data.products.map((item, key) => (
        <Grid.Col span={4}>
          <Index key={key} item={item} />
        </Grid.Col>
      ))}    
    </Grid>
      <div className='d-flex justify-content-center'>
      <div className="d-flex justify-content-center">
        <button><a href='/products?page=1'>1</a></button>
        <button><a href='/products?page=2'>2</a></button>
      </div>
      </div>
    </>
  
  );
}

export default Product;
