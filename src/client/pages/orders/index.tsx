import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import useUser from '../../hooks/useUser';
import Header from '../../components/Header';
import Container from '../../components/Container';
import { getOrders } from '../../utils/apiCalls';
import { IOrder } from '../../utils/app-types';

import TableList, { TabHead, TabRow } from '../../components/TableList';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import OrderModal from '../../components/OrderModal';

import { Heading1 } from '../../styles/typography';
import { retrieveFromLS } from '../../utils/localStorage';
import retrieveIdToken from '../../utils/retrieveIdToken';

type OrderList = Array<{
  orderId: string;
  data: string[];
}>;

const Main = styled.div`
  display: flex;
  margin: 0 50px 0 50px;
`;

const TitleSection = styled.div`
  margin: 80px 50px 10px 54px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  ${Heading1};
`;

const Orders = () => {
  const [orders, setOrders] = useState<OrderList>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  const userDetails = useMemo(
    () => user && retrieveFromLS(`oa-user-${user.uid}`),
    [],
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const idToken = await retrieveIdToken(user);
          const { data } = await getOrders({ authToken: idToken });
          setOrders(formatOrdersList(data));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    })();
  }, []);

  const formatOrdersList = useCallback((listOfOrders: IOrder[]): OrderList => {
    let list: OrderList = [];

    if (listOfOrders && listOfOrders.length > 0) {
      for (let i in listOfOrders) {
        list = [
          ...list,
          {
            orderId: listOfOrders[i].uid,
            data: [
              listOfOrders[i].customer.name,
              listOfOrders[i].address.city,
              listOfOrders[i].title,
              JSON.stringify(listOfOrders[i].bookingDate),
            ],
          },
        ];
      }
    }
    return list;
  }, []);

  if (!user) {
    return (
      <Container centerContent>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <Header username={userDetails ? userDetails.name : ''} />
      <TitleSection>
        <Title>Orders</Title>
        <Button variant="primary" size={150} onClick={toggleModal}>
          Add new order
        </Button>
      </TitleSection>
      <Main>
        <TableList>
          <TabHead
            headings={['Customer', 'Address', 'Order title', 'Booking Date']}
          />
          <TabRow
            items={['Customer A', 'Address', 'Order title', 'Booking Date']}
            orderId={'1'}
          />
          <TabRow
            items={['Customer B', 'Address', 'Order title', 'Booking Date']}
            orderId={'2'}
          />
          <div>
            {isLoading && <Spinner />}
            {!isLoading &&
              orders &&
              orders.map(({ data, orderId }, _) => (
                <TabRow
                  items={data}
                  orderId={orderId}
                  key={JSON.stringify(_)}
                />
              ))}
          </div>
        </TableList>
      </Main>

      <OrderModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </Container>
  );
};

export default Orders;
