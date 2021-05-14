import Lottie from 'react-lottie';
import successData from './success-lottie.json';

const Success = () => {
  return (
    <Lottie
      options={{
        loop: false,
        autoplay: true,
        animationData: successData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={380}
      width={380}
    />
  );
};

export default Success;
