import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLike,
  selectDislike,
  selectNotices,
  selectFavorite,
  selectOwn,
  selectQuery,
} from 'redux/notices/selectors';
import {
  // addToLike,
  // addToDislike,
  // deleteFromLike,
  // deleteFromDislike,
  deleteUserNotice,
  // fetchLike,
  // fetchDislike,
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

  // const programs = useSelector(selectNotices);

  const { isLoggedIn } = useAuth();
  const { categoryName } = useParams();

  const [activeNotice, setActiveNotice] = useState(null);
  const [modal, setModal] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const [assessment, setAssessment] = useState(null);
  // const coachLike = useSelector(selectLike);
  const favoriteCoach = useSelector(selectFavorite);
  // const coachDislike = useSelector(selectDislike);
  const own = useSelector(selectOwn);
  const notices = useSelector(selectNotices);
  const [coaches, setCoaches] = useState([]);
  const query = useSelector(selectQuery);
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  // const showRating = useSelector(selectRating);

  console.log('coaches', coaches);

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
    setAssessment(favoriteCoach.find(item => item._id === activeNotice[0]._id));
    console.log('activeNotice', activeNotice);
  }, [activeNotice, favoriteCoach,]);

  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(fetchLike(query));
      // dispatch(fetchDislike(query));
      dispatch(fetchUsersNotices(query));
    }
    dispatch(fetchFavorites(query));
    dispatch(fetchNotices({ categoryName, query }));
  }, [categoryName, dispatch, isLoggedIn, query]);

  useEffect(() => {
    switch (categoryName) {
      case 'favorite':
        setCoaches(favoriteCoach);
        break;
      case 'own':
        setCoaches(own);
        break;

      default:
        setCoaches(notices);
        break;
    }
  }, [categoryName, favoriteCoach, notices, own]);

  if (!coaches) {
    return null;
  }

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

    const filterCoach = coaches.filter(({ _id }) => id === _id);
    console.log('filterCoach', filterCoach);
    setActiveNotice(filterCoach);
  };

  const handleFavorite = (event) => {
    event.preventDefault();

    if (assessment) {
      dispatch(deleteFromFavorite(activeNotice[0]._id));
      return;
    }
    dispatch(addToFavorite(activeNotice[0]._id));
  };

  return (
    <>
    {coaches.length > 0 ?
      <CategoriesList>
        {coaches.map(coach => (
          <OurCoachesItems
            key={coach._id}
            coach={coach}
            openModal={openModal}
            isDeleted={isDeleted}
          />
        ))}
                {
            modal === 'lookDetails' && (
              <CoachProgramDetailsModal
                handleFavorite={handleFavorite}
                coach={activeNotice[0]}
              ></CoachProgramDetailsModal>
            )
        }
        {modal === 'remove' && (
          <RemoveCoachProgramDetailsModal
            approveHandle={onDeleteOwn}
            // title={activeNotice[0].title}
          ></RemoveCoachProgramDetailsModal>
        )}
      </CategoriesList>
      :
      <PageError/>}
    </>
  );
};

export default OurCoachesList;
