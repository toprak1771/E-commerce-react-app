import React from 'react';
import axios from 'axios';

export const AuthRegister = async (input) => {
    const {data} = await axios.post(`http://localhost:4000/auth/register`,input);
    return data;
}