import React from 'react';
import { Center, Title, TextInput, Flex, Stack } from '@mantine/core';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import validations from './ValidationsRegister';


function Register() {
  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      passwordConfirm:""
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
    validationSchema:validations
  })
  return (
    <>
      <div
        sx={{
          marginTop: '20px',
          width: 400,
        }}
      >
        <Title sx={{ textAlign: 'center', justifyContent: 'center' }} order={2}>
          Register
        </Title>
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
            withAsterisk
          />
          {formik.errors.email && formik.touched.email && (
            <div style={{color:"red"}}>{formik.errors.email}</div>
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
            <div style={{color:"red"}}>{formik.errors.password}</div>
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
           {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <div style={{color:"red"}}>{formik.errors.passwordConfirm}</div>
          )}
        </Stack>
        <Button type='submit' sx={{textAlign:"center",justifyContent:"center",marginTop:"10px"}} variant="contained" color="secondary">
        register
        </Button>
        </form>
        
      </div>
    </>
  );
}

export default Register;
