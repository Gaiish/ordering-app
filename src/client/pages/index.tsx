import styled from 'styled-components';

// import firebase from '../config/firebase';

const Container = styled.div`
  display: flexbox;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <Container>
      <h1>Welcome to the Ordering App</h1>
    </Container>
  );
}
