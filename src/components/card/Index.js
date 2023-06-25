import React, { useCallback, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import moment from 'moment';
import { addItem, deleteItem } from '../../redux/basket/actions';
import { useSelector, useDispatch } from 'react-redux';

function Index({ key,item,login }) {
 
  const basketData = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();
  
 const filteredData = basketData.find((basket_item) => basket_item._id === item._id);
  
  const handleBasket = useCallback(() => {
    dispatch(addItem(item));
  }, [item]);

  const removeBasket = useCallback(() => {
    dispatch(deleteItem(item));
  }, [item]);

  return (
    <div>
      <Box>
        <Link to={`/products/${item._id}`}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              src={item.photos[0]}
              alt={item.title}
              loading="lazy"
              height="140"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {moment(item.createdAt).format('DD/MM/YYYY')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Link>
        {!filteredData && login === true ? (
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
      </Box>
    </div>
  );
}

export default Index;
