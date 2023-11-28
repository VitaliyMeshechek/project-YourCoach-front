import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { breakPoints } from '../../../base-styles/variables';

export const LogoLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;
export const LogoImg = styled.img`
  position: absolute;
  width: 115px;
  height: 80px;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover,
  &:focus {
    transform: scale(1.1);
  }

  @media screen and (min-width: ${breakPoints.tablet}) {
    width: 140px;
    height: 97px;
  }

  @media screen and (min-width: ${breakPoints.desktop}) {
    width: 210px;
    height: 158px;
    top: 70px;
    left: 0px;
  }
`;
