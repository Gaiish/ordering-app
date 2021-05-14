import { render } from '@testing-library/react';
import Header from './';

describe('Header component', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<Header username="John Doe" />);
    const username = getByText('John Doe');
    expect(username).toBeInTheDocument();
  });
});
