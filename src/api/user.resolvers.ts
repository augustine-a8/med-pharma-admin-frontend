import { gql } from "@apollo/client";

export const GET_ALL_PATIENTS = gql`
  query GetAllPatients {
    getAllPatients {
      id
      email
      name
    }
  }
`;
