import styled from '@emotion/styled';
import { breakPoints, colors } from 'base-styles/variables';
import { BsSuitHeart } from 'react-icons/bs';

// import {
//   Img as NewsImg,
//   Title as NewsTitle,
//   Desc as NewsDesc,
//   DescWrapper as NewsDescWrapper,
// } from 'components/News/NewsItem/NewsItem.styled';

import {
  ButtonFlexWrapper as ApproveButtonFlexWrapper,
  CancelButton as ApproveCancelButton,
  CancelButtonText as ApproveCancelButtonText,
  ApproveButton as ApproveButtonCopy,
  ApproveButtonText as ApproveButtonTextCopy,
} from '../ModalApproveAction/ModalApproveAction.styled.js';

export const ButtonFlexWrapper = styled(ApproveButtonFlexWrapper)`
  @media screen and (min-width: ${breakPoints.tablet}) {
    margin-left: auto;
    flex-direction: row-reverse;
  }
`;
export const CancelButton = styled(ApproveCancelButton)``;
export const CancelButtonText = styled(ApproveCancelButtonText)``;
export const ApproveButton = styled(ApproveButtonCopy)`
  gap: 11px;
`;
export const ApproveButtonText = styled(ApproveButtonTextCopy)``;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  @media screen and (min-width: ${breakPoints.tablet}) {
    flex-direction: column;
    gap: 24px;
    width: 100%;
    margin-bottom: 28px;
  }
`;


export const ImgWrapper = styled.div`
  display: flex;
`;

export const Category = styled.div`
  padding: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 126px;
  height: 32px;
  left: 0px;
  top: 16px;
  border-radius: 0px 40px 40px 0px;

  background: #cce4fb;
`;

export const Img = styled.img`
  position: relative;
  display: block;

  width: 160px;
  height: 182px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  margin-bottom: 12px;
  @media screen and (min-width: ${breakPoints.tablet}) {
    margin-bottom: 0;
    width: 200px;
    height: 227px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;

  @media screen and (min-width: ${breakPoints.tablet}) {
    font-size: 28px;
    line-height: 38px;
    width: 240px;
  }
`;

// export const Desc = styled.p`
//   text-align: start;
//   font-weight: 600;
//   font-size: 14px;
//   line-height: 19px;
//   margin-bottom: 12px;
//   color: #000000;

//   @media screen and (min-width: ${breakPoints.tablet}) {
//     font-size: 16px;
//     line-height: 24px;
//     margin-bottom: 70px;
//   }
// `;


export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  margin-bottom: 12px;
`;

export const InfoLink = styled.a`
  text-decoration-line: underline;
  color: #ffc107;
`;

export const InfoNameList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-right: 20px;
  @media screen and (min-width: ${breakPoints.tablet}) {
    margin-right: 50px;
  }
`;

export const InfoProgramItem = styled.div`
  /* border: solid 1px orange; */
  display: flex;
  margin-bottom: 12px;
  margin-right: 20px;
  margin-left: 20px;
  /* position: relative; */
  :last-child {
    margin-bottom: 0;
  }
  @media screen and (min-width: 768px) {
    width: 515px;
    margin-bottom: 16px;
  }
  @media screen and (min-width: 1280px) {
    width: 360px;
  }
`;

export const LabelProgram = styled.span`
  font-weight: 700;
  font-size: 14px;
  @media screen and (min-width: 1280px) {
    font-size: 16px;
  }
`;

export const InfoProgramText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-left: 8px;
  @media screen and (min-width: 1280px) {
    font-size: 16px;
  }
`;

export const InfoName = styled.li`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  @media screen and (min-width: ${breakPoints.tablet}) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const InfoValueList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding-top: 2px;
  @media screen and (min-width: ${breakPoints.tablet}) {
    font-size: 16px;
    line-height: 22px;
    gap: 8px;
    padding-top: 1px;
  }
`;

export const InfoValue = styled.li`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  @media screen and (min-width: ${breakPoints.tablet}) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const DescWrapper = styled.div`
  display: flex;
  align-items: start;
  text-align: start;
  @media screen and (min-width: ${breakPoints.tablet}) {
  }
`;

export const HeartIcon = styled(BsSuitHeart)`
  width: 18px;
  height: 16px;
  color: ${colors.white};
  stroke-width: 0;
`;
