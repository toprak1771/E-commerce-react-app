import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductGetDetail } from '../../api/ProductApi';
import { Title, Text, Image } from '@mantine/core';
import moment from 'moment';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { addItem, deleteItem } from '../../redux/basket/actions';
import { useSelector, useDispatch } from 'react-redux';

function ProductDetail() {
  const { product_id } = useParams();
  const basketData = useSelector((state) => state.basket.items);
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  ;
  const { isLoading, error, data } = useQuery(['product', product_id], () => {
    return ProductGetDetail(product_id);
  });

  //Sepete ekleme ve çıkarmanın uzun yolu
  // useEffect(() => {
  //   if (basketData.length !== 0) {
  //     basketData?.forEach((element) => {
  //       if (element._id === data?._id) {
  //         setCount(count + 1);
  //       }
  //     });
  //   } else {
  //     setCount(0);
  //   }
  // }, [basketData]);

  
  const filteredData = basketData?.find((basket_item) => basket_item._id === data?._id)
  
  
  const handleBasket = useCallback(() => {
    dispatch(addItem(data));
  }, [data]);

  const removeBasket = useCallback(() => {
    dispatch(deleteItem(data));
  }, [data]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error:' + error.message;

  //const date = format(data.createdAt,'dd/MM/yyyy');
  // console.log('Detay sayfası:', data);

  return (
    <Box sx={{ margin: '1.5rem' }}>
      <Image
        width={750}
        height={500}
        mx="auto"
        radius="md"
        src={data.photos[0]}
        alt={data.title}
      />
      <Title order={3}>{data.title}</Title>
      <Text fs="italic">{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <Text tt="capitalize">{data.description}</Text>
      <Text c="blue">{data.price} TL</Text>
      <Stack spacing={2} mt={2}>
        {!filteredData && login===true ? (
          <>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={handleBasket}
            >
              Add basket
            </Button>
            <Button
              disabled
              variant="outlined"
              color="error"
              size="small"
              onClick={removeBasket}
            >
              Remove basket
            </Button>
          </>
        ) : login === true ? (
          <>
            <Button
              disabled
              variant="outlined"
              color="success"
              size="small"
              onClick={handleBasket}
            >
              Add basket
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={removeBasket}
            >
              Remove basket
            </Button>
          </>
        ) : ""}
      </Stack>
    </Box>
  );
}

export default ProductDetail;
