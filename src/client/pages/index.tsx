import { useRouter } from 'next/router';
import Container from '../components/Container';
import Spinner from '../components/Spinner';
import useUser from '../hooks/useUser';

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.replace('/orders');
  }

  return (
    <Container centerContent>
      <Spinner />
    </Container>
  );
}
