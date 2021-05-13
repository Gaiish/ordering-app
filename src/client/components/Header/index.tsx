import styled from 'styled-components';
import Image from 'next/image';

import colors from '../../styles/colors';
import { Body1, Heading2 } from '../../styles/typography';

interface HeaderProps {
  username: string;
}

const Container = styled.div`
  height: 60px;
  background-color: ${colors.primary};
  width: 100%;
  padding: 0 26px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: 0 6px 6px -6px #777;
  -moz-box-shadow: 0 6px 6px -6px #777;
  box-shadow: 0 6px 6px -6px #777;
`;

const LeftSection = styled.div``;

const AppName = styled.h1`
  ${Heading2};
  font-size: 16px;
  color: #fff;
`;

const RightSection = styled.div`
  margin-right: 56px;
  display: flex;
  flex-direction: row;
`;

const UserAvatar = styled.img`
  border-radius: 18px;
  align-self: center;
`;

const UserName = styled.h1`
  ${Body1};
  color: #fff;
  margin-left: 10px;
  opacity: 0.7;
`;

const Header = ({ username }: HeaderProps) => {
  return (
    <Container>
      <LeftSection>
        <AppName>ORDERING APP</AppName>
      </LeftSection>
      <RightSection>
        <UserAvatar
          src="/avatar.jpeg"
          height={36}
          width={36}
          alt="Profile pic"
        />
        {username && <UserName>{username}</UserName>}
      </RightSection>
    </Container>
  );
};

export default Header;
