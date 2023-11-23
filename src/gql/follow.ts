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
            avatar
        }
    }
`);

export const GET_FOLLOWINGS = gql(`#graphql
    query getFollowings($username: String!){
        getFollowings(username: $username){
            id
            name
            username
            avatar
        }
    }
`);

export const GET_NOTFOLLOWINGS = gql(`#graphql
    query getNotFollowings {
        getNotFollowings {
            id
            username
            name
            avatar
        }
    }
`);
