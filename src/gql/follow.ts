import { gql } from "../__generated__";

export const IS_FOLLOWING = gql(`#graphql
    query isFollowing($username: String!){
        isFollowing(username: $username)
    }
`);

export const FOLLOW_USER = gql(`#graphql
    mutation followUser($username: String!){
        follow(username: $username)
    }
`);
