import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import {
  Img,
  Title,
  DescWrapper,
  InfoList,
  InfoLink,
  ButtonFlexWrapper,
  CancelButton,
  CancelButtonText,
  ApproveButton,
  ApproveButtonText,
  HeartIcon,
  FlexWrapper,
  InfoProgramItem,
  LabelProgram,
  InfoProgramText,
  ImgWrapper,
} from './CoachProgramDetailsModal.styled.js';


import { showModal } from 'redux/modal/slice';
import { useEffect, useState } from 'react';
import { fetchUserById } from 'redux/notices/operations';
import { selectUserById } from 'redux/notices/selectors';

const CoachProgramDetailsModal = ({ details, handleFavorite }) => {
  const dispatch = useDispatch();
  const [
    {
      owner,
      avatar,
      category,
      name,
      fitnessWeigth,
      fitnessStrength,
      fitnessWellness,
      description,
      aerobic,
      strong,
      health,
      functions,
      step,
      impact,
      special,
      food,
      duration,
      training,
      location,
      price,
      comments,
    },
    setCoachProgramDetail,
  ] = useState({});

  const user = useSelector(selectUserById);

  useEffect(() => {
    if (!details) {
      return;
    }
    setCoachProgramDetail(details);
    dispatch(fetchUserById(owner));
  }, [dispatch, owner, details]);

  return (
    <ModalWrapper padding="44px 12px 16px 12px">
      <Title>{name}</Title>
      <FlexWrapper>
        <DescWrapper>
          <ImgWrapper>
            <Img src={avatar} alt=""></Img>
          </ImgWrapper>
          <InfoList>
            <InfoProgramItem>
              <LabelProgram>Категорія:</LabelProgram>
              <InfoProgramText>{category}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Назва програми:</LabelProgram>
              <InfoProgramText>{name}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Тип програми:</LabelProgram>
              <InfoProgramText>{aerobic}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Опис програми:</LabelProgram>
              <InfoProgramText>{description}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Особливості програми:</LabelProgram>
              <InfoProgramText>{special}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Підбір харчування:</LabelProgram>
              <InfoProgramText>{food}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Тривалість програми:</LabelProgram>
              <InfoProgramText>{duration}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Тренування:</LabelProgram>
              <InfoProgramText>{training}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Місцезнаходження:</LabelProgram>
              <InfoProgramText>{location}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Ціна:</LabelProgram>
              <InfoProgramText>{price}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Коментарі:</LabelProgram>
              <InfoProgramText>{comments}</InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Email:</LabelProgram>
              <InfoProgramText>
                <InfoLink>{user.email ? user.email : 'none'}</InfoLink>
              </InfoProgramText>
            </InfoProgramItem>
            <InfoProgramItem>
              <LabelProgram>Телефон:</LabelProgram>
              <InfoProgramText>
                <InfoLink href={user.phone ? user.phone : ''}>
                  {user.phone ? user.phone : ''}
                </InfoLink>
              </InfoProgramText>
            </InfoProgramItem>
          </InfoList>
        </DescWrapper>
      </FlexWrapper>
      {/* <Desc>{comments}</Desc> */}
      <ButtonFlexWrapper>
        <CancelButton onClick={() => dispatch(showModal(false))}>
          <CancelButtonText>
            <a href="tel:">Зателефонувати</a>
          </CancelButtonText>
        </CancelButton>
        <ApproveButton onClick={handleFavorite}>
          <ApproveButtonText>Add to</ApproveButtonText>
          <HeartIcon />
        </ApproveButton>
      </ButtonFlexWrapper>
    </ModalWrapper>
  );
};

export default CoachProgramDetailsModal;
