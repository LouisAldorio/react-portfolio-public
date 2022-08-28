import {gql} from '@apollo/client'

const FETCH_CONFIG_ABOUT_EDUCATION_QUERY = gql`
    query GetAboutPageEducationInfo {
        about {
            education_without_category {
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
                category{
                    id
                    logo
                    title
                    on_duty
                }
            }
        }
    }
`

const FETCH_CONFIG_ABOUT_WORKING_EXPERIENCE_QUERY = gql`
    query GetAboutPageWorkingExperienceInfo {
        about{
            working_experience{
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
        }
    }
`

const FETCH_CONFIG_ABOUT_BUILT_PROJECTS_QUERY = gql`
    query GetAboutPageBuiltProjectsInfo {
        about{
            built_projects{
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

//mutations
const UPDATE_EDUCATION_BY_ID = gql`
    mutation UpdateEducation(
        $id: Int!
        $name: String!
        $link: String!
        $logo: String!
        $image: String!
        $start_year: String!
        $end_year: String!
        $address: String!
        $education_category_id: Int!
        $on_duty: Int!
    ) {
        about{
            update_education(input:{
                id: $id
                name: $name
                link: $link
                logo: $logo
                image: $image
                start_year: $start_year
                end_year: $end_year
                address: $address
                education_category_id: $education_category_id
                on_duty: $on_duty
            }){
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
                category{
                    id
                    logo
                    title
                    on_duty
                }
            }
        }
    }
`


const CREATE_EDUCATION = gql`
    mutation CreateEducation(
        $name: String!
        $link: String!
        $logo: String!
        $image: String!
        $start_year: String!
        $end_year: String!
        $address: String!
        $education_category_id: Int!
        $on_duty: Int!
    ) {
        about{
            create_education(input:{
                name: $name
                link: $link
                logo: $logo
                image: $image
                start_year: $start_year
                end_year: $end_year
                address: $address
                education_category_id: $education_category_id
                on_duty: $on_duty
            }){
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
                category{
                    id
                    logo
                    title
                    on_duty
                }
            }
        }
    }
`

const GET_EDUCATION_CATEGORY = gql`
    query GetEducationCategory {
        about {
            education {
                id
                logo
                title
            }
        }
    }
`

const UPDATE_WORKING_EXPERIENCE_BY_ID = gql`
    mutation UpdateWorkingExperienceByID(
        $id: Int!
        $company_logo: String!
        $company_name: String!
        $address: String!
        $start_date: String!
        $image: String!
        $end_date: String!
        $position: String!
        $overview: String!
        $description: String!
        $on_duty: Int!
    ) {
        about{
            update_working_experience(input:{
                id: $id
                company_logo: $company_logo
                company_name: $company_name
                address: $address
                start_date: $start_date
                image: $image
                end_date: $end_date
                position: $position
                overview: $overview
                description: $description
                on_duty: $on_duty
            }){
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
        }
    }
`

const CREATE_WORKING_EXPERIENCE = gql`
    mutation CreateWorkingExperience(
        $company_logo: String!
        $company_name: String!
        $address: String!
        $start_date: String!
        $image: String!
        $end_date: String!
        $position: String!
        $overview: String!
        $description: String!
        $on_duty: Int!
    ) {
        about{
            create_working_experience(input:{
                company_logo: $company_logo
                company_name: $company_name
                address: $address
                start_date: $start_date
                image: $image
                end_date: $end_date
                position: $position
                overview: $overview
                description: $description
                on_duty: $on_duty
            }){
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
        }
    }
`

const CREATE_BUILT_PROJECTS = gql`
    mutation CreateBuiltProjects(
        $thumbnail: String!
        $name: String!
        $overview: String!
        $github_link: String!
        $deployment_link: String!
        $on_duty: Int!
    ) {
        about{
            create_built_projects(input:{
                thumbnail: $thumbnail
                name: $name
                overview: $overview
                github_link: $github_link
                deployment_link: $deployment_link
                on_duty: $on_duty
            }){
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

const UPDATE_BUILT_PROJECTS_BY_ID = gql`
    mutation UpdateBuiltProjects(
        $id: Int!
        $thumbnail: String!
        $name: String!
        $overview: String!
        $github_link: String!
        $deployment_link: String!
        $on_duty: Int!
    ) {
        about{
            update_built_projects(input:{
                id: $id
                thumbnail: $thumbnail
                name: $name
                overview: $overview
                github_link: $github_link
                deployment_link: $deployment_link
                on_duty: $on_duty
            }){
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

const DELETE_EDUCATION_BY_ID = gql`
    mutation DeleteEducation(
        $id: Int!
    ) {
        about{
            delete_education(id: $id)
        }
    }
`

const DELETE_WORKING_EXPERIENCE_BY_ID = gql`
    mutation DeleteWorkingExperience(
        $id: Int!
    ){
        about{
            delete_working_exprerience(id: $id)
        }
    }
`

const DELETE_BUILT_PROJECT_BY_ID = gql`
    mutation DeleteBuiltProject(
        $id: Int!
    ) {
        about{
            delete_built_projects(id: $id)
        }
    }
`

export { 
    FETCH_CONFIG_ABOUT_EDUCATION_QUERY,
    FETCH_CONFIG_ABOUT_WORKING_EXPERIENCE_QUERY,
    FETCH_CONFIG_ABOUT_BUILT_PROJECTS_QUERY,
    UPDATE_EDUCATION_BY_ID,
    CREATE_EDUCATION,
    GET_EDUCATION_CATEGORY,
    UPDATE_WORKING_EXPERIENCE_BY_ID,
    CREATE_WORKING_EXPERIENCE,
    CREATE_BUILT_PROJECTS,
    UPDATE_BUILT_PROJECTS_BY_ID,
    DELETE_EDUCATION_BY_ID,
    DELETE_WORKING_EXPERIENCE_BY_ID,
    DELETE_BUILT_PROJECT_BY_ID
}