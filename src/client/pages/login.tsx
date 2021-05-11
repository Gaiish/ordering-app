import { useCallback } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../config/firebase';

import Button from '../components/Button';
import Container from '../components/Container';
import Input from '../components/Input';
import { Title1 } from '../styles/typography';

interface FormValues {
  email: string;
  password: string;
}

const LoginTitle = styled.h1`
  ${Title1}
`;

const formValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(8).required('Password is required'),
});

const Login = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    const { email, password } = values;
    console.log(email, password);

    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('[logged in]');
      })
      .catch((err) => {
        console.log('[login failed]');
        console.log(err);
      });
    setSubmitting(false);
  };

  return (
    <Container centerContent>
      <LoginTitle>Log in</LoginTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={onSubmit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div>{errors.email && touched.email && errors.email}</div>
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div>{errors.password && touched.password && errors.password}</div>
            <Button variant="primary" disabled={isSubmitting} type="submit">
              Log in
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
