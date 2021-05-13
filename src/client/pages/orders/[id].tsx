import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';

import Container from '../../components/Container';
import Spinner from '../../components/Spinner';

const OrderDetails = () => {
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;

  if (!user) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return <div>Order {id}</div>;
};

export default OrderDetails;
