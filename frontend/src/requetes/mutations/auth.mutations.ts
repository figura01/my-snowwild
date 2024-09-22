import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Mutation($infos: InputRegister!) {
  register(infos: $infos) {
   email
  }
}
`;