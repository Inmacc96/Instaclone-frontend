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
      website
      description
      avatar
    }
}
`);

export const GENERATE_UPLOAD_URL = gql(`#graphql
  query generateUploadUrl($folder: String!, $uploadType: UploadType!) { 
    generateUploadUrl(folder: $folder, uploadType: $uploadType) {
      timestamp
      signature
      public_id
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
        id
        email
        website
        description
      }
  }
`);

export const SEARCH_USERS = gql(`#graphql
  query searchUsers($search: String!) {
    searchUsers(search: $search) {
      id
      name
      username
      avatar
    }
  }
`);
