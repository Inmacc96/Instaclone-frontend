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

export const UNFOLLOW_USER = gql(`#graphql
    mutation unFollowUser($username: String!){
        unFollow(username: $username)
    }
`);

export const GET_FOLLOWERS = gql(`#graphql
    query getFollowers($username: String!){
        getFollowers(username: $username){
            id
            name
            username
            email
            avatar
        }
    }
`);
