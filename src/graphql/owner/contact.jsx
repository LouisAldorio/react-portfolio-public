import {gql} from '@apollo/client'

const UPDATE_SOCIAL_MEDIA_INFO = gql`
    mutation UpdateSocialMediaInfo(
        $id: Int!
        $phone: String!
        $mail: String!
        $location: String!
        $instagram: String!
        $whatsapp: String!
    ) {
        contact{
            update_social_media_info(input:{
                id: $id
                phone: $phone
                mail: $mail
                location: $location
                instagram: $instagram
                whatsapp: $whatsapp
            }){
                id
                phone
                mail
                location
                instagram
                whatsapp
            }
        }
    }
`

const GET_SUBSCRIBER_MESSAGE = gql`   
    query GetMessages {
        contact{
            messages{
                id
                message
                subscriber{
                    id
                    first_name
                    last_name
                    email
                    phone_number
                }
            }
        }
    }
`

export {
    UPDATE_SOCIAL_MEDIA_INFO,
    GET_SUBSCRIBER_MESSAGE
}