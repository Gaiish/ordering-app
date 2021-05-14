import { render } from '@testing-library/react';
import Avatar from './';

describe('Avatar component', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<Avatar itemName="John Doe" />);
    const initials = getByText('JD');
    expect(initials).toBeInTheDocument();
  });

  it('should render correctly when passed size prop', async () => {
    const { getByText } = render(<Avatar itemName="John Doe" size={20} />);
    const initials = getByText('JD');
    expect(initials).toBeInTheDocument();
  });
});
