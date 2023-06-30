import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import { MRT_Localization_TR } from 'material-react-table/locales/tr';
import { Image } from '@mantine/core';
import { ListItemIcon, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Items() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useMemo(() => {
    return location.state && location.state.items;
  }, [location]);

  console.log('items:', items);
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

  const columns = useMemo(() => {
    if (items && items.length > 0) {
      const result = Object.keys(items[0])?.map?.((el) => {
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
  }, [items, dict]);

  return (
    <>
      {items && (
        <MaterialReactTable
          columns={columns}
          data={items}
          enableColumnFilterModes
          enableColumnOrdering
          enableGrouping
          enablePinning
          enableRowActions
          enableRowSelection
          initialState={{ showColumnFilters: true }}
          positionToolbarAlertBanner="bottom"
          localization={MRT_Localization_TR}
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
        />
      )}
    </>
  );
}

export default Items;
