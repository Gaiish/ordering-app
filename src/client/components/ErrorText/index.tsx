import styled from 'styled-components';
import colors from 'styles/colors';
import { Body2 } from 'styles/typography';

const ErrorText = styled.p`
  color: ${colors.danger};
  opacity: 0.8;
  ${Body2};
`;

export default ErrorText;
