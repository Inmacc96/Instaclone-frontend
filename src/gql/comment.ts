import { gql } from "../__generated__";

export const ADD_COMMENT = gql(`#graphql
    mutation addComment($input: CommentInput!) {
        addComment(input: $input) {
          id
          idUser {
            username
            avatar
          }
          comment
        }
  }
`);

export const GET_COMMENTS = gql(`#graphql
    query getComments($idPost: ID!){
      getComments(idPost: $idPost){
        id
        idUser{
          username
          avatar
        }
        comment
      }
}
`);
