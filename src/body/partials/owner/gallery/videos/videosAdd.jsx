import React from 'react'
import { useForm } from '../../../../../customHooks/hooks'
import {makeStyles,TextField,Button} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { CREATE_VIDEO, FETCH_GALLERY_CONFIG_DATA_QUERY } from '../../../../../graphql/owner/gallery';
import {useMutation} from '@apollo/client'

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

function VideoAdd(props) {
    const classes = useStyles()

    const { onChange, onSubmit, values } = useForm(Create, {
        src: ''
    })

    const [CreateVideo, { loading: createLoading }] = useMutation(CREATE_VIDEO, {
        update(proxy, result) {
            const CurrentData = proxy.readQuery({query: FETCH_GALLERY_CONFIG_DATA_QUERY})
            proxy.writeQuery({
                query: FETCH_GALLERY_CONFIG_DATA_QUERY,
                data: {
                    gallery: {
                        carousel_photos: [
                            ...CurrentData.gallery.videos,
                            result.data.gallery.video.create
                        ]
                    }
                }
            })
            props.closeForm(false)
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            src: values.src
        },
    })

    function Create() {
        CreateVideo()
    }


    return (
        <React.Fragment>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
                value={values.src}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Embed URL"
                onChange={onChange}
                name="src"
                autoFocus
            />
            <br />
            
            {createLoading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Create Video
                </Button>
            )}           
            </form>
        </React.Fragment>
    )
}

export default VideoAdd