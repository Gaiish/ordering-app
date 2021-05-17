import Lottie from 'react-lottie';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Container from '../../components/Container';
import serverErrorLottieData from './lottie-500.json';

const ServerErrorPage = () => {
  const router = useRouter();
  return (
    <Container centerContent>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: serverErrorLottieData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={380}
        width={380}
      />
      <Button variant="primary" onClick={() => router.replace('/orders')}>
        Go to Orders Page
      </Button>
    </Container>
  );
};

export default ServerErrorPage;
