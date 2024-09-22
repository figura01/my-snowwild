import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation Mutation($data: CreateReservationInput!) {
    createReservation(data: $data) {
      start_date
      end_date
      user {
        id
      }
      reservationMaterials {
        material {
          id
        }
        quantity
        size
      }
    }
  }
`;

// mutation Mutation($data: CreateReservationInput!) {
//   createReservation(data: $data) {
//     start_date
//     end_date
//     user {
//       id
//     }
//     reservationMaterials {
//       material {
//         id
//       }
//       quantity
//       size
//     }
//   }
// }
