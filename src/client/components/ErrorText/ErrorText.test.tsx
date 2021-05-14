import { render } from '@testing-library/react';
import ErrorText from './';

describe('ErrorText component', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<ErrorText>Error 1</ErrorText>);
    const errorText = getByText('Error 1');
    expect(errorText).toBeInTheDocument();
  });
});
