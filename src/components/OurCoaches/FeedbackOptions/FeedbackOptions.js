import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, LikeBtn, DislikeBtn} from './FeedbackOptions.styled';
import { selectRatingCount, selectRating } from 'redux/counter/selectors';
import { RatingCoach } from '../RatingCoach/RatingCoach';
import { addRating, fetchRating } from 'redux/counter/operations';

import { useAuth } from 'hooks';


export const FeedbackOptions = ({_id}) => {
  // const [like, setLike] = useState(0);
  // const [dislike, setDislike] = useState(0);
    const { isLoggedIn } = useAuth();
    const [rating, setRating] = useState(false);
    console.log('rating', rating)
    // console.log('id', id)

    const dispatch = useDispatch();
    // const counter = useSelector(selectRating);

    const ratingItem = useSelector(selectRating).find(item => item._id === _id);
    console.log('ratingItem', ratingItem)
    const counter = useSelector(selectRatingCount)
    console.log('counter', counter)
    const counterArray = Object.keys(counter)
    console.log('counterArray', counterArray)

    useEffect(() => {
        dispatch(fetchRating());

    }, [ dispatch, isLoggedIn]);


    useEffect(() => {
      if (ratingItem) {
        setRating(true);
      }
    }, [ratingItem]);


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
  //  if() {}
  const total = counter.like + counter.dislike;
  console.log('total', total)

  const feedback = Math.round((counter.like / total) * 100)
  console.log('feedback', feedback) 
  // const totalLike = counter.like += 1;
  // console.log('totalLike', totalLike)
  // const totalDislike = counter.dislike += 1;
  // console.log('totalDislike', totalDislike)
  // let totalFidback = totalLike + totalDislike;
  // console.log('totalFidback', totalFidback)

  // const feedback = Math.round((totalLike / totalFidback) * 100)
  // console.log('feedback', feedback) 

  const handleRating = (value) => { 
    // switch (value) {
    //   case 'like':
    //     setBad(prevBad => prevBad + 1)
    //     break;
    //     case 'dislike':
    //       setGood(prevGood => prevGood + 1);
    //       break;
    //     default:
    //       return;
    //   } 

    const rating = {
      id: _id,
      like: counter.like + 1,
      dislike: counter.dislike
    }
    if (counter.like && !isLoggedIn) {

      dispatch(addRating(rating.id, rating.like));
      setRating(true);
      return;
    } 

      // dispatch(addRating(rating.id, rating.dislike));
      // setRating(true);
      // return;
  }; 

  // const handleRatingDislike = () => {  
  //   if (!isLoggedIn) {
  //     const rating = {
  //       id: _id,
  //       dislike: totalDislike
  //     }
  //     dispatch(addRating(rating.id, rating.dislike));
  //     setRating(true);
  //   } 
  // };


        return (
          <Container>
           <LikeBtn type="button" ><AiFillLike onClick={handleRating} />{counter.like}</LikeBtn>
           <DislikeBtn type="button" ><AiFillDislike onClick={handleRating}/>{counter.dislike}</DislikeBtn>
           <RatingCoach 
           positiveFidback={feedback} 
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