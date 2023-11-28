import { NavMenu } from '../NavMenu/NavMenu';
import { Menu, NavWrapper } from './BurgerMenu.styled';

export const BurgerMenu = ({ isMenuOpen, openMenu }) => {
  const onBurgerMenuClick = e => {
    if (e.target) {
      openMenu();
    }
  };

  return (
    <Menu isOpen={isMenuOpen} onClick={onBurgerMenuClick}>
      <NavWrapper>
        <NavMenu />
      </NavWrapper>
    </Menu>
  );
};
