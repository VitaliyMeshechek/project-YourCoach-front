import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media screen and (min-width: 768px) {
    gap: 12px;
  }
`;

export const NavLinkStyled = styled(NavLink)`
  display: inline-block;
  font-family: inherit;
  text-decoration: none;
  background: #cce4fb;
  border-radius: 40px;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.38;
  letter-spacing: 0.04em;
  color: #54adff;
  border: none;
  transition: all 300ms ease;

  &.active,
  :hover:not(.active) {
    color: #fef9f9;
    background: #54adff;
  }

  /* @media screen and (min-width: 768px) {
    padding: 8px 16px;
  } */
`;
