import Link from 'next/link';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { CartCheckFill, GearFill, PeopleFill } from '@styled-icons/bootstrap/';
import colors from '../../styles/colors';
import { Body1 } from '../../styles/typography';

const Container = styled.div`
  height: 100vh;
  width: 240px;
  display: flex;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  margin-right: 10px;
  flex-direction: column;
`;

const Item = styled.a<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ active }) =>
    active &&
    css`
      background-color: rgba(29, 144, 243, 0.1);
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: 3px solid ${colors.primary};
    `}
  margin-bottom: 15px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(29, 144, 243, 0.3);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: 3px solid ${colors.primary};
  }
`;

const IconContainer = styled.div<{ primary?: boolean }>`
  background-color: ${({ primary }) =>
    primary ? `rgba(29, 144, 243, 0.9)` : colors.gray};
  border-radius: 15px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
`;

const ItemText = styled.span<{ primary?: boolean }>`
  ${Body1};
  ${({ primary }) =>
    primary &&
    css`
      color: ${colors.primary};
    `}
  font-weight: bold;
  margin-left: 25px;
`;

const ImageContainer = styled.div`
  margin: 90px 0 20px 0;
  display: flex;
  justify-content: center;
`;

const SideBar = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src="/orders.svg" height={200} width={200} />
      </ImageContainer>
      <Link href="/orders/">
        <Item active>
          <IconContainer primary>
            <CartCheckFill color="#fff" size={20} />
          </IconContainer>
          <ItemText primary>Orders</ItemText>
        </Item>
      </Link>

      <Item>
        <IconContainer>
          <PeopleFill size={20} />
        </IconContainer>
        <ItemText>Customers</ItemText>
      </Item>

      <Item>
        <IconContainer>
          <GearFill size={20} />
        </IconContainer>
        <ItemText>Settings</ItemText>
      </Item>
    </Container>
  );
};

export default SideBar;
