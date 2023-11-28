import { Button, Bar } from '../BurgerMenu/BurgerMenu.styled';

export const BurgerMenuBtn = ({ toggle, isMenuOpen }) => {
  return (
    <Button
      className={isMenuOpen ? 'active' : ''}
      aria-label="Open main menu"
      onClick={toggle}
    >
      <Bar />
      <Bar />
      <Bar />
    </Button>
  );
};
