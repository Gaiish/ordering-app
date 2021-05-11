import { render } from '@testing-library/react';
import Container from './';

describe('Container component', () => {
  it('should render correctly', () => {
    const { getByRole } = render(
      <Container>
        <h1>Container1</h1>
      </Container>,
    );

    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('should render correctly when passed centerContent prop', () => {
    const { getByRole } = render(
      <Container centerContent>
        <h1>Container2</h1>
      </Container>,
    );

    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
});
