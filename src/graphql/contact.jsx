import {gql} from '@apollo/client'

const FETCH_SOCIAL_MEDIA_INFO = gql`
    query GetSocialMediaObject {
        contact{
            social_media_info{
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


const CREATE_NEW_MESSAGE_AND_SUBSCRIBE = gql`
    mutation SendMessage(
        $first_name: String!
        $last_name: String!
        $email: String!
        $message: String!
        $phone_number: String!
    ) {
        contact {
            mail(
                input: {
                    first_name: $first_name
                    last_name: $last_name
                    email: $email
                    message: $message
                    phone_number: $phone_number
                }
            )
        }
    }
`
export { 
    FETCH_SOCIAL_MEDIA_INFO,
    CREATE_NEW_MESSAGE_AND_SUBSCRIBE
 }