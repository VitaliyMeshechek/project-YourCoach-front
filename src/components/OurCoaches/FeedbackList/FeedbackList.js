// import { useSelector } from "react-redux";
// import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions.js';
// import { selectRatingCount } from 'redux/counter/selectors';


// export const FeedbackList = () => {
//   const counter = useSelector(selectRatingCount)
  

//   const counters = Object.keys(counter)
//   console.log('FeedbackList', counters)
//   // console.log('like', counters)
//   return (
//     <div>
//       {counters.map(item => (
//         <div key={item.id}>
//           <FeedbackOptions like={item.like} dislike={item.dislike} feedback={item.feedback}/>
//         </div>
//         ))}
//     </div>
//   );
// };