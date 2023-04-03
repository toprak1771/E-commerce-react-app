import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import moment from 'moment';

function Index({ item }) {
  console.log('item:', item);
  
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
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Link>
        <Button size="small">Add basket</Button>
      </Box>
    </div>
  );
}

export default Index;
