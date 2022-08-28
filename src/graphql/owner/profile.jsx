import {gql} from '@apollo/client'

const FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS = gql`
    query GetProgrammingLanguagesAndSkills {
        profile{
            programming_languages{
                id
                name
                value
                color
                total
                on_duty
            }
            skills{
                id
                logo
                name
                state
                on_duty
            }
        }
    }
`

const UPDATE_PROGRAMMING_LANGUAGE_BY_ID = gql`
    mutation UpdateProgrammingLanguageByID(
        $id: Int!
        $name: String!
        $value: Int!
        $color: String!
        $total: Int!
        $on_duty: Int!
    ) {
        profile{
            programming_language{
                update(input:{
                    id: $id
                    name: $name
                    value: $value
                    color: $color
                    total: $total
                    on_duty: $on_duty
                }){
                    id
                    name
                    value
                    color
                    total
                    on_duty
                }
            }
        }
    }
`

const CREATE_PROGRAMMING_LANGUAGE = gql`
    mutation CreateProgrammingLanguage(
        $name: String!
        $value: Int!
        $color: String!
        $total: Int!
    ) {
        profile{
            programming_language{
                create(input:{
                    name: $name
                    value: $value
                    color: $color
                    total: $total
                }){
                    id
                    name
                    value
                    color
                    total
                    on_duty
                }
            }
        }
    }
`

const CREATE_SKILL = gql`
    mutation CreateSkill(
        $logo: String!
        $name: String!
        $state: Float!
    ) {
        profile{
            skill{
                create(input:{
                    logo: $logo
                    name: $name
                    state: $state
                }){
                    id
                    logo
                    name
                    state
                    on_duty
                }
            }
        }
    }
`

const UPDATE_SKILL_BY_ID = gql`
    mutation UpdateSkill(
        $id: Int!
        $logo: String!
        $name: String!
        $state: Float!
        $on_duty: Int!
    ) {
        profile{
            skill{
                update(input:{
                    id: $id
                    logo: $logo
                    name: $name
                    state: $state
                    on_duty: $on_duty
                }){
                    id
                    logo
                    name
                    state
                    on_duty
                }
            }
        }
    }
`

const DELETE_SKILL_BY_ID = gql`
    mutation DeleteSkill(
        $id: Int!
    ) {
        profile{
            skill{
                delete(id: $id)
            }
        }
    }
`

const DELETE_PROGRAMMING_LANGUAGE_BY_ID = gql`
    mutation DeleteProgrammingLanguage(
        $id: Int!
    ) {
        profile{
            programming_language{
                delete(id: $id)
            }
        }
    }
`

export {
    FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS,
    UPDATE_PROGRAMMING_LANGUAGE_BY_ID,
    CREATE_PROGRAMMING_LANGUAGE,
    CREATE_SKILL,
    UPDATE_SKILL_BY_ID,
    DELETE_SKILL_BY_ID,
    DELETE_PROGRAMMING_LANGUAGE_BY_ID
}