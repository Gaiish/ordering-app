import { getByRole, render } from '@testing-library/react';
import Button from './';

describe('Button component', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<Button>Hello</Button>);
    const buttonText = getByText('Hello');
    expect(buttonText).toBeInTheDocument();
  });

  it('should render correctly when passed variant prop', async () => {
    const { getByText } = render(<Button variant="primary">Hello</Button>);
    const buttonText = getByText('Hello');
    expect(buttonText).toBeInTheDocument();
  });

  it('should render correctly when passed size prop', async () => {
    const { getByText } = render(<Button size={10}>Hello</Button>);
    const buttonText = getByText('Hello');
    expect(buttonText).toBeInTheDocument();
  });
});
