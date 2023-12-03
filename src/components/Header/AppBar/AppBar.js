import { useState } from 'react';
import {
  AppBarWrapper,
  Header,
  NavWrapper,
  UserNavWrapper,
} from './AppBar.styled';
import { Container } from 'components/ReusableComponents/MainContainer.styled';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { BurgerMenuBtn } from '../BurgerMenu/BurgerMenuBtn';
import { Logo } from '../Logo/Logo';
import { UserNav } from '../UserNav/UserNav';
import { AuthNav } from '../AuthNav/AuthNav';
import { useAuth } from 'hooks';

export const AppBar = () => {
  const [menuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  };

  const closeMenu = () => {
    if (menuOpen) {
      setIsMenuOpen(false);
    }
    return;
  };

  return (
    <>
      <AppBarWrapper>
        <Container>
          <Header>
            <Logo close={closeMenu} />
            <NavWrapper>
              <UserNavWrapper>
                {isLoggedIn ? <UserNav /> : <AuthNav />}
              </UserNavWrapper>
              <BurgerMenuBtn toggle={toggleMenu} isMenuOpen={menuOpen} />
              <BurgerMenu
                isMenuOpen={menuOpen}
                openMenu={toggleMenu}
                user={isLoggedIn}
              />
            </NavWrapper>
          </Header>
        </Container>
      </AppBarWrapper>
    </>
  );
};
