import { render } from '@testing-library/react';
import Input from '.';

describe('Input component', () => {
  it('should render correctly', async () => {
    const { getByRole } = render(<Input />);
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should render correctly when passed label prop', () => {
    const { getByText } = render(<Input label="Email" />);
    const labelText = getByText('Email');
    expect(labelText).toBeInTheDocument();
  });
});
