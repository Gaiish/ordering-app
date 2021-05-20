import Lottie from 'react-lottie';
import { useRouter } from 'next/router';
import Button from 'components/Button';
import Container from 'components/Container';
import pageNotFoundLottieData from './lottie-404.json';

const PageNotFound = () => {
  const router = useRouter();
  return (
    <Container centerContent>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: pageNotFoundLottieData,
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

export default PageNotFound;
