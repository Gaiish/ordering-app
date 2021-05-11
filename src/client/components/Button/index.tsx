import styled from 'styled-components';
import { Body1 } from '../../styles/typography';
import colors from '../../styles/colors';

const Button = styled.button<{ variant: string }>`
  background-color: ${({ variant }) => colors[variant]};
  ${Body1};
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.8em;
  width: 300px;
  margin: 0.5em;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.95;
  }
`;

export default Button;
