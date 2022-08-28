import React,{useContext, useState} from 'react'
import {makeStyles,TextField,Button} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from '../../../../../customHooks/hooks';
import Uploader from '../../uploadComponent';
import { UPDATE_TOP_IMAGE_BY_ID } from '../../../../../graphql/owner/gallery';
import {useMutation} from '@apollo/client'
import { DrawerTogglerContext } from '../../../../main';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '90%',
        margin: '0 20px'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: '#000000',
        backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
    },
}))

function EditTopImages(props){
    const classes = useStyles()

    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState(props.data.src)

    const { onChange, onSubmit, values } = useForm(Update, {
        caption: props.data.caption
    })

    const [UpdateTopImage, { loading }] = useMutation(UPDATE_TOP_IMAGE_BY_ID, {
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
            caption: values.caption,
            src: imageSrc,
            on_duty: props.data.on_duty
        }
    })

    function Update(){
        UpdateTopImage()
    }

    return (
        <React.Fragment>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                    value={values.caption}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    label="Caption"
                    onChange={onChange}
                    name="caption"
                    autoFocus
                />
                <br />
                <div>
                    <Uploader 
                        buttonName={"Upload Image"} 
                        src={imageSrc} 
                        fileHandler={setImage}
                        handler={setImageSrc}
                        file={image && image}
                        fileName={image && image.name}/>
                </div>
                
                {loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Update Top Image
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default EditTopImages