import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Container, LikeBtn, DislikeBtn} from './FeedbackOptions.styled';
import { selectLike, selectDislike } from 'redux/counter/selectors';
import { RatingCoach } from '../RatingCoach/RatingCoach';
import { bad, good } from 'redux/counter/slice';


export const FeedbackOptions = () => {
    const like = useSelector(selectLike);
    const dislike = useSelector(selectDislike);
    const dispatch = useDispatch();

    const total = like + dislike;

    const countPositiveFeedbackPercentage = Math.round((like / total) * 100);

  return (
    <Container>
     <LikeBtn type="button" onClick={() => dispatch(good())}><AiFillLike /></LikeBtn>
     <DislikeBtn type="button" onClick={() => dispatch(bad())}><AiFillDislike /></DislikeBtn>
     <RatingCoach positiveFidback={countPositiveFeedbackPercentage} />
     </Container>
  );
};