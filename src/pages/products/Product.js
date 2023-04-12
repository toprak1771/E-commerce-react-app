import React from 'react';
import Index from '../../components/card/Index';
import { Grid, Button } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductApi } from '../../api/ProductApi';

function Product() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  console.log('page:', page);
  const { isLoading, error, data } = useQuery(['products', page], () => {
    return ProductApi(page);
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error:' + error.message;

  console.log('data:', data);
  console.log('current:', data.current);
  const pageArray = [];
  for (let i = 1; i <= data.totalPages; i++) {
    pageArray.push(i);
  }

  console.log('array:', pageArray);
  pageArray.map((item) => {
    console.log(item);
  });
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
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-center">
          {pageArray.map((index) => (
            <Button variant="default">
              <a
                className="underline-offset-0 opacity-100"
                href={`/products?page=${index}`}
              >
                {index}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
