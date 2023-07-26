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

export const AUTH_USER = gql(`#graphql
  mutation authUser($input: AuthInput!) {
    authUser(input: $input) {
      token
    }
  }
`);

export const GET_USER = gql(`#graphql
  query getUser($id: ID, $username: String) {
    getUser(id: $id, username: $username) {
      id
      name
      username
      email
      siteWeb
      description
      avatar
    }
}
`);
