import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_TR } from 'material-react-table/locales/tr';
import {
  ListItemIcon,
  MenuItem,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { deleteItem, emptyItem } from '../../redux/basket/actions';
import { Image } from '@mantine/core';
import { OrderApi } from '../../api/OrderApi';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Basket() {
  const basketData = useSelector((state) => state.basket.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [adress, setAdress] = useState('');
  const token = localStorage.getItem('access_token');
  const handleClose = () => setOpenModal(false);
  useEffect(() => {
    setAdress('');
  }, []);

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

  const dict = useMemo(() => {
    return {
      description: 'Açıklama',
      photos: 'Fotoğraf',
      price: 'Ücret',
      title: 'Marka',
      _id: 'Id',
      createdAt: 'Sepete Atılma tarihi',
    };
  }, []);

  const handleSubmit = async () => {
    setOpenModal(false);
    const itemIds = basketData.map((item) => item._id);

    const input = {
      address: adress,
      items: JSON.stringify(itemIds),
    };
    const response = await OrderApi(input);
    console.log('response:', response);
    localStorage.setItem('basket',[]);
    dispatch(emptyItem());
  };

  const columns = React.useMemo(() => {
    if (basketData && basketData.length > 0) {
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
            if (
              basketData.length > 0 &&
              table.getSelectedRowModel().rows.length === 0
            ) {
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                  >
                    Sipariş Ver
                  </Button>
                </div>
              );
            }
            if (
              table.getSelectedRowModel().rows.length > 0 &&
              basketData.length > 0
            ) {
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                  >
                    Sipariş Ver
                  </Button>
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
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Şipariş verme işlemleri
          </Typography>
          <TextField
            sx={{
              marginTop: '15px',
              marginBottom: '15px',
            }}
            size="small"
            fullWidth
            required
            label="Adres"
            id="adress"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <Button color="error" onClick={handleClose}>
              Vazgeç
            </Button>
            <Button color="success" onClick={handleSubmit}>
              Sipariş Ver
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Basket;
