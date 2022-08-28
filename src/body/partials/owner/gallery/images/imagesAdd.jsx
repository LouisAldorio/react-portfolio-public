import React,{useState} from 'react'
import {makeStyles,Button} from '@material-ui/core'
import { useForm } from '../../../../../customHooks/hooks'
import Uploader from '../../uploadComponent'
import CircularProgress from '@material-ui/core/CircularProgress';
import {useMutation} from '@apollo/client'
import { CREATE_IMAGE, FETCH_GALLERY_CONFIG_DATA_QUERY } from '../../../../../graphql/owner/gallery';
import SimpleListMenu from '../../spinner'

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

function ImagesAdd(props){
    const classes = useStyles()

    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState("")
    const [imageCategoryId,setImageCategoryId] = useState(props.imagesCategory[0].id)
    const [size,setSize] = useState({
        width: 0,
        height: 0
    })

    const { onChange, onSubmit, values } = useForm(Create, {})

    const [CreateImage, { loading: createLoading }] = useMutation(CREATE_IMAGE, {
        update(proxy, result) {
            
            const CurrentData = proxy.readQuery({query: FETCH_GALLERY_CONFIG_DATA_QUERY})
            proxy.writeQuery({
                query: FETCH_GALLERY_CONFIG_DATA_QUERY,
                data: {
                    gallery: {
                        photos_without_category: [
                            ...CurrentData.gallery.photos_without_category,
                            result.data.gallery.create_image
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
            src: imageSrc, 
            width: parseInt(size.width), 
            height: parseInt(size.height), 
            images_category_id: parseInt(imageCategoryId)
        },
    })

    function Create(){
        CreateImage()
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
                
                {createLoading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Create Image by Category
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default ImagesAdd