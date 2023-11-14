import { gql } from "../__generated__";

export const PUBLISH = gql(`#graphql
    mutation publish($urlFile: String!, $typeFile: String!) {
        publish(urlFile: $urlFile, typeFile: $typeFile) {
            id
            idUser
            urlFile
            typeFile
            createdAt
        }
    }
`);

export const GET_POSTS = gql(`#graphql
    query getPosts($username: String!){
        getPosts(username: $username) {
            id
            idUser
            urlFile
            typeFile
            createdAt
        }
    }
`);
