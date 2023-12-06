import { NextButton } from './AddFormButton.styled';

const AddFormButtonNext = ({
  text,
  icon,
  clickHandler,
  filled,
  short,
  type,
  isDisabled,
}) => {
  return (
    <NextButton
      type={type}
      onClick={clickHandler && (() => clickHandler(false))}
      filled={filled}
      short={short}
      disabled={isDisabled}
    >
      {text}
      {icon}
    </NextButton>
  );
};

export default AddFormButtonNext;
