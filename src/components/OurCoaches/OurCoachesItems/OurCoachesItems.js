import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';
import {FiHeart, FiTrash2 } from 'react-icons/fi';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import CoachProgramDetailsModal from 'components/ReusableComponents/ModalWindows/CoachProgramDetailsModal/CoachProgramDetailsModal';
import RemoveCoachProgramDetailsModal from 'components/ReusableComponents/ModalWindows/RemoveCoachProgramDetailsModal/RemoveCoachProgramDetailsModal';
// import { getAge } from 'utils/getAge';
import { useAuth } from 'hooks';
import ModalWrapper from 'components/ReusableComponents/ModalWindows/ModalWrapper/ModalWrapper';
import { nanoid } from 'nanoid'

import {
  Img,
  Title,
  DescWrapper,
  InfoList,
  InfoLink,
  InfoName,
  InfoValue,
  InfoNameList,
  InfoValueList,
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
  Category,
} from 'components/ReusableComponents/ModalWindows/CoachProgramDetailsModal/CoachProgramDetailsModal.styled.js';

import {
  // selectLike,
  // selectDislike,
  selectFavorite,
  selectNotices,
  selectOwn,
  selectQuery,
  selectUserById,
} from 'redux/notices/selectors';

import {
  addToLike,
  addToDislike,
  deleteFromLike,
  deleteFromDislike,
  fetchNotices,
  fetchUsersNotices,
  fetchFavorites,
  deleteUserNotice,
  addToFavorite,
  deleteFromFavorite,
  fetchUserById,
} from 'redux/notices/operations';
import {
  NameProgram,
  FavoriteBtn,
  ContainerFeedback,
  LikeBtn,
  DislikeBtn,
  Info,
  CoachProgramBtn,
  Photo,
  TabsWrapper,
  Thumb,
  // Title,
  TrashBtn,
} from './OurCoachesItems.styled.js';
import { showModal } from 'redux/modal/slice';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions.js';
import { RatingCoach } from '../RatingCoach/RatingCoach.js';

export const OurCoachesItems = (items) => {
  const {    
    isDeleted,
    openModal,
    coach: {
      _id,     
      avatar,
      name,
      category,
      fitnessWeigth,
      fitnessStrength,
      fitnessWellness,
    },
  } = items

  // console.log("id", id)
  const { isLoggedIn } = useAuth();
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const { categoryName } = useParams();

  const [assessment, setAssessment] = useState(null);
  // const coachLike = useSelector(selectLike);
  // const ratingCoach = useSelector(selectRating);
  // const coachDislike = useSelector(selectDislike);
  // const own = useSelector(selectOwn);
  const notices = useSelector(selectNotices);
  const [coaches, setCoaches] = useState([]);
  const query = useSelector(selectQuery);
  const [modal, setModal] = useState('');
  const [, setNewCategory] = useState();
  const [favorite, setFavorite] = useState(false);
  const [own, setOwn] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  // const newLocation =
  //   location.length > 5 ? location.slice(0, 4) + '...' : location;
  //   const old = getAge(birthday);
  // const coachLike = useSelector(selectLike).find(item => item._id === _id);
  // const coachDislike = useSelector(selectDislike).find(
  //   item => item._id === _id
  // );
  const favoriteItem = useSelector(selectFavorite).find(item => item._id === _id);
  const ownCoach = useSelector(selectOwn).find(item => item._id === _id);
  console.log('favoriteItem', favoriteItem)


  const feedback = Object.keys({like, dislike});

  const total = like + dislike;

  const countPositiveFeedbackPercentage = Math.round((like / total) * 100);

  const onLeaveFeedback = (value) => {
    switch (value) {
      case 'dislike':
        setDislike(prevDislike => prevDislike + 1)
        break;
        case 'like':
          setLike(prevLike => prevLike + 1);
          break;
        default:
          return;
      }
    };

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
  }, [category, setNewCategory]);

  useEffect(() => {
    if (ownCoach) {
      setOwn(true);
    }
    if (favoriteItem) {
      setFavorite(true);
    }
    // if (coachLike) {
    //   setFavStyle(true);
    // }
    // if (coachDislike) {
    //   setFavStyle(true);
    // }
  }, [favoriteItem, ownCoach]);

  // useEffect(() => {
  //   if (!query) {
  //     setSearchParams('');
  //     return;
  //   }
  //   setSearchParams({ query });
  // }, [setSearchParams, query]);

  // useEffect(() => {
  //   if(isLoggedIn) {
  //     dispatch(fetchFavorites(query));
  //   }  

  // }, [dispatch, isLoggedIn, query]);

  const handleAssessment = event => {
    event.preventDefault();
    
    if (favoriteItem && !isLoggedIn) {
      dispatch(deleteFromFavorite(_id));
      setFavorite(false);
      return;
    } 
    dispatch(addToFavorite(_id));
    setFavorite(false);
    return;
    

    // dispatch(addToFavorite(_id));
    
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
  };

  const handleLookDetails = () => {
    dispatch(showModal(true));

    openModal(_id, 'lookDetails');
  };


  const handleDeleteOwnCoach = event => {
    event.preventDefault();
    openModal(_id, 'remove');
    dispatch(showModal(true));
    if (isDeleted) {
      setOwn(false);
    }
  };


  return (
    <>
      <Thumb>
        <Photo src={avatar} />
        <FavoriteBtn
          type="button"
          className={favorite ? 'active' : null}
          onClick={handleAssessment}
        >
          <FiHeart />
        </FavoriteBtn>
        {/* {feedback.map(item => (
                  <ContainerFeedback key={nanoid()}>
                  <LikeBtn                  
                    type="button"
                    onClick={()=> onLeaveFeedback(item)}
                  >
                    <AiFillLike />
                  </LikeBtn>                 
                  <DislikeBtn
                    type="button"
                    onClick={()=> onLeaveFeedback(item)}
                  >
                    <AiFillDislike />
                  </DislikeBtn>
                  </ContainerFeedback>
        ))} */}
        {/* <RatingCoach
            positiveFidback={countPositiveFeedbackPercentage}
            /> */}
        {own && (
          <TrashBtn type="button" onClick={handleDeleteOwnCoach}>
            <FiTrash2 />
          </TrashBtn>
        )}
        {name && (<NameProgram>Назва програми: {name} </NameProgram>)}
        {fitnessWeigth && (<NameProgram>Назва програми: {fitnessWeigth}</NameProgram>)}
        {fitnessStrength && (<NameProgram>Назва програми: {fitnessStrength}</NameProgram>)}
        {fitnessWellness && (<NameProgram>Назва програми: {fitnessWellness}</NameProgram>)}
        <FeedbackOptions
          // options={feedback}
          // onLeaveFeedback={onLeaveFeedback}
          />
        <CoachProgramBtn onClick={handleLookDetails}>
          Ознайомитися
        </CoachProgramBtn>
      </Thumb>
    </>
  );
};
