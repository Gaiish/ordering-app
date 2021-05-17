import { render } from '@testing-library/react';
import SideBar from './';

describe('SideBar component', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<SideBar />);
    const itemText = getByText('orders');
    expect(itemText).toBeInTheDocument();
  });
});
