import { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import firebase from '../config/firebase';

const Container = styled.div`
  display: flexbox;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  useEffect(() => {
    console.log('[firebase]');
    console.log(firebase);
  });
  return (
    <>
      <Head>
        <title>Ordering App</title>
        <meta name="description" content="Ordering app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Welcome to the Ordering App</h1>
      </Container>
    </>
  );
}
