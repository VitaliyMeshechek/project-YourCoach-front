import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLike,
  selectDislike,
  selectNotices,
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
} from 'redux/noticesPage/operations';
import { OurCoachesItems } from '../OurCoaches/OurCoachesItems';
import { CategoriesList } from './OurCoachesList.styled';
import { useAuth } from 'hooks';
// import { toast } from 'react-toastify';
import RemoveModal from 'components/ReusableComponents/Modal/RemoveModal/RemoveModal';
import { ParkedPage } from '../ParkedPage/ParkedPage';
import CoachProgramDetailsModal from 'components/ReusableComponents/ModalWindows/CoachProgramDetailsModal/CoachProgramDetailsModal';

const OurCoachesList = () => {
  const { isLoggedIn } = useAuth();
  const { categoryName } = useParams();

  const [activeNotice, setActiveNotice] = useState(null);
  const [modal, setModal] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const [assessment, setAssessment] = useState(null);
  const coachLike = useSelector(selectLike);
  const coachDislike = useSelector(selectDislike);
  const own = useSelector(selectOwn);
  const notices = useSelector(selectNotices);
  const [allCoaches, setAllCoaches] = useState([]);
  const query = useSelector(selectQuery);
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  //   const favorits = useSelector(selectFavorite);

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
    setAssessment(coachLike.find(item => item._id === activeNotice[0]._id)) ||
      setAssessment(
        coachDislike.find(item => item._id === activeNotice[0]._id)
      );
  }, [activeNotice, coachLike, coachDislike]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchLike(query));
      dispatch(fetchDislike(query));
      dispatch(fetchUsersNotices(query));
    }
    dispatch(fetchNotices({ categoryName, query }));
  }, [categoryName, dispatch, isLoggedIn, query]);

  useEffect(() => {
    switch (categoryName) {
      case 'rating':
        setAllCoaches(coachLike) || setAllCoaches(coachDislike);
        break;
      case 'forCoach':
        setAllCoaches(own);
        break;

      default:
        setAllCoaches(notices);
        break;
    }
  }, [categoryName, coachLike, coachDislike, notices, own]);

  if (!allCoaches) {
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

    const filterCoaches = allCoaches.filter(({ _id }) => id === _id);
    setActiveNotice(filterCoaches);
  };

  const handleFavorite = e => {
    e.preventDefault();
    // if (!isLoggedIn) {
    //   toast('Sorry, this option is available only for authorized users');
    //   return;
    // }
    if (assessment) {
      dispatch(deleteFromLike(activeNotice[0]._id)) ||
        dispatch(deleteFromDislike(activeNotice[0]._id));
      return;
    }
    dispatch(addToLike(activeNotice[0]._id)) ||
      dispatch(addToDislike(activeNotice[0]._id));
  };

  return (
    <>
      {allCoaches.length > 0 ? (
        <CategoriesList>
          {allCoaches.map(coach => (
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
            <RemoveModal
              approveHandle={onDeleteOwn}
              title={activeNotice[0].title}
            ></RemoveModal>
          )}
        </CategoriesList>
      ) : (
        <ParkedPage />
      )}
    </>
  );
};

export default OurCoachesList;
