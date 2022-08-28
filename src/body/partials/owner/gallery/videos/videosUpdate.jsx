import { useMutation } from '@apollo/client'
import React, { useContext } from 'react'
import { useForm } from '../../../../../customHooks/hooks'
import { UPDATE_VIDEO_BY_ID } from '../../../../../graphql/owner/gallery'
import {TextField,makeStyles,Button} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { DrawerTogglerContext } from '../../../../main'

const useStyles = makeStyles((theme) => ({
    form: {
        width: '350px',
        margin: '0 20px'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#000000',
        backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
    },
}))

function EditVideo(props){
    const classes = useStyles()

    const { onChange, onSubmit, values } = useForm(Update, {
        src: props.data.src
    })

    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [UpdateVideo, { loading }] = useMutation(UPDATE_VIDEO_BY_ID, {
        update(cache, result) {
            toggleDrawer(false)()
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: props.data.id,
            src: values.src,
            on_duty: props.data.on_duty
        }
    })

    function Update(){
        UpdateVideo()
    }

    return(
        <React.Fragment>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                    value={values.src}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    label="Embed URL"
                    onChange={onChange}
                    name="src"
                    autoFocus
                />
                <br />
                
                {loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Update Video
                    </Button>
                )}           
            </form>
        </React.Fragment>
    )
}

export default EditVideo