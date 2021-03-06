import { useState, useCallback } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import DatePicker from 'react-datepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';

import useUser from 'hooks/useUser';
import { IAddress, ICustomer, INewOrder } from 'utils/app-types';
import { retrieveFromLS } from 'utils/localStorage';
import { createOrder } from 'utils/apiCalls';
import retrieveIdToken from 'utils/retrieveIdToken';
import { Heading1 } from 'styles/typography';
import Button from '../Button';
import Input from '../Input';
import ErrorText from '../ErrorText';
import Spinner from '../Spinner';
import Success from '../Success';

interface OrderModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

interface FormValues {
  title: string;
  country: string;
  city: string;
  street: string;
  zip: string;
}

const Container = Modal.styled`
    width: 38rem;
    height: 40rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    overflow: auto;
`;

const ModalTitle = styled.div`
  ${Heading1};
  margin-bottom: 10px;
  margin-top: 25px; ;
`;

const ButtonGroup = styled.div`
  margin-top: 16px;
`;

const formValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  street: Yup.string().required('Street is required'),
  zip: Yup.string().max(5, 'Max 5 digits'),
});

const OrderModal = ({ isModalOpen, toggleModal }: OrderModalProps) => {
  const [date, setDate] = useState(new Date());
  const [orderCreationSuccess, setOrderCreationSuccess] = useState(false);
  const [newOrderId, setNewOrderId] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const initialValues: FormValues = {
    title: '',
    country: '',
    city: '',
    street: '',
    zip: '',
  };

  const onSubmit = useCallback(
    async (values: FormValues, { setIsSubmitting }) => {
      const { title, country, city, street, zip } = values;
      const bookingDate: number = date.getTime();
      const address: IAddress = {
        country,
        city,
        street,
        zip,
      };
      if (user) {
        const { name, email, phone } = retrieveFromLS(`oa-user-${user.uid}`);
        const customer: ICustomer = { name, email, phone };
        const newOrder: INewOrder = {
          address,
          bookingDate,
          customer,
          title,
        };

        try {
          const authToken = await retrieveIdToken(user);
          const res = await createOrder(newOrder, { authToken });
          if (res.status === 201) {
            setOrderCreationSuccess(true);
            setNewOrderId(res.data.orderId);
          }
          setIsSubmitting(false);
        } catch (error) {
          setIsSubmitting(false);
          console.log(error);
        }
      }
    },
    [],
  );

  const viewCreatedOrder = useCallback(() => {
    if (newOrderId) {
      router.push(`/orders/${newOrderId}`);
    }
  }, [newOrderId]);

  return (
    <Container
      isOpen={isModalOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}>
      {!orderCreationSuccess && (
        <>
          <ModalTitle>New Order</ModalTitle>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={formValidationSchema}>
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
                  label="Title"
                  placeholder="Order title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <ErrorText>
                  {errors.title && touched.title && errors.title}
                </ErrorText>
                <Input
                  label="Country"
                  placeholder="Country"
                  name="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                />
                <ErrorText>
                  {errors.country && touched.country && errors.country}
                </ErrorText>
                <Input
                  label="City"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
                <ErrorText>
                  {errors.city && touched.city && errors.city}
                </ErrorText>
                <Input
                  label="Street"
                  placeholder="Street"
                  name="street"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.street}
                />
                <ErrorText>
                  {errors.street && touched.street && errors.street}
                </ErrorText>
                <Input
                  label="Zip"
                  placeholder="Zip"
                  name="zip"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zip}
                />
                <ErrorText>{errors.zip && touched.zip && errors.zip}</ErrorText>

                <DatePicker
                  selected={date}
                  onChange={(d) => setDate((d as unknown) as Date)}
                  customInput={<Input label="Booking Date" />}
                />

                {isSubmitting && <Spinner />}

                <ButtonGroup>
                  <Button onClick={toggleModal} size={100}>
                    Cancel
                  </Button>
                  <Button variant="primary" size={100} type="submit">
                    Confirm
                  </Button>
                </ButtonGroup>
              </form>
            )}
          </Formik>
        </>
      )}

      {orderCreationSuccess && (
        <>
          <Success />
          <Button onClick={viewCreatedOrder} variant="orange">
            View order
          </Button>
        </>
      )}
    </Container>
  );
};

export default OrderModal;
