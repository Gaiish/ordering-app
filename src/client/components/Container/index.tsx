import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Head from 'next/head';

interface ContainerComponentProps {
  children: ReactNode;
  centerContent?: boolean;
}

const Container = styled.div<{ centerContent?: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  ${({ centerContent }) =>
    centerContent &&
    css`
      justify-content: center;
      align-items: center;
    `};
`;

export const PageContent = styled.div`
  margin-left: 240px;
  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
`;

const ContainerComponent = ({
  children,
  centerContent,
}: ContainerComponentProps) => (
  <div>
    <Head>
      <title>Ordering App</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Ordering app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container centerContent={centerContent}>{children}</Container>
  </div>
);

export default ContainerComponent;
