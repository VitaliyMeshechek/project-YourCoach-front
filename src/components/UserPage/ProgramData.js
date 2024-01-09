import { selectProgram } from 'redux/user/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import {
  deleteUserProgram,
  getCurrentPrograms,
} from '../../redux/user/operations';
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
} from './UserPage.styled';

export const ProgramData = () => {
  const dispatch = useDispatch();

  const program = useSelector(selectProgram);

  useEffect(() => {
    dispatch(getCurrentPrograms());
  }, [dispatch]);

  const visiblePrograms = program
    ? program.filter(program => program.category === 'your program')
    : [];
  console.log('visiblePrograms', visiblePrograms);
  return (
    <div>
      {visiblePrograms.length === 0 && <Header>У Вас ще немає програми</Header>}
      <ProgramList programs={visiblePrograms} />
    </div>
  );
};

const ProgramList = ({ programs }) => {
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

const ProgramItem = ({
  item: {
    photo,
    category,
    nameYourProgram,
    typeYourProgram,
    description,
    duration,
    training,
    comments,
    _id,
  },
}) => {
  const dispatch = useDispatch();

  const handleDeleteProgram = () => {
    dispatch(deleteUserProgram(_id));
  };

  return (
    <ContainerProgram>
      <MyImg src={photo} alt="" />

      <InfoProgram>
        <InfoProgramItem>
          <LabelProgram>Категорія:</LabelProgram>
          <InfoProgramText>{category}</InfoProgramText>
          <ButtonDeleteProgram onClick={handleDeleteProgram}>
            <FiTrash2 style={{ width: '18px', height: '26px' }} />
          </ButtonDeleteProgram>
        </InfoProgramItem>
        <InfoProgramItem>
          <LabelProgram>Назва програми:</LabelProgram>
          <InfoProgramText>{nameYourProgram}</InfoProgramText>
        </InfoProgramItem>
        <InfoProgramItem>
          <LabelProgram>Тип програми:</LabelProgram>
          <InfoProgramText>{typeYourProgram}</InfoProgramText>
        </InfoProgramItem>
        <InfoProgramItem>
          <LabelProgram>Опис програми:</LabelProgram>
          <InfoProgramText>{description}</InfoProgramText>
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
          <LabelProgram>Коментарі:</LabelProgram>
          <InfoProgramText>{comments}</InfoProgramText>
        </InfoProgramItem>
      </InfoProgram>
    </ContainerProgram>
  );
};
