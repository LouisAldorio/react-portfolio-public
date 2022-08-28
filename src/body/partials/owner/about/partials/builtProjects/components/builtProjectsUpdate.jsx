import { useQuery,useMutation } from '@apollo/client';
import { makeStyles,TextField,Grid,Button } from '@material-ui/core'
import React, { useState ,useContext} from 'react'
import { CREATE_BUILT_PROJECTS, CREATE_WORKING_EXPERIENCE,FETCH_CONFIG_ABOUT_BUILT_PROJECTS_QUERY, UPDATE_BUILT_PROJECTS_BY_ID } from '../../../../../../../graphql/owner/about';
import CircularProgress from '@material-ui/core/CircularProgress';
import Uploader from '../../../../uploadComponent';
import {useForm} from '../../../../../../../customHooks/hooks'
import {DrawerTogglerContext} from '../../../../../../main'
import { propTypes } from 'react-bootstrap/esm/Image';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '90%',
        margin: '0 auto'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#000000',
        backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
    },
}))
function EditWorkingExperience(props){
    const classes = useStyles()
    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [thumbnail,setThumbnail] = useState()
    const [thumbnailSrc,setThumbnailSrc] = useState(props.data.thumbnail)

    const { onChange, onSubmit, values } = useForm(Update, {
        name:props.data.name,
        overview: props.data.overview,
        github_link: props.data.github_link,
        deployment_link: props.data.deployment_link
    })

    const [UpdateBuiltProjects, { loading: createLoading }] = useMutation(UPDATE_BUILT_PROJECTS_BY_ID, {
        update(proxy, result) {
            toggleDrawer(false)()
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: props.data.id,
            thumbnail: thumbnailSrc,
            name: values.name,
            overview: values.overview,
            github_link: values.github_link,
            deployment_link: values.deployment_link,
            on_duty: 0
        },
        refetchQueries:[{
            query: FETCH_CONFIG_ABOUT_BUILT_PROJECTS_QUERY
        }]
    })

    function Update(){
        UpdateBuiltProjects()
    }

    return  (
        <React.Fragment>           
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                    value={values.name}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Project Name"
                    onChange={onChange}
                    name="name"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="overview"
                    value={values.overview}
                    onChange={onChange}
                    label="Some Overview ?"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="deployment_link"
                    value={values.deployment_link}
                    onChange={onChange}
                    label="Deployment Link"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="github_link"
                    value={values.github_link}
                    onChange={onChange}
                    label="Github Project Link"
                />
                <br />
                <div>
                    <Uploader 
                        buttonName={"Upload Thumbnail"} 
                        src={thumbnailSrc} 
                        fileHandler={setThumbnail}
                        handler={setThumbnailSrc}
                        file={thumbnail && thumbnail}
                        fileName={thumbnail && thumbnail.name}/>
                </div>
                
                {createLoading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Update Built Projects
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default EditWorkingExperience