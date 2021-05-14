import { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { Calendar2Date, GeoAlt } from '@styled-icons/bootstrap/';
import { format } from 'date-fns';

import useUser, { IUserDetails } from '../../hooks/useUser';

import { retrieveFromLS } from '../../utils/localStorage';
import Container from '../../components/Container';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import Header from '../../components/Header';
import EditOrderModal from '../../components/EditOrderModal';

import { Body1, Body2, Heading1, Heading2 } from '../../styles/typography';
import colors from '../../styles/colors';
import retrieveIdToken from '../../utils/retrieveIdToken';
import { getOrderById } from '../../utils/apiCalls';
import { IOrder } from '../../utils/app-types';

const Main = styled.div`
  display: flex;
  margin: 0px 50px 0 50px;
  flex-direction: row;
`;

const TitleSection = styled.div`
  margin: 80px 50px 10px 54px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  ${Heading1};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  align-items: center;
  min-height: 200px;
  background-color: '#faf0e6';
  position: relative;
`;

const CustomerSection = styled.div`
  flex: 2;
  margin: 10px;
`;

const DetailsSection = styled.div`
  flex: 4;
  margin: 10px;
`;

const Text = styled.div<{ bold?: boolean }>`
  ${Body1}
  ${({ bold }) =>
    bold &&
    css`
      ${Heading2}
    `}
`;

const TagText = styled.h4`
  color: ${colors.primary};
  ${Body2};
  background-color: rgba(29, 144, 243, 0.3);
  border-radius: 6px;
  padding: 4px 10px;
`;

const IconTextSection = styled.div`
  display: flex;
  flex-direction: row;
  ${Body1};
  align-items: center;
  padding: 0 5px 0 5px;
  width: 40%;
  justify-content: space-evenly;
  margin: 4px 0;
`;

const OrderDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;

  const userDetails: IUserDetails = useMemo(
    () => user && retrieveFromLS(`oa-customer-${user.uid}`),
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
          const { data } = await getOrderById((id as unknown) as string, {
            authToken: idToken,
          });

          setOrder(data);
        } catch (error) {
          console.log('[error]');
          console.log(error);
        }
      }
    })();
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
        <Title>Order Details</Title>
      </TitleSection>
      <Main>
        {!order || (!order && <Spinner />)}
        {order && (
          <>
            <CustomerSection>
              <Card>
                <Avatar itemName={order.customer.name} size={5} />
                <Text bold>{order.customer.name}</Text>
                <Text>{order.customer.email}</Text>
                <Text>{order.customer.phone}</Text>
                <TagText>Customer</TagText>
              </Card>
            </CustomerSection>
            <DetailsSection>
              <Card>
                <Text bold>{order.title}</Text>
                <br />
                <IconTextSection>
                  <Calendar2Date color={colors.primary} size={50} />
                  <Text>
                    {format(new Date(Number(order.bookingDate)), 'dd.MM.yyyy')}
                  </Text>
                </IconTextSection>
                <IconTextSection>
                  <GeoAlt color={colors.primary} size={40} />
                  <div>
                    <Text bold>{order.address.street}</Text>
                    <Text>{order.address.city}</Text>
                    <Text>{order.address.country}</Text>
                  </div>
                </IconTextSection>

                <Button onClick={toggleModal} size={90}>
                  Edit
                </Button>
              </Card>
            </DetailsSection>
          </>
        )}
      </Main>

      {order && (
        <EditOrderModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          currentOrder={order}
        />
      )}
    </Container>
  );
};

export default OrderDetails;
