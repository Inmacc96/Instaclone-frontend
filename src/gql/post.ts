import { gql } from "../__generated__";

export const PUBLISH = gql(`#graphql
    mutation publish($urlFile: String!, $typeFile: String!) {
        publish(urlFile: $urlFile, typeFile: $typeFile) {
            idUser
            urlFile
            typeFile
            createdAt
        }
}
`);
