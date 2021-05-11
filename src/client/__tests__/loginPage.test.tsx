import renderer from 'react-test-renderer';
import Login from '../pages/login';

describe('Login page', () => {
  it('renders correctly', () => {
    renderer.create(<Login />);
  });
});
