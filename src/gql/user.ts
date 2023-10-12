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

export const GENERATE_UPLOAD_URL = gql(`#graphql
  query generateUploadUrl($folder: String) { 
    generateUploadUrl(folder: $folder) {
      timestamp
      signature
    }
  }
`);

export const UPDATE_AVATAR = gql(`#graphql
  mutation updateAvatar($urlImage: String!){
    updateAvatar(urlImage: $urlImage){
      id
      avatar
    }
}
`);

export const DELETE_AVATAR = gql(`#graphql
  mutation deleteAvatar {
    deleteAvatar {
      id
      avatar
    }
  }
`);

export const UPDATE_USER = gql(`#graphql
  mutation updateUser($input: UserUpdateInput!){
      updateUser(input: $input){
          name,
          username,
          email,
          password
      }
  }
`);
