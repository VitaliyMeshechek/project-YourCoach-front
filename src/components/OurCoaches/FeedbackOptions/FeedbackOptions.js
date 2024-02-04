import { nanoid } from 'nanoid'
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Container, LikeBtn, DislikeBtn} from './FeedbackOptions.styled';
import { selectRating } from 'redux/notices/selectors';
import { addDislike, addLike } from 'redux/notices/operations';
import { RatingCoach } from '../RatingCoach/RatingCoach';



export const FeedbackOptions = ({options, onLeaveFeedback}) => {
    const rating = useSelector(selectRating);
    const dispatch = useDispatch();
      
        const count = rating.reduce(
          (acc, item) => {
            if (item.like) {
              acc.like += 1;
            } 
            if (item.dislike) {
              acc.dislike += 1;
            }
            return acc;
          },
          { like: 0, dislike: 0 }
        );

        const handleLike = (text) => {
            dispatch(addLike(text));
        }

        const handleDislike = (text) => {
            dispatch(addDislike(text));
        }

        const total = count.like + count.dislike;

        const countPositiveFeedbackPercentage = Math.round((count.like / total) * 100);
    // const visibleRating = onLeaveFeedback(rating);
  return (
    <Container>
     <LikeBtn type="button" onClick={handleLike}><AiFillLike />{count.like}</LikeBtn>
     <DislikeBtn type="button" onClick={handleDislike}><AiFillDislike />{count.dislike}</DislikeBtn>
     <RatingCoach
            positiveFidback={countPositiveFeedbackPercentage}
            />
     </Container>
  );
};