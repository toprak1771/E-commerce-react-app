import React from 'react';
import { Notification } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

function Error404() {
  return (
    <div className='mt-2 ms-3 me-3'>
      <Notification icon={<IconX size="1.1rem" />} color="red">
        Böyle bir sayfa bulunamadı!
      </Notification>
    </div>
  );
}

export default Error404;
