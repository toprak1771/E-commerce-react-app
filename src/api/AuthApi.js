import React from 'react';
import axios from 'axios';

// const axiosInterceptor = axios.create({
//   baseURL: 'http://localhost:4000/',
// });

export const AuthRegister = async (input) => {
  const { data } = await axios.post(
    `http://localhost:4000/auth/register`,{
      email:input.email,
      password:input.password
    }
  );
  return data;
};

export const AuthLogin = async (input) => {
  const { data }  = await axios.post(`http://localhost:4000/auth/login`,input);
  return data;
}

// axiosInterceptor.interceptors.request.use(
//   function (config) {
//     const { origin } = new URL(config.url);
//     const allowedOrigins = ['http://localhost:4000/'];
//     const token = localStorage.getItem('access_token');
//     console.log('token:', token);
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = token;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const AuthMe = async (token) => {
  const { data } = await axios.get(`http://localhost:4000/auth/me`, {
    headers: {
      authorization: token,
    },
  });

  return data;
};

export const AuthLogout = async (refresh_token) => {
  const {data} = await axios.post(`http://localhost:4000/auth/logout`,refresh_token);
  return data;
}