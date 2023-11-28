// import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Backdrop, ModalWindow, CloseBtn, CloseIcon } from './ModalMenu.styled';

const modalContainer = document.getElementById('modal-root');

//додати у батьківський компонент (сторінку) наступний код:
// - state:
// const [isModalOpen, setIsModalOpen] = useState(false);

// - функцію:
// const toggleModal = () => {
//   setIsModalOpen(prevState => !prevState);
// };

// - приклад використання:
// {isModalOpen && (
//     <Modal toggleModal={toggleModal}>
//       {children}
//     </Modal>
//   );}

const Modal = ({ toggleModal, children }) => {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [toggleModal]);

  const onModalOpen = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <>
      <Backdrop onClick={onModalOpen}>
        <ModalWindow>
          <CloseBtn type="button" onClick={toggleModal}>
            <CloseIcon />
          </CloseBtn>
          {children}
        </ModalWindow>
      </Backdrop>
    </>,
    modalContainer
  );
};

export default Modal;
