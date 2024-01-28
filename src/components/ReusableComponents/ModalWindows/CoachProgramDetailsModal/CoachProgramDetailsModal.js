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
import { selectUserById, selectNotices } from 'redux/notices/selectors';

const CoachProgramDetailsModal = ({ coach, handleFavorite}) => {
  const [
    {
      name,
      avatar,
      owner,
      category,
      kind,
      fitnessWeigth,
      kindProgramWeigth,
      fitnessStrength,
      fitnessWellness,
      description,
      training,
      location,
      comments,
      food,
      special,
      duration,
      price,
    },
    setCoachProgramDetail,
  ] = useState({});

  const dispatch = useDispatch();
  console.log('owner', owner);
  const user = useSelector(selectUserById);

  useEffect(() => {
    if (!coach) {
      return;
    }
    setCoachProgramDetail(coach);

    dispatch(fetchUserById(owner));
  }, [dispatch, owner, coach]);


  return (
    <ModalWrapper padding="44px 12px 16px 12px">
      {name && (<Title>{name}</Title>)}
      {fitnessWeigth && (<Title>{fitnessWeigth}</Title>)}
      {fitnessStrength && (<Title>{fitnessStrength}</Title>)}
      {fitnessWellness && (<Title>{fitnessWellness}</Title>)}     
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
            {name && (<InfoProgramItem>              
              <LabelProgram>Назва програми:</LabelProgram>
              <InfoProgramText>{name}</InfoProgramText>
            </InfoProgramItem>)}
            {fitnessWeigth && (<InfoProgramItem>              
              <LabelProgram>Назва програми:</LabelProgram>
              <InfoProgramText>{fitnessWeigth}</InfoProgramText>
            </InfoProgramItem>)}
            {fitnessStrength && (<InfoProgramItem>              
              <LabelProgram>Назва програми:</LabelProgram>
              <InfoProgramText>{fitnessStrength}</InfoProgramText>
            </InfoProgramItem>)}
            {fitnessWellness && (<InfoProgramItem>              
              <LabelProgram>Назва програми:</LabelProgram>
              <InfoProgramText>{fitnessWellness}</InfoProgramText>
            </InfoProgramItem>)}
            {kind && (<InfoProgramItem>
              <LabelProgram>Тип програми:</LabelProgram>
              <InfoProgramText>{kind}</InfoProgramText>
            </InfoProgramItem>)}
            {kindProgramWeigth && (<InfoProgramItem>
              <LabelProgram>Тип програми:</LabelProgram>
              <InfoProgramText>{kindProgramWeigth}</InfoProgramText>
            </InfoProgramItem>)}
            <InfoProgramItem>
              <LabelProgram>Опис програми:</LabelProgram>
              <InfoProgramText>{description}</InfoProgramText>
            </InfoProgramItem>
            {special && (<InfoProgramItem>
              <LabelProgram>Особливості програми:</LabelProgram>
              <InfoProgramText>{special}</InfoProgramText>
            </InfoProgramItem>)}
            {food && (<InfoProgramItem>
              <LabelProgram>Підбір харчування:</LabelProgram>
              <InfoProgramText>{food}</InfoProgramText>
            </InfoProgramItem>)}
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
