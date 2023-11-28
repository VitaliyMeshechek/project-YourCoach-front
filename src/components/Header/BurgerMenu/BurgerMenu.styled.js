import styled from '@emotion/styled';
import { colors, breakPoints } from '../../../base-styles/variables';
import BgBurgerMenuDesk from '../../../images/backgrounds/bg-burgerMenuDesk@1x.png';
import BgBurgerMenuTab from '../../../images/backgrounds/bg-burgerMenuDesk@1x.png';
import BgBurgerMenuMob from '../../../images/backgrounds/bg-burgerMenuDesk@1x.png';

export const Menu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  width: 100%;
  height: 100vh;
  top: 101%;
  left: 0;

  overflow-y: auto;

  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(300%)')};

  background-size: 280px 294px;
  background-repeat: no-repeat;
  background-image: url(${BgBurgerMenuMob});
  /* object-fit: cover; */

  @media screen and (min-width: ${breakPoints.tablet}) {
    top: 100%;
    background-size: 708px 724px;
    background-repeat: no-repeat;
    background-image: url(${BgBurgerMenuTab});
  }

  @media screen and (min-width: ${breakPoints.desktop}) {
    top: 238px;
    background-repeat: no-repeat;
    background-image: url(${BgBurgerMenuDesk});
    background-size: 1300px 900px;
  }
`;

export const Button = styled.button`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;
  float: left;
  outline: 0;
  border: 0;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 4px;
  padding-right: 4px;
  background: none;
  cursor: pointer;
  top: 60px;
  right: 0px;
  /* @media screen and (min-width: ${breakPoints.desktop}) {
    display: none;
  } */

  span {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &.active {
    span:nth-of-type(1) {
      transform: rotate(45deg) translate(3.5px, 3.5px);
      height: 2px;
    }

    span:nth-of-type(2) {
      opacity: 0;
      pointer-events: none;
    }

    span:nth-of-type(3) {
      transform: rotate(-47deg) translate(2px, -2px);
      height: 2px;
    }
  }
`;

export const Bar = styled.span`
  display: block;
  width: 20px;
  height: 2px;
  margin-bottom: 2px;
  border-radius: 1px;
  background-color: ${colors.yellow};
`;

export const NavWrapper = styled.div`
  @media screen and (min-width: ${breakPoints.tablet}) {
    /* padding-top: 100px; */
  }
`;
