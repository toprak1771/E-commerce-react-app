import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
 const userData = useSelector((state) => state.user.data);   
  return (
    <div className='flex flex-col justify-center'>
        <h2 className='flex justify-center mt-2'>Profile</h2>
        <div className='flex justify-center'>
        {JSON.stringify(userData.user)}
        </div>
        
    </div>
  )
}

export default Profile