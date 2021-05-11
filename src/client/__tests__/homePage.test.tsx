import renderer from 'react-test-renderer';
import Index from '../pages/index';

describe('Home page', () => {
  it('renders correctly', () => {
    renderer.create(<Index />);
  });
});
