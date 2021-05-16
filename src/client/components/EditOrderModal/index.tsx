import { ChangeEvent, useCallback, useState } from 'react';
import Modal from 'styled-react-modal';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';

import Input from '../Input';
import Button from '../Button';
import { IOrder } from '../../utils/app-types';
import retrieveIdToken from '../../utils/retrieveIdToken';
import useUser from '../../hooks/useUser';
import { updateOrder } from '../../utils/apiCalls';
import Success from '../Success';
import Spinner from '../Spinner';
import { route } from 'next/dist/next-server/server/router';

interface EditModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  currentOrder: IOrder;
}

const Container = Modal.styled`
    width: 30rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`;

const EditOrderModal = ({
  isModalOpen,
  toggleModal,
  currentOrder,
}: EditModalProps) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState(currentOrder.title);
  const [loading, setIsLoading] = useState(false);
  const [orderUpdateSuccess, setOrderUpdateSuccess] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const save = async () => {
    setIsLoading(true);
    const bookingDate: number = date.getTime();
    if (user) {
      if (title.length > 0 || currentOrder.bookingDate !== bookingDate) {
        const { uid } = currentOrder;
        try {
          const idToken = await retrieveIdToken(user);
          const res = await updateOrder({ title, bookingDate }, uid, {
            authToken: idToken,
          });
          if (res.status === 200) {
            setIsLoading(false);
            setOrderUpdateSuccess(true);
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    }
  };

  const viewUpdatedOrder = useCallback(() => {
    router.reload();
  }, []);

  return (
    <Container
      isOpen={isModalOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}>
      {!orderUpdateSuccess && (
        <>
          <h1>Update Order</h1>
          <Input
            autoFocus
            label="Order title"
            placeholder="Order title"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
          />
          <DatePicker
            selected={date}
            onChange={(d) => setDate((d as unknown) as Date)}
            customInput={<Input label="Booking Date" />}
          />
          {loading && <Spinner />}
          <Button variant="primary" onClick={save}>
            Confirm
          </Button>
        </>
      )}

      {orderUpdateSuccess && (
        <>
          <Success />
          <Button onClick={viewUpdatedOrder} variant="orange">
            View order
          </Button>
        </>
      )}
    </Container>
  );
};

export default EditOrderModal;
