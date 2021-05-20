import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import useUser from 'hooks/useUser';
import useSidebarToggle from 'hooks/useSidebarToggle';
import Header from 'components/Header';
import Container, { PageContent } from 'components/Container';
import TableList, { TabHead, TabRow } from 'components/TableList';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import OrderModal from 'components/OrderModal';
import SideBar from 'components/SideBar';
import { getOrders } from 'utils/apiCalls';
import { IOrder } from 'utils/app-types';
import { retrieveFromLS } from 'utils/localStorage';
import retrieveIdToken from 'utils/retrieveIdToken';

import { Heading1 } from 'styles/typography';

type OrderList = Array<{
  orderId: string;
  data: string[];
}>;

const Main = styled.div`
  display: flex;
  margin: 0 3rem 0 3rem;
  @media screen and (max-width: 767px) {
    margin: 0 1.2rem 0 1.2rem;
  }
`;

const TitleSection = styled.div`
  margin: 80px 1.2rem 10px 54px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    margin: 80px 0.5rem 10px 1.2rem;
  }
`;

const Title = styled.h1`
  ${Heading1};
`;

const PaginationBtns = styled.div`
  display: flex;
  flex-direction: row;
  float: right;
  margin-right: 1rem;
  margin-bottom: 10px;
  @media screen and (max-width: 767px) {
    margin-right: 0.6rem;
  }
`;

const Orders = () => {
  const [orders, setOrders] = useState<OrderList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const { user } = useUser();
  const [isSidebarVisible, toggleSideBar] = useSidebarToggle();

  const userDetails = useMemo(
    () => user && retrieveFromLS(`oa-user-${user.uid}`),
    [],
  );

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const idToken = await retrieveIdToken(user);
          const { data } = await getOrders({ authToken: idToken });
          setNextCursor(data[data.length - 1].uid);
          setOrders(formatOrdersList(data));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    })();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const loadOrders = useCallback(
    async ({ prev, next }: { prev?: string; next?: string }) => {
      if (user) {
        try {
          const idToken = await retrieveIdToken(user);
          const { data } = await getOrders({
            authToken: idToken,
            params: { after: next, before: prev },
          });
          setNextCursor(data[data.length - 1].uid);
          setPrevCursor(data[0].uid);
          setPageCount(prev ? pageCount - 1 : pageCount + 1);
          setOrders(formatOrdersList(data));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    },
    [pageCount],
  );

  const goNextPage = useCallback(async () => {
    setIsLoading(true);
    if (nextCursor && orders) {
      loadOrders({ next: nextCursor });
    }
  }, [nextCursor, orders]);

  const goPrevPage = useCallback(async () => {
    setIsLoading(true);
    if (prevCursor && orders) {
      loadOrders({ prev: prevCursor });
    }
  }, [prevCursor, orders]);

  const formatOrdersList = useCallback((listOfOrders: IOrder[]): OrderList => {
    let list: OrderList = [];

    if (listOfOrders && listOfOrders.length > 0) {
      for (let i in listOfOrders) {
        const { bookingDate } = listOfOrders[i];
        const formattedDate =
          typeof bookingDate === 'number'
            ? format(new Date(listOfOrders[i].bookingDate), 'dd.MM.yyyy')
            : format(new Date(), 'dd.MM.yyyy');
        list = [
          ...list,
          {
            orderId: listOfOrders[i].uid,
            data: [
              listOfOrders[i].customer.name,
              listOfOrders[i].address.street,
              listOfOrders[i].title,
              formattedDate,
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
      <Header
        username={userDetails ? userDetails.name : ''}
        toggleSidebar={toggleSideBar}
      />
      <SideBar isVisible={isSidebarVisible} />
      <PageContent>
        <TitleSection>
          <Title>Orders</Title>
          <Button variant="primary" size={150} onClick={toggleModal}>
            Add new order
          </Button>
        </TitleSection>
        <Main>
          {isLoading && <Spinner />}
          {!isLoading && orders && (
            <TableList>
              <TabHead
                headings={[
                  'Customer',
                  'Address',
                  'Order title',
                  'Booking Date',
                ]}
              />
              {orders.map(({ data, orderId }, _) => (
                <TabRow
                  items={data}
                  orderId={orderId}
                  key={JSON.stringify(_)}
                />
              ))}
            </TableList>
          )}
        </Main>

        {!isLoading && (
          <PaginationBtns>
            <Button size={100} onClick={goPrevPage} disabled={pageCount === 0}>
              Prev
            </Button>
            <Button size={100} onClick={goNextPage}>
              Next
            </Button>
          </PaginationBtns>
        )}

        <OrderModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      </PageContent>
    </Container>
  );
};

export default Orders;
