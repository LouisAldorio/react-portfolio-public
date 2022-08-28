import React,{useState,useContext} from 'react'
import {makeStyles,Button} from '@material-ui/core'
import {useMutation}from '@apollo/client'
import { UPDATE_IMAGE_BY_ID } from '../../../../../graphql/owner/gallery'
import { useForm } from '../../../../../customHooks/hooks'
import SimpleListMenu from '../../spinner'
import Uploader from '../../uploadComponent'
import CircularProgress from '@material-ui/core/CircularProgress';
import { DrawerTogglerContext } from '../../../../main'

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

function EditImages(props){

    const classes = useStyles()

    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState(props.data.src)
    const [imageCategoryId,setImageCategoryId] = useState(props.data.images_category_id)
    const [size,setSize] = useState({
        width: props.data.width,
        height: props.data.height
    })

    const { onChange, onSubmit, values } = useForm(Update, {})

    const [UpdateImage, { loading }] = useMutation(UPDATE_IMAGE_BY_ID, {
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
            src: imageSrc,
            width: size.width,
            height: size.height,
            images_category_id: imageCategoryId,
            on_duty: props.data.on_duty
        }
    })

    function Update(){
        UpdateImage()
    }
    return (
        <React.Fragment>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <SimpleListMenu 
                        data={props.imagesCategory}
                        value={imageCategoryId}
                        handler={setImageCategoryId}/>

                <br />
                <div>
                    <Uploader 
                        buttonName={"Upload Image"} 
                        src={imageSrc} 
                        fileHandler={setImage}
                        handler={setImageSrc}
                        sizeHandler={setSize}
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
                        Update Image
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default EditImages