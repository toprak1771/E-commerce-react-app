import React, { useMemo,useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_TR } from 'material-react-table/locales/tr';
import { ListItemIcon, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { deleteItem } from '../../redux/basket/actions';
import { Image } from '@mantine/core';

function Basket() {
  const basketData = useSelector((state) => state.basket.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('basketData:', basketData);

 
//   let tableData = null;
//   tableData = useMemo(()=>{
//    const result = basketData?.map((item) => {
//         const data3 = {
//          description:item.description,
//          price:item.price,
//          title:item.title,
//          photos:item.photos
//         };
//         return data3;
//       });
//       return result;
//  },[basketData]) 


  const dict = {
    description: 'Açıklama',
    photos: 'Fotoğraf',
    price: 'Ücret',
    title: 'Marka',
    _id:'Id',
    createdAt:'Sepete Atılma tarihi'
  };

  console.log('dict:', dict);


  const columns = React.useMemo(() => {
    if (basketData) {
      const result = Object.keys(basketData[0])?.map?.((el) => {
        const cell = {
          accessorKey: el,
          header: dict && dict[el] ? dict[el] : el,
          aggregationFn: 'max',
        };
         if (el === 'photos') {
           cell.Cell = ({ cell }) => {
             
             return (
                
                <Image mx="auto" radius="md" src={cell.getValue()[0]}></Image>
             );
           };
         }

        return cell;
      });

      return result;
    }
    return [];
  }, [basketData, dict]);

  
  return (
    <>
      {basketData && (
        <MaterialReactTable
          columns={columns}
          data={basketData}
          enableColumnFilterModes
          enableColumnOrdering
          enableGrouping
          enablePinning
          enableRowActions
          enableRowSelection
          initialState={{ showColumnFilters: true }}
          positionToolbarAlertBanner="bottom"
          renderRowActionMenuItems={({ closeMenu, row }) => {
            return (
              <MenuItem
                key={1}
                onClick={() => {
                  navigate(`/products/${row.original._id}`);
                  closeMenu();
                }}
                sx={{ m: 0 }}
              >
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                Ürün Detayı
              </MenuItem>
            );
          }}
          localization={MRT_Localization_TR}
          renderTopToolbarCustomActions={({ table }) => {
            const handleRemove = (row) => {
              if (row) {
                row.forEach((item) => {
                  dispatch(deleteItem(item.original));
                });
              }
            };
            if (table.getSelectedRowModel().rows.length > 0) {
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    color="error"
                    onClick={() => {
                      handleRemove(table.getSelectedRowModel().rows);
                    }}
                    variant="contained"
                  >
                    Sepetden kaldır
                  </Button>
                </div>
              );
            } else {
              return (
                <Button
                  color="error"
                  disabled
                  onClick={() => {
                    handleRemove(table.getSelectedRowModel().rows[0].original);
                  }}
                  variant="contained"
                >
                  Sepetden kaldır
                </Button>
              );
            }
          }}
        ></MaterialReactTable>
      )}
    </>
  );
}

export default Basket;
