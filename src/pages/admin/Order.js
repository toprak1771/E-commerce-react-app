import React, { useMemo } from 'react';
import { OrderList } from '../../api/OrderApi';
import { useQuery } from '@tanstack/react-query';
import { Table } from '@mantine/core';

function Order() {
  const { isLoading, isError, data, error } = useQuery(['orders'], () => {
    return OrderList();
  });

  console.log('data:', data);
  const columns = useMemo(() => {
    if (data) {
      const result = Object.keys(data?.[0]).filter(
        (column) =>
          column === 'user' || column === 'adress' || column === 'items'
      );
      return result;
    }
  }, [data]);
  console.log(columns);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>{error}</>;
  }

  return (
    <>
      <Table>
        <thead>
          <tr>{columns && columns.map((item) => <th>{item}</th>)}</tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.items.length}</td>
                    <td>{item.user.email}</td>
                    <td>{item.adress}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

export default Order;
