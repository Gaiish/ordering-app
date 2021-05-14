import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Body1, Body2 } from '../../styles/typography';
import colors from '../../styles/colors';

type InputProps = InputHTMLAttributes<{}> & {
  label?: string;
  length?: number;
};

const Input = styled.input`
  border: none;
  outline: none;
  background-color: rgb(249, 250, 252);
  ${Body1};
  width: 100%;
`;

const InputContainer = styled.div<{ length?: number }>`
  border-width: 2px;
  border-style: solid;
  border-radius: 6px;
  border-color: rgb(242, 244, 247);
  background-color: rgb(249, 250, 252);
  margin: 0.5em 0 0.5em 0;
  padding: 0.2em 0.7em 0.2em 0.7em;
  width: ${({ length }) => (length ? `${length}px` : `300px`)};
  &:focus-within {
    border-color: ${colors.primary};
  }
`;

const Label = styled.span`
  ${Body2};
  color: rgb(200, 203, 208);
`;

const InputComponent = (
  { label, length, placeholder, type, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => (
  <InputContainer length={length}>
    {label && <Label>{label}</Label>}
    <Input
      placeholder={placeholder}
      type={type || 'text'}
      {...rest}
      ref={ref}
    />
  </InputContainer>
);

export default forwardRef(InputComponent);
