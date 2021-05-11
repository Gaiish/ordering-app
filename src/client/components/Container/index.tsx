import styled, { css } from 'styled-components';

const Container = styled.div<{ centerContent?: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  ${({ centerContent }) =>
    centerContent &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;

export default Container;
