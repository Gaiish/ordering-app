import styled from 'styled-components';
import Link from 'next/link';
import { List } from '@styled-icons/bootstrap/';

import { Body1, Heading2 } from 'styles/typography';

interface HeaderProps {
  username: string;
  toggleSidebar?: () => void;
}

const Container = styled.div`
  height: 60px;
  background-color: #fff;
  width: 100%;
  padding: 0 26px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: 0 3px 3px -3px #777;
  -moz-box-shadow: 0 3px 3px -3px #777;
  box-shadow: 0 3px 3px -3px #777;
  z-index: 100;
`;

const LeftSection = styled.div``;

const AppName = styled.a`
  ${Heading2};
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
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
  margin-left: 10px;
  opacity: 0.7;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const MenuBtn = styled(List)`
  display: none;
  @media screen and (max-width: 767px) {
    display: inline;
    margin-right: 10px;
  }
`;

const Header = ({ username, toggleSidebar }: HeaderProps) => {
  return (
    <Container>
      <LeftSection>
        <MenuBtn size={28} onClick={toggleSidebar} />
        <Link href="/">
          <AppName>ORDERING APP</AppName>
        </Link>
      </LeftSection>
      <RightSection>
        <UserAvatar
          src="/avatar.png"
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
