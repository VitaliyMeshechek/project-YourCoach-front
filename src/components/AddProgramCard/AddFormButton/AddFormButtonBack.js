import { BackButton, BackLink } from './AddFormButton.styled';
import { BsArrowLeft } from 'react-icons/bs';

const AddFormButtonBack = ({ text, clickHandler, type, isLink, path }) => {
  if (isLink) {
    return (
      <BackLink onClick={clickHandler} type={type} to={path}>
        <BsArrowLeft
          style={{ fill: '#54ADFF', width: '16px', height: '12px' }}
        />
        {text}
      </BackLink>
    );
  }

  return (
    <BackButton onClick={clickHandler} type={type}>
      <BsArrowLeft style={{ fill: '#54ADFF', width: '16px', height: '12px' }} />
      {text}
    </BackButton>
  );
};

export default AddFormButtonBack;
