import { render } from '@testing-library/react';
import Button from './';

describe('Button component', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<Button variant="primary">Hello</Button>);
    const buttonText = await getByText('Hello');
    expect(buttonText).toBeInTheDocument();
  });
});
