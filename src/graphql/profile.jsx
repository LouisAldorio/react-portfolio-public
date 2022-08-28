import {gql} from '@apollo/client'

const FETCH_PROFILE_PAGE_QUERY = gql`
    query GetProfilePageInfo(
        $status: [Int]
    ) {
        profile{
            programming_languages(status: $status){
                id
                name
                value
                color
                total
            }
            skills(status: $status){
                id
                logo
                name
                state
            }
        }
    }
`

export default FETCH_PROFILE_PAGE_QUERY