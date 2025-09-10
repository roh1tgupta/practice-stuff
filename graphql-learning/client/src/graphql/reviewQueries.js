import { gql } from '@apollo/client';

// Get reviews
export const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      rating
      comment
      user {
        id
        username
      }
      book {
        id
        name
      }
    }
  }
`;

export default GET_REVIEWS;
