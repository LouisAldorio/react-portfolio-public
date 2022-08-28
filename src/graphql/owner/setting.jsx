import {gql} from '@apollo/client'

const SETTING_QUERY = gql`
    query SettingManagement {
        gallery{
            tabs_photos{
                id
                category
                on_duty
            }
        }
        about{
            education{
                id
                title
                logo
                on_duty
            }
        }
    }
`

const SETTING_CREATE_IMAGE_CATEGORY = gql`
    mutation CreateImageCategory(
        $category: String!
    ) {
        gallery{
            create_image_category(input:{
                category: $category
            }){
                id
                category
                on_duty
            }
        }
    }
`


const SETTING_DELETE_IMAGE_CATEGORY = gql`
    mutation DeleteImageCategoryByID(
        $id: Int!
    ){
        gallery{
            delete_image_category(id: $id)
        }
    }
`

const SETTING_CREATE_EDUCATION_CATEGORY = gql`
    mutation CreateEducationCategory(
        $logo: String!
        $title: String!
    ) {
        about{
            create_education_category(input: {
                logo: $logo
                title: $title
            }){
                id			
                title
                logo
                on_duty
            }
        }
    }
`

const SETTING_DELETE_EDUCATION_CATEGORY = gql`
    mutation DeleteEducationCategoryByID(
        $id: Int!
    ) {
        about{
            delete_education_category(id: $id)
        }
    }
`

export {
    SETTING_QUERY,
    SETTING_CREATE_IMAGE_CATEGORY,
    SETTING_DELETE_IMAGE_CATEGORY,
    SETTING_CREATE_EDUCATION_CATEGORY,
    SETTING_DELETE_EDUCATION_CATEGORY
}