import {gql} from '@apollo/client'
const FETCH_ABOUT_PAGE_QUERY = gql`
    query GetAboutPageInfo(
        $status: [Int]
        $nodeStatus: [Int!]!
    ){
        about{
            education(status: $status){
                id
                logo
                title
                on_duty
                nodes(status: $nodeStatus){
                    id
                    name
                    link
                    logo
                    image
                    start_year
                    end_year
                    address
                    education_category_id
                    on_duty
                }
            }
            working_experience(status: $status){
                id
                company_logo
                company_name
                address
                start_date
                image
                end_date
                position
                overview
                description
                on_duty
            }
            built_projects(status: $status){
                id
                thumbnail
                name
                overview
                github_link
                deployment_link
                on_duty
            }
        }
    }
`

export default FETCH_ABOUT_PAGE_QUERY