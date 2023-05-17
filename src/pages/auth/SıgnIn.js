import React, { useState, useEffect } from 'react';
import { Title, TextInput, Flex, Stack } from '@mantine/core';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import validations from './ValidationsSignIn';
import { AuthLogin, AuthMe } from '../../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setInLogin, setUserData } from '../../redux/user/actions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function SıgnIn() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, bag) => {
      console.log(values);
      try {
        const loginData = await AuthLogin({
          email: values.email,
          password: values.password,
        });
        console.log("loginData:",loginData);
        localStorage.setItem('access_token', loginData.accessToken);
        localStorage.setItem('refresh_token', loginData.refreshToken);
        dispatch(setInLogin(true));
        dispatch(setUserData(loginData));
        setOpen(true);
        formik.resetForm();
        navigate('/products');
      } catch (e) {
        console.log(e.response.data.message);
        setErrorMessage(e.response.data.message);
        setLoginError(true);
        formik.resetForm();
      }
    },
    validationSchema: validations,
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setLoginError(false);
  };

  return (
    <>
      <Title
        mt="sm"
        sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}
        order={2}
      >
        Sign In
      </Title>

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack sx={{ textAlign: 'center', justifyContent: 'center' }}>
            <TextInput
              sx={{ textAlign: 'center', justifyContent: 'center' }}
              placeholder="Email"
              label="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onInvalid={formik.touched.email && formik.errors.email}
              withAsterisk
            />
            {formik.errors.email && formik.touched.email && (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            )}
            <TextInput
              sx={{ textAlign: 'center', justifyContent: 'center' }}
              placeholder="Password"
              type="password"
              label="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              withAsterisk
            />
            {formik.errors.password && formik.touched.password && (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            )}
          </Stack>

          <Button
            type="submit"
            sx={{
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '15px',
            }}
            variant="contained"
            color="secondary"
          >
            Sign In
          </Button>
        </form>
      </div>
      <Snackbar open={loginError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Giriş işlemi başarılı :D
        </Alert>
      </Snackbar>
    </>
  );
}

export default SıgnIn;
