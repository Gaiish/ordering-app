import styled, { css } from 'styled-components';
import { Body1 } from '../../styles/typography';
import colors from '../../styles/colors';

interface ButtonProps {
  variant?: 'primary' | 'danger' | 'orange';
  size?: number;
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ variant }) =>
    variant ? colors[variant] : colors.gray};
  ${Body1};
  font-size: 16px;
  ${({ variant }) =>
    variant &&
    css`
      color: #fff;
    `};
  border: none;
  border-radius: 5px;
  padding: 0.8em;
  width: ${({ size }) => (size ? `${size}px` : `300px`)};
  margin: 0.5em;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.95;
  }
`;

export default Button;
