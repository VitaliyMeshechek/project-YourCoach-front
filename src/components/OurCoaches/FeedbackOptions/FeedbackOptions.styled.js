import styled from '@emotion/styled';

export const Container = styled.div`
display: flex;
justify-content: center;
gap: 12px;
align-items: center
`;

 export const LikeBtn = styled.button`
 position: absolute;
  top: 56px;
  right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #c5dff6;
  color: #54adff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    width: 22px;
    height: 22px;
    color: inherit;
  }

  &:hover {
    background: #54adff;
    svg {
      color: #ffffff;
    }
  }`;

  export const DislikeBtn = styled.button`
 position: absolute;
  top: 100px;
  right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #c5dff6;
  color: #54adff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    width: 22px;
    height: 22px;
    color: inherit;
  }

  &:hover {
    background: #54adff;
    svg {
      color: #ffffff;
    }
  }`;