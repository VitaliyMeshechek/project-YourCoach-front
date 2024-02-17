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

    useEffect(() => {
        dispatch(fetchRating());

    }, [ dispatch, isLoggedIn]);
   




    // const countObjLike = ratingItem.like
    // // const countObjLike = Object.keys(ratingItem).length
    // console.log('countObjLike', countObjLike)
    // const countObjDislike = ratingItem.like
    // console.log('countObjDislike', countObjDislike)
    
    // const totalLike = counter.like += 1;
    // const totalDislike = counter.dislike += 1;
    const total = counter.like += 1;
    console.log('total', total)

    counter.feedback = Math.round((counter.like / total) * 100)
    console.log('feedback', counter.feedback)

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

  const handleRating = () => {
    // event.preventDefault();
   
    if (!isLoggedIn) {
      dispatch(addRating(id));
      setRating(true);
    } 
    // if (counter.dislike && !isLoggedIn) {
    //   dispatch(addRating(counter.dislike));
    //   setRating(true);
    // } 
  }; 

        return (
          <Container>
           <LikeBtn type="button" ><AiFillLike onClick={() => handleRating()} />{counter.like}</LikeBtn>
           <DislikeBtn type="button" ><AiFillDislike onClick={() => handleRating()}/>{counter.dislike}</DislikeBtn>
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