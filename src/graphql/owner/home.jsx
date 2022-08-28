import {gql} from '@apollo/client'

const UPDATE_HOME_INFO = gql`
    mutation UpdateHomeInfo(
        $id: Int!
        $logo: String!
        $profession: String!
        $title: String!
        $description: String!
    ) {
        home{
            update(input:{
                id: $id
                logo: $logo
                profession: $profession
                title: $title
                description: $description
            }){
                id
                logo
                profession
                title
                description
            }
        }
    }
`

export {
    UPDATE_HOME_INFO
}