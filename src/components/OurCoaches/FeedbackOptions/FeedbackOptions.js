import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Container, LikeBtn, DislikeBtn} from './FeedbackOptions.styled';
import { selectRatingCount } from 'redux/counter/selectors';
import { RatingCoach } from '../RatingCoach/RatingCoach';
import { addRating } from 'redux/counter/operations';

import { useAuth } from 'hooks';


export const FeedbackOptions = ({id}) => {
    const { isLoggedIn } = useAuth();

    const dispatch = useDispatch();
    const { like, dislike } = useSelector(selectRatingCount);

    // const ratingItem = useSelector(selectRating).find(item => item._id === id);    

    const handleRating = event => {
      event.preventDefault();
      
      if (!isLoggedIn) {
        dispatch(addRating(id));
      } 
    };
    
    const total = like + dislike

    const feedback = Math.round((like / total) * 100)

  return (
    <Container>
     <LikeBtn type="button" onClick={handleRating}><AiFillLike />{like}</LikeBtn>
     <DislikeBtn type="button" onClick={handleRating}><AiFillDislike />{dislike}</DislikeBtn>
     <RatingCoach positiveFidback={feedback} />
     </Container>
  );
};