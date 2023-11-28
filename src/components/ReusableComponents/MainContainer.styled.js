import styled from '@emotion/styled';
import { breakPoints } from '../../../src/base-styles/variables';

export const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: ${breakPoints.mobile}) {
    width: 320px;
  }

  @media screen and (min-width: ${breakPoints.tablet}) {
    padding-left: 32px;
    padding-right: 32px;
    width: 768px;
  }

  @media screen and (min-width: ${breakPoints.desktop}) {
    padding-left: 16px;
    padding-right: 16px;
    width: 1280px;
  }
`;
