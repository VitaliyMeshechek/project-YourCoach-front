import { Image, NotFoundSection, Title } from './PageError.styled';
import pageErrorImg from '../../../images/FitnessErrorPage (1).png';

export const PageError = () => {
  return (
    <>
      <NotFoundSection>
        <Title>
          Ooops!
          <br /> Спробуйте повторити пошук!
        </Title>
        <Image src={pageErrorImg} />
      </NotFoundSection>
    </>
  );
};
