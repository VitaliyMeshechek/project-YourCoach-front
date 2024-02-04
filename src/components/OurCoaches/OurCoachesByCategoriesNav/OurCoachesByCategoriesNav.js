import { useAuth } from 'hooks';
import { Nav, NavLinkStyled } from './OurCoachesByCategoriesNav.styled';

const links = [
  { href: 'fitnes for women', text: 'Фітнес для жінок' },
  { href: 'weigth', text: 'Програма схуднення' },
  { href: 'strength fitness', text: 'Силовий фітнес' },
  { href: 'flexibility and wellness', text: 'Гнучкість та оздоровлення' },
  { href: 'favorite', text: 'Улюблені тренери' },
];

const userLinks = [
  { href: 'own', text: 'Для тренера' },
 
];

export const OurCoachesByCategoriesNav = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Nav>
      {links.map(({ href, text }) => (
        <NavLinkStyled to={href} key={href}>
          {text}
        </NavLinkStyled>
      ))}
      {isLoggedIn &&
        userLinks.map(({ href, text }) => (
          <NavLinkStyled to={href} key={href}>
            {text}
          </NavLinkStyled>
        ))}
    </Nav>
  );
};
