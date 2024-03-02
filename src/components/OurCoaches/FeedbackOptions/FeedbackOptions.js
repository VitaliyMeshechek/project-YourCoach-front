import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, LikeBtn, DislikeBtn} from './FeedbackOptions.styled';
import { selectRatingCount, selectRating } from 'redux/counter/selectors';
import { RatingCoach } from '../RatingCoach/RatingCoach';
import { addRating, fetchRating } from 'redux/counter/operations';

import { useAuth } from 'hooks';


export const FeedbackOptions = ({id}) => {
    const { isLoggedIn } = useAuth();
    const [rating, setRating] = useState(false);
    console.log('rating', rating)

    const dispatch = useDispatch();
    // const counter = useSelector(selectRating);


    const counter = useSelector(selectRatingCount)
    console.log('counter', counter)
    // const counterArray = Object.values(counter)
    // console.log('counterArray', counterArray)

    useEffect(() => {
        dispatch(fetchRating());

    }, [ dispatch, isLoggedIn]);





  //   const result = counter.reduce(
  //     (count, item) => {
  //       if (item.like) {
  //         count.like += 1 
  //       } if (item.dislike) {
  //           count.dislike += 1
  //         } 
  //         if (item.total) {
  //           count.total = count.like + count.dislike
  //         } if (item.feedback) {
  //           count.feedback = Math.round((count.like / count.total) * 100)
  //         }
  //             console.log('item.like', item.like)
  //             console.log('item.dislike', item.dislike)
  //             console.log('item.feedback', item.feedback)
  //   return count;
  // },
  // { like: 0, dislike: 0, feedback: 0}
  // );
  // console.log('result', result)
  // const counterFilters = Object.freeze({
  //   like: "like",
  //   dislike: "dislike",
  // });

  const handleRating = (ratingId, like, dislike) => {

    // event.preventDefault();
    // switch (counter) {
    //   case 'like':
    //     return counter.like += 1;
    //     case 'dislike':
    //       return counter.dislike += 1;
    //       default: break;
    // }
    const totalLike = counter.like += 1;
    console.log('totalLike', totalLike)
    const totalDislike = counter.dislike += 1;
    console.log('totalDislike', totalDislike)
    const totalFidback = totalLike + totalDislike;
    console.log('totalFidback', totalFidback)

    counter.feedback = Math.round((totalLike / totalFidback) * 100)
    console.log('feedback', counter.feedback)
   
    if (ratingId !== id && !isLoggedIn) {
      dispatch(addRating({
        like: counter.like,
        dislike: counter.dislike,
    }));
      setRating(true);
    } 
      // dispatch(addRating({
      //   dislike: counter.dislike,
      // }));

  }; 


        return (
          <Container>
           <LikeBtn type="button" ><AiFillLike onClick={() => handleRating(counter.like)} />{counter.like}</LikeBtn>
           <DislikeBtn type="button" ><AiFillDislike onClick={() => handleRating(counter.dislike)}/>{counter.dislike}</DislikeBtn>
           <RatingCoach 
           positiveFidback={counter.feedback} 
           />
           </Container>
        );



  // return (
  //   <Container>
  //    <LikeBtn type="button" onClick={handleRating}><AiFillLike />{like}</LikeBtn>
  //    <DislikeBtn type="button" onClick={handleRating}><AiFillDislike />{dislike}</DislikeBtn>
  //    <RatingCoach 
  //    positiveFidback={feedback} 
  //    />
  //    </Container>
  // );
};