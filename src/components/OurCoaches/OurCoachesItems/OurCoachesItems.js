import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import { FiTrash2 } from 'react-icons/fi';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';
// import { getAge } from 'utils/getAge';
import { useAuth } from 'hooks';
import {
  selectLike,
  selectDislike,
  selectRating,
  selectOwn,
} from 'redux/notices/selectors';

import {
  addToLike,
  addToDislike,
  deleteFromLike,
  deleteFromDislike,
  addToFavorite,
  deleteFromFavorite,
} from 'redux/notices/operations';
import {
  Category,
  LikeBtn,
  DislikeBtn,
  Info,
  CoachProgramBtn,
  Photo,
  TabsWrapper,
  Thumb,
  Title,
  TrashBtn,
} from './OurCoachesItems.styled.js';
import { showModal } from 'redux/modal/slice';

export const OurCoachesItems = coach => {
  const {
    isDeleted,
    openModal,
    coach: { _id, avatar, category, name },
  } = coach;

  const { isLoggedIn } = useAuth();
  const [, setNewCategory] = useState();
  const [favStyle, setFavStyle] = useState(false);
  const [own, setOwn] = useState(false);
  const dispatch = useDispatch();
  // const newLocation =
  //   location.length > 5 ? location.slice(0, 4) + '...' : location;
  //   const old = getAge(birthday);
  // const coachLike = useSelector(selectLike).find(item => item._id === _id);
  // const coachDislike = useSelector(selectDislike).find(
  //   item => item._id === _id
  // );
  const ratingItem = useSelector(selectRating).find(item => item._id === _id);
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
    if (ratingItem) {
      setFavStyle(true);
    }
    // if (coachLike) {
    //   setFavStyle(true);
    // }
    // if (coachDislike) {
    //   setFavStyle(true);
    // }
  }, [ratingItem, ownCoach]);

  const handleAssessment = e => {
    e.preventDefault();
    if (!isLoggedIn) {
      setFavStyle(false);
      return;
    }
    if (ratingItem) {
      dispatch(deleteFromFavorite(_id));
      setFavStyle(false);

      return;
    }
    dispatch(addToFavorite(_id));
    // if (coachLike) {
    //   dispatch(deleteFromLike(_id));
    //   setFavStyle(false);

    //   return;
    // }
    // if (coachDislike) {
    //   dispatch(deleteFromDislike(_id));
    //   setFavStyle(false);

    //   return;
    // }
    // dispatch(addToLike(_id));
    // || dispatch(addToDislike(_id));
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
        <Photo src={avatar} />
        <LikeBtn
          type="button"
          className={favStyle ? 'active' : null}
          onClick={handleAssessment}
        >
          <AiFillLike />
        </LikeBtn>
        <DislikeBtn
          type="button"
          className={favStyle ? 'active' : null}
          onClick={handleAssessment}
        >
          <AiFillDislike />
        </DislikeBtn>

        {own && (
          <TrashBtn type="button" onClick={handleDeleteOwnCoach}>
            <FiTrash2 />
          </TrashBtn>
        )}
        <Category>Назва програми: {name}</Category>
        <CoachProgramBtn onClick={handleLookDetails}>
          Ознайомитися
        </CoachProgramBtn>
      </Thumb>
    </>
  );
};
