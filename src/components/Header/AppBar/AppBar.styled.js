import styled from '@emotion/styled';
import { colors, breakPoints } from '../../../base-styles/variables';

import BgHeaderDesk from '../../../images/backgrounds/bg-headerDesk@1x.png';
import BgHeaderTab from '../../../images/backgrounds/bg-headerDesk@1x.png';
import BgHeaderMob from '../../../images/backgrounds/bg-headerDesk@1x.png';

export const AppBarWrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  padding-top: 30px;
  padding-bottom: 5px;
  align-items: center;
  width: 100vw;

  background-color: ${colors.white};
  border: 0;
  /* background-size: cover; */

  @media screen and (min-width: ${breakPoints.mobile}) and (max-width: 767px) {
    background-size: auto 148px;
    background-repeat: no-repeat;
    background-image: url(${BgHeaderMob});
  }

  @media screen and (min-width: ${breakPoints.tablet}) and (max-width: 1023px) {
    background-size: auto 248px;
    background-repeat: no-repeat;
    background-image: url(${BgHeaderTab});
  }

  @media screen and (min-width: 1024px) {
    background-size: auto 500px;
    background-repeat: no-repeat;
    background-image: url(${BgHeaderDesk});
  }

  @media screen and (min-width: ${breakPoints.desktop}) and (max-width: 2560px) {
    background-size: auto;
    background-repeat: no-repeat;
    background-image: url(${BgHeaderDesk});
    width: 1300px;
    height: 500px;
  }
`;

export const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  @media screen and (min-width: ${breakPoints.tablet}) {
    gap: 22px;
  }
`;
