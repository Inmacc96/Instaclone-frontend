import { gql } from "../__generated__";

export const LIKE = gql(`#graphql
    mutation like($idPost: ID!){
        like(idPost: $idPost)
    }
`)