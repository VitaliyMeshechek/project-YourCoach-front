import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { FiTrash2 } from 'react-icons/fi';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';
// import { getAge } from 'utils/getAge';
import { useAuth } from 'hooks';
import { selectLike, selectDislike, selectOwn } from 'redux/notices/selectors';

import {
  addToLike,
  addToDislike,
  deleteFromLike,
  deleteFromDislike,
} from 'redux/notices/operations';
import {
  Category,
  FavoriteBtn,
  Info,
  CoachProgramBtn,
  Photo,
  TabsWrapper,
  Thumb,
  Title,
  TrashBtn,
} from './OurCoachesItems.styled.js';
import { showModal } from 'redux/modal/slice';

export const OurCoachesItems = coaches => {
  const {
    isDeleted,
    openModal,
    coach: { _id, avatarUrl, category, location },
  } = coaches;

  const { isLoggedIn } = useAuth();
  const [newCategory, setNewCategory] = useState();
  const [favStyle, setFavStyle] = useState(false);
  const [own, setOwn] = useState(false);
  const dispatch = useDispatch();
  const newLocation =
    location.length > 5 ? location.slice(0, 4) + '...' : location;
  //   const old = getAge(birthday);
  const coachLike = useSelector(selectLike).find(item => item._id === _id);
  const coachDislike = useSelector(selectDislike).find(
    item => item._id === _id
  );
  const ownCoach = useSelector(selectOwn).find(item => item._id === _id);

  useEffect(() => {
    switch (category) {
      case 'fitnes for women':
        setNewCategory('fitnes for women');
        break;
      case 'weigth':
        setNewCategory('weigth');
        break;
      case 'strength fitness':
        setNewCategory('strength fitness');
        break;
      case 'flexibility and wellness':
        setNewCategory('flexibility and wellness');
        break;
      default:
        break;
    }
  }, [category]);

  useEffect(() => {
    if (ownCoach) {
      setOwn(true);
    }
    if (coachLike) {
      setFavStyle(true);
    }
    if (coachDislike) {
      setFavStyle(true);
    }
  }, [coachLike, coachDislike, ownCoach]);

  const handleAssessment = e => {
    e.preventDefault();
    if (!isLoggedIn) {
      setFavStyle(false);
      return;
    }
    if (coachLike) {
      dispatch(deleteFromLike(_id));
      setFavStyle(false);

      return;
    }
    if (coachDislike) {
      dispatch(deleteFromDislike(_id));
      setFavStyle(false);

      return;
    }
    dispatch(addToLike(_id)) || dispatch(addToDislike(_id));
  };

  const handleDeleteOwnCoach = e => {
    e.preventDefault();
    openModal(_id, 'remove');
    dispatch(showModal(true));
    if (isDeleted) {
      console.log(isDeleted);
      setOwn(false);
    }
  };

  const handleLookDetails = e => {
    dispatch(showModal(true));

    openModal(_id, 'lookDetails');
  };

  return (
    <>
      <Thumb>
        <Photo src={avatarUrl} />
        <Category>{newCategory}</Category>

        <FavoriteBtn
          type="button"
          className={favStyle ? 'active' : null}
          onClick={handleAssessment}
        >
          <AiFillLike />
          <AiFillDislike />
        </FavoriteBtn>

        {own && (
          <TrashBtn type="button" onClick={handleDeleteOwnCoach}>
            <FiTrash2 />
          </TrashBtn>
        )}

        {/* <TabsWrapper>
          <Info>
            <HiOutlineLocationMarker />
            {newLocation}
          </Info>
          <Info>
            <HiOutlineClock />
            {old > 1 ? `${old} years` : `${old} year`}
          </Info>
          <Info>
            {sex === 'female' ? <TbGenderFemale /> : <TbGenderMale />}
            {sex}
          </Info>
        </TabsWrapper>
        <Title>{title}</Title> */}
        <CoachProgramBtn onClick={handleLookDetails}>
          Ознайомитися
        </CoachProgramBtn>
      </Thumb>
    </>
  );
};
