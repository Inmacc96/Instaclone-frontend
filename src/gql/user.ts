import { gql } from "../__generated__/gql";

export const SIGNUP_USER = gql(`#graphql
  mutation newUser($input: UserInput!) {
    newUser(input: $input) {
      id
      name
      email
      username
      createdAt
    }
  }
`);
