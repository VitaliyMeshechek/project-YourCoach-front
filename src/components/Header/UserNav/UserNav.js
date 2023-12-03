import { useAuth } from 'hooks';
import {
  UserWrapper,
  UserLink,
  Avatar,
  UserName,
  AvatarLink,
  // AvatarImg,
} from './UserNav.styled';

export const UserNav = () => {
  const { user } = useAuth();
  const defaultName = user.email ? user.email.split('@')[0] : 'User';

  return (
    <UserWrapper>
      <UserLink to="/user">
        <Avatar />
        {/* <UserAvatar /> */}
        <UserName>{user.name ? user.name : defaultName}</UserName>
      </UserLink>
    </UserWrapper>
  );
};

export const NavAvatar = () => {
  return (
    <AvatarLink to="/user">
      <Avatar />
      {/* <UserAvatar /> */}
    </AvatarLink>
  );
};
