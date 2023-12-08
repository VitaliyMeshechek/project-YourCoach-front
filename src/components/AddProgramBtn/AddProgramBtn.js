// import PropTypes from 'prop-types';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { useWindowSize } from 'hooks/useResize';
import { Btn } from './AddProgramBtn.styled';
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from 'redux/auth/selectors';
import { useAuth } from 'hooks';

const AddProgramBtn = ({ text, path }) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const [screenWidth] = useWindowSize();

  const onAddBtnClick = e => {
    if (!isLoggedIn) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <Btn to={path} state={{ from: location }} onClick={onAddBtnClick}>
      {screenWidth < 768 && <MdOutlineFitnessCenter />}
      {text}
      {screenWidth >= 768 && <MdOutlineFitnessCenter />}
    </Btn>
  );
};

export default AddProgramBtn;
