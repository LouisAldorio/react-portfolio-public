import {gql} from '@apollo/client'

const FETCH_GALLERY_IMAGES_QUERY = gql`
    query GetGalleryImages(
        $status: [Int]
        $nodeStatus: [Int!]!
    ) {
        gallery{
            carousel_photos(status: $status){
                id
                src
                caption
                sizes{
                    small
                    medium
                    large
                    extra_large
                }
            }
            tabs_photos(status: $status){
                id
                category
                photos(status: $nodeStatus){
                    src
                    width
                    height
                    sizes{
                        small
                        medium
                        large
                        extra_large
                    }
                }
            }
        }
    }
`


const FETCH_GALLERY_AUDIOS_QUERY = gql`
    query GetGalleryAudios(
        $status: [Int]
    ) {
        gallery{
            audios(status: $status){
                id
                title
                author
                src
                cover
                sizes{
                    small
                    medium
                    large
                    extra_large
                }
            }
        }
    }
`

const FETCH_GALLERY_VIDEOS_QUERY = gql`
    query GetGalleryVideos(
        $status: [Int]
    ) {
        gallery{
            videos(status: $status){
                id
                src
            }
        }
    }
`

export {FETCH_GALLERY_IMAGES_QUERY,FETCH_GALLERY_AUDIOS_QUERY,FETCH_GALLERY_VIDEOS_QUERY}