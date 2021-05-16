import styled from 'styled-components';
import colors from '../../styles/colors';

interface AvatarProps {
  itemName: string;
  size?: number;
}

const AvatarContainer = styled.div<{ size?: number }>`
  display: flex;
  height: ${({ size }) => (size ? `${size * 20}px` : `32px`)};
  width: ${({ size }) => (size ? `${size * 20}px` : `32px`)};
  border-radius: ${({ size }) => (size ? `${size * 10}px` : `16px`)};
  align-items: center;
  justify-content: center;
  background-color: ${colors.orange};
  margin: 0 5px 0 5px;
  color: #fff;
  font-size: ${({ size }) => (size ? `${(size * 10 * 3) / 4}px` : `16px`)};
`;

const Avatar = ({ itemName, size }: AvatarProps) => {
  const splitName = itemName ? itemName.split(' ') : [''];
  const initials =
    splitName.length > 1 ? splitName[0][0] + splitName[1][0] : splitName[0][0];

  return <AvatarContainer size={size}>{initials}</AvatarContainer>;
};

export default Avatar;
