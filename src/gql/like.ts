import { gql } from "../__generated__";

export const IS_LIKE = gql(`#graphql
    query isLike($idPost: ID!){
        isLike(idPost: $idPost)
    }
`)

export const LIKE = gql(`#graphql
    mutation like($idPost: ID!){
        like(idPost: $idPost)
    }
`)

export const DISLIKE = gql(`#graphql
    mutation dislike($idPost: ID!){
        dislike(idPost: $idPost)
    }
`)
