import { Container, Response } from './RatingCoach.styled';


export const RatingCoach = ({positiveFidback}) => {
   return <Container>
    <Response>Рейтинг: {positiveFidback} %</Response>
   </Container>
}