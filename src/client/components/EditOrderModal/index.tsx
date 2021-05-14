import { useState } from 'react';
import Modal from 'styled-react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Input from '../Input';
import Button from '../Button';

interface EditModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
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

const EditOrderModal = ({ isModalOpen, toggleModal }: EditModalProps) => {
  const [date, setDate] = useState(new Date());

  return (
    <Container
      isOpen={isModalOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}>
      <h1>Update Order</h1>
      <Input label="Order title" placeholder="Order title" />
      <DatePicker
        selected={date}
        onChange={(d) => setDate((d as unknown) as Date)}
        customInput={<Input label="Booking Date" />}
      />
      <Button variant="primary" onClick={toggleModal}>
        Confirm
      </Button>
    </Container>
  );
};

export default EditOrderModal;
