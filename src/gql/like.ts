import { gql } from "../__generated__";

export const LIKE = gql(`#graphql
    mutation like($idPost: ID!){
        like(idPost: $idPost)
    }
`)

export const IS_LIKE = gql(`#graphql
    query isLike($idPost: ID!){
        isLike(idPost: $idPost)
    }
`)