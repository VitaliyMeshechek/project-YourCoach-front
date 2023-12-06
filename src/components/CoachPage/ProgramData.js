import { selectProgram } from 'redux/auth/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { deleteProgram, fetchPrograms } from '../../redux/user/operations';
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

  const program = useSelector(selectProgram);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const visiblePrograms = program
    ? program.filter(program => program.category.includes('your pet'))
    : [];

  return (
    <div>
      {visiblePrograms.length === 0 && (
        <Header>You have not added your programs yet</Header>
      )}
      <ProgramList programs={visiblePrograms} />
    </div>
  );
};

const ProgramList = props => {
  const { programs } = props;
  return (
    <div>
      {programs && (
        <ProgramItemUl>
          {programs.map(item => (
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
    dispatch(deleteProgram(_id));
  };

  return (
    <ContainerProgram>
      <MyImg src={photo} alt={name} />

      <InfoProgram>
        <InfoProgramItem>
          <LabelProgram>Назва:</LabelProgram>
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
