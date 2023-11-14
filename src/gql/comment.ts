import { gql } from "../__generated__";

export const ADD_COMMENT = gql(`#graphql
    mutation addComent($input: CommentInput!) {
        addComment(input: $input) {
        id
        idPost
        idUser
        comment
        createdAt
        }
  }
`);
