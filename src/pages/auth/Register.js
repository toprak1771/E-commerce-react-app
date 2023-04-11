import { React, useState, useEffect } from 'react';
import { Title, TextInput, Flex, Stack } from '@mantine/core';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import validations from './ValidationsRegister';
import { AuthRegister } from '../../api/AuthApi';

import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setInLogin, setUserData } from '../../redux/user/actions';
import Alert from '@mui/material/Alert';

function Register() {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.user.login);
  const user = useSelector((state) => state.user.data);
  // console.log('loginData:', loginData);
  //console.log('user:', user);
  const [loginError, setLoginError] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async (values, bag) => {
      console.log(values);
      try {
        const responseData = await AuthRegister({
          email: values.email,
          password: values.password,
        });
        console.log('data:', responseData);
        dispatch(setInLogin(true));
        dispatch(setUserData(responseData));
        formik.resetForm();
      } catch (e) {
        console.log(e.response.data.message);
        setLoginError(e.response.data.message);
        formik.resetForm();
      }
    },
    validationSchema: validations,
  });

  return (
    <>
      <Title
        mt="sm"
        sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}
        order={2}
      >
        Register
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
            <TextInput
              sx={{ textAlign: 'center', justifyContent: 'center' }}
              placeholder="Pasword Confirm"
              label="Password Confirm"
              name="passwordConfirm"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
              onBlur={formik.handleBlur}
              withAsterisk
            />
            {formik.errors.passwordConfirm &&
              formik.touched.passwordConfirm && (
                <div style={{ color: 'red' }}>
                  {formik.errors.passwordConfirm}
                </div>
              )}
          </Stack>
          <Box sx={{ marginTop: '15px', marginBottom: '15px' }}>
            {loginError != null ? (
              <Alert severity="error">{loginError}</Alert>
            ) : (
              ''
            )}
          </Box>
          <Button
            type="submit"
            sx={{
              textAlign: 'center',
              justifyContent: 'center'
            }}
            variant="contained"
            color="secondary"
          >
            register
          </Button>
        </form>
      </div>
    </>
  );
}

export default Register;
