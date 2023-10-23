import { gql } from "../__generated__";

export const IS_FOLLOWING = gql(`#graphql
    query isFollowing($username: String!){
        isFollowing(username: $username)
    }
`);
