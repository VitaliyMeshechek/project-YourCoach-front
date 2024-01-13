import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLike,
  selectDislike,
  selectNotices,
  selectRating,
  selectOwn,
  selectQuery,
} from 'redux/notices/selectors';
import {
  addToLike,
  addToDislike,
  deleteFromLike,
  deleteFromDislike,
  deleteUserNotice,
  fetchLike,
  fetchDislike,
  fetchNotices,
  fetchUsersNotices,
  fetchFavorites,
  addToFavorite,
  deleteFromFavorite,
} from 'redux/notices/operations';
import { OurCoachesItems } from '../OurCoachesItems/OurCoachesItems';
import { CategoriesList } from './OurCoachesList.styled';
import { useAuth } from 'hooks';
import { toast } from 'react-toastify';
import CoachProgramDetailsModal from 'components/ReusableComponents/ModalWindows/CoachProgramDetailsModal/CoachProgramDetailsModal';
import RemoveCoachProgramDetailsModal from 'components/ReusableComponents/ModalWindows/RemoveCoachProgramDetailsModal/RemoveCoachProgramDetailsModal';
import { PageError } from '../PageError/PageError';

const OurCoachesList = () => {
  const { isLoggedIn } = useAuth();
  const { categoryName } = useParams();

  const [activeNotice, setActiveNotice] = useState(null);
  const [modal, setModal] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const [assessment, setAssessment] = useState(null);
  const coachLike = useSelector(selectLike);
  const ratings = useSelector(selectRating);
  const coachDislike = useSelector(selectDislike);
  const own = useSelector(selectOwn);
  const notices = useSelector(selectNotices);
  const [coaches, setCoaches] = useState([]);
  const query = useSelector(selectQuery);
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  //   const favorits = useSelector(selectFavorite);
  // console.log('allCoaches', allCoaches);

  useEffect(() => {
    if (!query) {
      setSearchParams('');
      return;
    }
    setSearchParams({ query });
  }, [setSearchParams, query]);

  useEffect(() => {
    if (!activeNotice) {
      return;
    }
    // setAssessment(coachLike.find(item => item._id === activeNotice[0]._id)) ||
    //   setAssessment(
    //     coachDislike.find(item => item._id === activeNotice[0]._id)
    //   );
    setAssessment(ratings.find(item => item._id === activeNotice[0]._id));
  }, [activeNotice, coachLike, ratings, coachDislike]);

  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(fetchLike(query));
      // dispatch(fetchDislike(query));
      dispatch(fetchFavorites(query));
      dispatch(fetchUsersNotices(query));
    }
    dispatch(fetchNotices({ categoryName, query }));
  }, [categoryName, dispatch, isLoggedIn, query]);

  useEffect(() => {
    switch (categoryName) {
      case 'rating':
        setCoaches(ratings);
        // setAllCoaches(coachLike);
        // || setAllCoaches(coachDislike);
        break;
      case 'own':
        setCoaches(own);
        break;

      default:
        setCoaches(notices);
        break;
    }
  }, [categoryName, coachLike, coachDislike, ratings, notices, own]);

  if (!coaches) {
    return null;
  }

  // const handleDeleteProgram = () => {
  //   dispatch(deleteUserNotice(activeNotice[0]._id));
  // };

  const onDeleteOwn = () => {
    dispatch(deleteUserNotice(activeNotice[0]._id));
    setIsDeleted(true);
  };

  const openModal = (id, modalName) => {
    if (!id) {
      return;
    }
    switch (modalName) {
      case 'remove':
        setModal('remove');
        break;
      case 'lookDetails':
        setModal('lookDetails');
        break;
      default:
        break;
    }

    // const visiblePrograms = program
    //   ? program.filter(program => program.category === 'your program')
    //   : [];
    // console.log('visiblePrograms', visiblePrograms);
    const visiblePrograms = coaches
      ? coaches.filter(({ _id }) => _id === id)
      : [];

    // console.log('visiblePrograms', visiblePrograms);
    setActiveNotice(visiblePrograms);
  };

  const handleFavorite = e => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast('Sorry, this option is available only for authorized users');
      return;
    }
    // if (assessment) {
    //   dispatch(deleteFromLike(activeNotice[0]._id));
    //   // ||
    //   // dispatch(deleteFromDislike(activeNotice[0]._id));
    //   return;
    // }
    // dispatch(addToLike(activeNotice[0]._id));
    // ||
    // dispatch(addToDislike(activeNotice[0]._id));
    if (assessment) {
      dispatch(deleteFromFavorite(activeNotice[0]._id));
      return;
    }
    dispatch(addToFavorite(activeNotice[0]._id));
  };

  return (
    <>
      {coaches.length > 0 ? (
        <CategoriesList>
          {coaches.map(coach => (
            <OurCoachesItems
              coach={coach}
              key={coach._id}
              openModal={openModal}
              isDeleted={isDeleted}
            />
          ))}
          {modal === 'lookDetails' && (
            <CoachProgramDetailsModal
              handleFavorite={handleFavorite}
              details={activeNotice[0]}
            ></CoachProgramDetailsModal>
          )}
          {modal === 'remove' && (
            <RemoveCoachProgramDetailsModal
              approveHandle={onDeleteOwn}
              name={activeNotice[0].name}
            ></RemoveCoachProgramDetailsModal>
          )}
        </CategoriesList>
      ) : (
        <PageError />
      )}
    </>
  );
};

export default OurCoachesList;
