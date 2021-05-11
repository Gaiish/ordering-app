import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../config/firebase';

import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import Spinner from '../components/Spinner';
import { Body2, Title1 } from '../styles/typography';
import colors from '../styles/colors';
import { persistToLS, retrieveFromLS } from '../utils/localStorage';
interface FormValues {
  email: string;
  password: string;
}

const LoginTitle = styled.h1`
  ${Title1}
`;

const ErrorText = styled.p`
  color: ${colors.danger};
  opacity: 0.8;
  ${Body2};
`;

const formValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: Yup.string().min(8).required('Password is required'),
});

const Login = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const getUserDetails = useCallback(async (user: firebase.User) => {
    const firestore = firebase.firestore();
    const { uid } = user;
    try {
      const userDoc = await firestore.doc(uid).get();
      persistToLS(`oa-customer-${uid}`, userDoc.data());
    } catch (error) {}
  }, []);

  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    const { email, password } = values;
    setErrorMsg(null);

    const auth = firebase.auth();
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (!retrieveFromLS(`@oa-customer-${user.uid}`)) {
        await getUserDetails(user);
      }
      setSubmitting(false);
    } catch (error) {
      setErrorMsg('Email or password is wrong');
      setSubmitting(false);
    }
  }, []);

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
