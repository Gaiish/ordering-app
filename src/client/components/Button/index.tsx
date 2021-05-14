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
  padding: 0.4em 0.8em;
  width: ${({ size }) => (size ? `${size}px` : `300px`)};
  margin: 0.5em;
  outline: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  &:hover {
    opacity: 0.95;
    box-shadow: none;
  }
`;

export default Button;
