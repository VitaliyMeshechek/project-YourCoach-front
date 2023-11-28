import { NavList, NavItem, Link } from './NavMenu.styled';

const links = [
  { id: 1, href: '/coach', text: 'Наші тренери' },
  { id: 2, href: '/rating', text: 'Рейтинг тренерів' },
  { id: 3, href: '/aboutUs', text: 'Про нас' },
  { id: 4, href: '/partners', text: 'Наші партнери' },
  { id: 5, href: '/news', text: 'Новини' },
];

export const NavMenu = () => {
  return (
    <nav>
      <NavList>
        {links.map(({ id, href, text }) => (
          <NavItem key={id}>
            <nav>
              <Link to={href}>{text}</Link>
            </nav>
          </NavItem>
        ))}
      </NavList>
    </nav>
  );
};
