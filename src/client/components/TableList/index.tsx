import { ReactNode } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import colors from '../../styles/colors';
import { Body1, Body2 } from '../../styles/typography';

interface TabHeadProps {
  headings: string[];
}

interface TabRowProps {
  items: string[];
  orderId: string;
}

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabHeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;

const TabHeading = styled.div`
  ${Body1};
  padding: 6px;
  display: flex;
  align-items: center;
  width: 200px;
  font-weight: bold;
  opacity: 0.7;
`;

const TabRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid rgb(242, 244, 247);
  &:hover {
    background-color: rgb(246, 247, 249);
    border: none;
    border-radius: 6px;
  }
`;

const TabRowItem = styled.div`
  display: flex;
  ${Body2};
  padding: 20px 6px;
  align-items: center;
  width: 200px;
`;

const ItemWithAvatar = ({ itemName }: { itemName: string }) => (
  <TabRowItem>
    <Avatar itemName={itemName} />
    <span>{itemName}</span>
  </TabRowItem>
);

const AvatarContainer = styled.div`
  display: flex;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.orange};
  margin-right: 8px;
  margin-left: 4px;
  color: #fff;
`;

const Avatar = ({ itemName }: { itemName: string }) => {
  const splitName = itemName.split(' ');
  const initials =
    splitName.length > 1 ? splitName[0][0] + splitName[1][0] : splitName[0][0];

  return <AvatarContainer>{initials}</AvatarContainer>;
};

export const TabHead = ({ headings }: TabHeadProps) => (
  <TabHeadContainer>
    {headings.map((heading, index) => (
      <TabHeading key={index}>{heading}</TabHeading>
    ))}
  </TabHeadContainer>
);

const TabLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const TabRow = ({
  items: [firstItem, ...rest],
  orderId,
}: TabRowProps) => (
  <Link href={`/orders/${orderId}`} passHref>
    <TabLink>
      <TabRowContainer>
        <ItemWithAvatar itemName={firstItem} />
        {[...rest].map((item, index) => (
          <TabRowItem key={index}>{item}</TabRowItem>
        ))}
      </TabRowContainer>
    </TabLink>
  </Link>
);

const TableList = ({ children }: { children: ReactNode }) => (
  <TableContainer>{children}</TableContainer>
);

export default TableList;
