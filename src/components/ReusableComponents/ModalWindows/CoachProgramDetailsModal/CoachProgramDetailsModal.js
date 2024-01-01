import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import {
  Desc,
  Img,
  Title,
  DescWrapper,
  InfoList,
  InfoName,
  InfoValue,
  InfoLink,
  InfoNameList,
  InfoValueList,
  ButtonFlexWrapper,
  CancelButton,
  CancelButtonText,
  ApproveButton,
  ApproveButtonText,
  HeartIcon,
  FlexWrapper,
  Category,
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
      avatarUrl,
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
      <FlexWrapper>
        <ImgWrapper>
          <Img src={avatarUrl} alt={name}></Img>
          <Category>{category}</Category>
        </ImgWrapper>

        <DescWrapper>
          <Title>{name}</Title>

          <InfoList>
            <InfoNameList>
              <InfoName>Назва програми:</InfoName>
              <InfoName>Тип програми:</InfoName>
              <InfoName>Опис програми:</InfoName>
              <InfoName>Особливості програми:</InfoName>
              <InfoName>Підбір харчування:</InfoName>
              <InfoName>Тривалість:</InfoName>
              <InfoName>Тренування:</InfoName>
              <InfoName>Місцезнаходження:</InfoName>
              <InfoName>Ціна:</InfoName>
              <InfoName>Коментарі:</InfoName>
              <InfoName>Email:</InfoName>
              <InfoName>Phone:</InfoName>
            </InfoNameList>
            <InfoValueList>
              <InfoValue>
                {name}
                {/* || {fitnessWeigth}
                              || {fitnessStrength}
                              || {fitnessWellness} */}
              </InfoValue>
              <InfoValue>
                {aerobic}
                {/* || {strong}
                              || {health}
                              || {functions}
                              || {step}
                              || {impact} */}
              </InfoValue>
              <InfoValue>{description}</InfoValue>
              <InfoValue>{special}</InfoValue>
              <InfoValue>{food}</InfoValue>

              <InfoValue>{duration}</InfoValue>
              <InfoValue>{training}</InfoValue>
              <InfoValue>{location}</InfoValue>
              <InfoValue>{price}</InfoValue>
              <InfoValue>{comments}</InfoValue>

              <InfoValue>
                <InfoLink>{user.email ? user.email : 'none'}</InfoLink>
              </InfoValue>
              <InfoValue>
                <InfoLink href={user.phone ? user.phone : ''}>
                  {user.phone ? user.phone : ''}
                </InfoLink>
              </InfoValue>
            </InfoValueList>
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
