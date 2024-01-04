import { useSelector } from 'react-redux';
import { selectProgram } from '../redux/user/selectors';

export const useProgram = () => {
  const program = useSelector(selectProgram);
  console.log(program);
  return {
    program,
  };
};
