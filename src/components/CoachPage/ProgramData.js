import { selectPet } from 'redux/auth/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { deletePet, fetchPets } from '../../redux/user/operations';
import {
  ContainerProgram,
  LabelProgram,
  Header,
  InfoProgramItem,
  InfoProgram,
  InfoProgramText,
  ProgramItemUl,
  MyImg,
  ButtonDeleteProgram,
} from './CoachPage.styled';

export const ProgramData = () => {
  const dispatch = useDispatch();

  const pet = useSelector(selectPet);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const visiblePets = pet
    ? pet.filter(pet => pet.category.includes('your pet'))
    : [];

  return (
    <div>
      {visiblePets.length === 0 && (
        <Header>You have not added your pets yet</Header>
      )}
      <ProgramList pets={visiblePets} />
    </div>
  );
};

const ProgramList = props => {
  const { pets } = props;
  return (
    <div>
      {pets && (
        <ProgramItemUl>
          {pets.map(item => (
            <ProgramItem key={item._id} item={item} />
          ))}
        </ProgramItemUl>
      )}
    </div>
  );
};
const ProgramItem = ({ item }) => {
  const { photo, name, dateOfBirth, breed, comments, _id } = item;

  const dispatch = useDispatch();

  const HandleDeleteProgram = () => {
    dispatch(deletePet(_id));
  };

  return (
    <ContainerProgram>
      <MyImg src={photo} alt={name} />

      <InfoProgram>
        <InfoProgramItem>
          <LabelProgram>Name:</LabelProgram>
          <InfoProgramText>{name}</InfoProgramText>
          <ButtonDeleteProgram onClick={HandleDeleteProgram}>
            <FiTrash2 style={{ width: '18px', height: '26px' }} />
          </ButtonDeleteProgram>
        </InfoProgramItem>
        <InfoProgramItem>
          <LabelProgram>Date of birth:</LabelProgram>
          <InfoProgramText>{dateOfBirth}</InfoProgramText>
        </InfoProgramItem>
        <InfoProgramItem>
          <LabelProgram>Breed:</LabelProgram>
          <InfoProgramText>{breed}</InfoProgramText>
        </InfoProgramItem>
        <InfoProgramItem>
          <LabelProgram>Comments:</LabelProgram>
          <InfoProgramText>{comments}</InfoProgramText>
        </InfoProgramItem>
      </InfoProgram>
    </ContainerProgram>
  );
};
