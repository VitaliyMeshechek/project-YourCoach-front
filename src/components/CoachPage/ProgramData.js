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
    ? program.filter(program => program.category.includes('fitnes for women'))
    : [];

  return (
    <div>
      {visiblePrograms.length === 0 && <Header>У Вас ще немає програми</Header>}
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
  const {
    photo,
    category,
    name,
    aerobic,
    special,
    food,
    duration,
    training,
    comments,
    _id,
  } = item;

  const dispatch = useDispatch();

  const HandleDeleteProgram = () => {
    dispatch(deleteProgram(_id));
  };

  return (
    <ContainerProgram>
      <MyImg src={photo} alt={name} />

      <InfoProgram>
        <InfoProgramItem>
          <LabelProgram>Категорія:</LabelProgram>
          <InfoProgramText>{category}</InfoProgramText>
          <ButtonDeleteProgram onClick={HandleDeleteProgram}>
            <FiTrash2 style={{ width: '18px', height: '26px' }} />
          </ButtonDeleteProgram>
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
          <LabelProgram>Особливості програми:</LabelProgram>
          <InfoProgramText>{special}</InfoProgramText>
        </InfoProgramItem>
        <InfoProgramItem>
          <LabelProgram>Підбір харчування:</LabelProgram>
          <InfoProgramText>{food}</InfoProgramText>
        </InfoProgramItem>
        <InfoProgramItem>
          <LabelProgram>Тривалість:</LabelProgram>
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
