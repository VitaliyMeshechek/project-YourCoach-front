import styled from '@emotion/styled';
import { colors, breakPoints } from '../../src/base-styles/variables';

export const MainBackground = styled.div`
  position: relative;
  padding-top: 110px;
  height: 601px;
  background-color: ${colors.white};
  /* z-index: 2000; */

  @media screen and (min-width: ${breakPoints.tablet}) {
    padding-top: 126px;
    height: 1193px;
    background-color: ${colors.white};
  }

  @media screen and (min-width: ${breakPoints.desktop}) {
    padding-top: 149px;
    height: 800px;
    background-color: ${colors.white};
  }
`;
