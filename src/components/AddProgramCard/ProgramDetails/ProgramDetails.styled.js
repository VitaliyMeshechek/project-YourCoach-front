import styled from '@emotion/styled';
import { Field } from 'formik';
import { breakPoints, colors } from 'base-styles/variables';

export const ProgramFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 16px 0 24px;
  gap: 20px;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 394 px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 394 px;
`;

export const AddFormLabelWrapper = styled.div`
  position: relative;
`;

export const AddFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.36;
  color: ${colors.black};

  @media screen and (min-width: ${breakPoints.tablet}) {
    gap: 8px;
    font-size: 20px;
    line-height: 1.3;
  }
`;

export const AddFormInput = styled(Field)`
  padding: 10px 16px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid ${colors.blue};
  border-radius: 40px;
  outline-color: ${colors.blue};
  transition: outline 300ms 3px 8px 14px rgba(136, 198, 253, 0.19);

  @media screen and (min-width: ${breakPoints.tablet}) {
    font-size: 16px;
    min-width: 394px;
    padding: 12px 16px;
  }
  &[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
