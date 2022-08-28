import {gql} from '@apollo/client'

const FETCH_GALLERY_CONFIG_DATA_QUERY = gql`
    query GetGalleryConfigData {
        gallery{
            tabs_photos{
                id
                category
                on_duty
            }
            carousel_photos {
                id
                src
                caption
                on_duty
            }
            photos_without_category{
                id
                src
                width
                height
                images_category_id
                category{
                    category
                }
                on_duty
            }
            videos {
                id
                src
                on_duty
            }
            audios {
                id
                title
                author
                src
                cover
                on_duty
            }
        }
    }
`

const UPDATE_IMAGE_BY_ID = gql`
    mutation UpdateImage(
        $id: Int!
        $src: String!
        $width: Int!
        $height: Int!
        $images_category_id: Int!
        $on_duty: Int!
    ){
        gallery{
            update_image(input: {
                id: $id
                src: $src
                width: $width
                height: $height
                images_category_id: $images_category_id
                on_duty: $on_duty
            }){
                id
                src
                width
                height
                images_category_id
                category{
                    category
                }
                on_duty
            }
        }
    }
`

const CREATE_TOP_IMAGE = gql`
    mutation CreateTopImage (
        $src: String!
        $caption: String!
    ){
        gallery{
            create_top_image(input:{
                src: $src
                caption: $caption
            }){
                id
                src
                caption
                on_duty
            }
        }
    }
`

const UPDATE_TOP_IMAGE_BY_ID = gql`
    mutation UpdateTopImageByID(
        $id: Int!
        $src: String!
        $caption: String!
        $on_duty: Int!
    ) {
        gallery{
            update_top_image(input:{
                id: $id
                src: $src
                caption: $caption
                on_duty: $on_duty
            }){
                id
                src
                caption
                on_duty
            }
        }
    }
`

const UPDATE_VIDEO_BY_ID = gql`
    mutation UpdateVideoByID(
        $id: Int!
        $src: String!
        $on_duty: Int!
    ) {
        gallery{
            video{
                update(input:{
                    id: $id
                    src: $src
                    on_duty: $on_duty
                }){
                    id
                    src
                    on_duty
                }
            }
        }
    }
`

const CREATE_VIDEO = gql`   
    mutation CreateVideo(
        $src: String!
    ) {
        gallery{
            video{
                create(input:{
                    src: $src
                }){
                    id
                    src
                    on_duty
                }
            }
        }
    }
`

const CREATE_IMAGE = gql`
    mutation CreateImageByCategory (
        $src: String!
        $width: Int!
        $height: Int!
        $images_category_id: Int!
    ){
        gallery {
            create_image(input: { 
                src: $src, 
                width: $width, 
                height: $height, 
                images_category_id: $images_category_id }
            ) {
                id
                src
                width
                height
                images_category_id
                category {
                    category
                }
                on_duty
            }
        }
    }
`

const CREATE_AUDIO = gql`
    mutation CreateAudio(
        $title: String!
        $author: String!
        $src: String!
        $cover: String!
    ) {
        gallery{
            audio{
                create(input:{
                    title: $title
                    author: $author
                    src: $src
                    cover: $cover
                }){
                    id
                    title
                    author
                    src
                    cover
                    on_duty
                }
            }
        }
    }
`

const UPDATE_AUDIO_BY_ID = gql`
    mutation UpdateAudio (
        $id: Int!
        $title: String!
        $author: String!
        $src: String!
        $cover: String!
        $on_duty: Int!
    ){
        gallery{
            audio{
                update(input:{
                    id: $id
                    title: $title
                    author: $author
                    src: $src
                    cover: $cover
                    on_duty: $on_duty
                }){
                    id
                    title
                    author
                    src
                    cover
                    on_duty
                }
            }
        }
    }
`

const DELETE_IMAGE_BY_ID = gql`
    mutation DeleteImageByID(
        $id: Int!
    ) {
        gallery{
            delete_image(id: $id)
        }
    }
`

const DELETE_TOP_IMAGE_BY_ID = gql`
    mutation DeleteTopImage(
        $id: Int!
    ) {
        gallery{
            delete_top_image(id: $id)
        }
    }
`

const DELETE_VIDEO_BY_ID = gql`
    mutation DeleteVideo(
        $id: Int!
    ) {
        gallery{
            video{
                delete(id: $id)
            }
        }
    }
`

const DELETE_AUDIO_BY_ID = gql`
    mutation DeleteAudio(
        $id: Int!
    ) {
        gallery{
            audio{
                delete(id: $id)
            }
        }
    }
`

const UPDATE_IMAGE_CATEGORY_BY_ID = gql`
    mutation UpdateImageCategoryById(
        $id: Int!
        $category: String!
        $on_duty: Int!
    ) {
        gallery{
            update_image_category(input:{
                id: $id
                category: $category
                on_duty: $on_duty
            }){
                id
                category
                on_duty
            }
        }
    }
`

const UPDATE_EDUCATION_CATEGORY_BY_ID = gql`
    mutation UpdateEducationCategoryById(
        $id: Int!
        $logo: String!
        $title: String!
        $on_duty: Int!
    ) {
        about{
            update_education_category(input:{
                id: $id
                logo: $logo
                title: $title
                on_duty: $on_duty
            }){
                id
                logo
                title
                on_duty
            }
        }
    }
`

export {
    FETCH_GALLERY_CONFIG_DATA_QUERY,
    UPDATE_IMAGE_BY_ID,
    CREATE_TOP_IMAGE,
    UPDATE_TOP_IMAGE_BY_ID,
    UPDATE_VIDEO_BY_ID,
    CREATE_VIDEO,
    CREATE_IMAGE,
    CREATE_AUDIO,
    UPDATE_AUDIO_BY_ID,
    DELETE_IMAGE_BY_ID,
    DELETE_TOP_IMAGE_BY_ID,
    DELETE_VIDEO_BY_ID,
    DELETE_AUDIO_BY_ID,
    UPDATE_IMAGE_CATEGORY_BY_ID,
    UPDATE_EDUCATION_CATEGORY_BY_ID
}