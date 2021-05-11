import Lottie from 'react-lottie';
import loaderData from './lottie-loader.json';

const Spinner = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loaderData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={80}
      width={80}
    />
  );
};

export default Spinner;
