import {gql} from '@apollo/client'

const GET_HOME_INFO = gql`
    query GetHomeInfo {
        home{
            get_info{
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
    GET_HOME_INFO
}