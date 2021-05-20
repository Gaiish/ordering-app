import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Lottie from 'react-lottie';

import firebase from 'config/firebase';
import loginAnim from './lottie-login.json';

import Container from 'components/Container';
import Button from 'components/Button';
import Input from 'components/Input';
import Spinner from 'components/Spinner';
import ErrorText from 'components/ErrorText';
import { Title1 } from 'styles/typography';

interface FormValues {
  email: string;
  password: string;
}

const LoginTitle = styled.h1`
  ${Title1}
`;

const formValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: Yup.string().min(8).required('Password is required'),
});

const Login = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const initialValues: FormValues = {
    email: '',
    password: '',
  };
  const router = useRouter();

  const onSubmit = useCallback(
    async (values: FormValues, { setSubmitting }) => {
      const { email, password } = values;
      setErrorMsg(null);

      const auth = firebase.auth();
      try {
        await auth.signInWithEmailAndPassword(email, password);
        router.replace('/orders');
        setSubmitting(false);
      } catch (error) {
        setErrorMsg('Email or password is wrong');
        setSubmitting(false);
      }
    },
    [],
  );

  useEffect(() => {
    router.prefetch('/orders');
  }, []);

  return (
    <Container centerContent>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loginAnim,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={180}
        width={180}
      />
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
            <ErrorText>
              {errors.email && touched.email && errors.email}
            </ErrorText>
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <ErrorText>
              {errors.password && touched.password && errors.password}
            </ErrorText>
            <ErrorText>{errorMsg}</ErrorText>
            {isSubmitting && <Spinner />}
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
