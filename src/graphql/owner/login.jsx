import {gql} from '@apollo/client'

const OWNER_LOGIN = gql`
    mutation Login(
        $username: String!
        $password: String!
    ){
        login(
            input:{
                username: $username
                password: $password
            }
        ){
            username
            access_token
        }
    }
`

export default OWNER_LOGIN