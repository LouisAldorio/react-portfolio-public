import { Button,makeStyles,TextField } from '@material-ui/core'
import React,{useState} from 'react'
import { useForm } from '../../../../../customHooks/hooks'
import CircularProgress from '@material-ui/core/CircularProgress';
import {useMutation} from '@apollo/client'
import Uploader from '../../uploadComponent';
import { CREATE_TOP_IMAGE, FETCH_GALLERY_CONFIG_DATA_QUERY } from '../../../../../graphql/owner/gallery';

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

function TopImagesAdd(props){
    const classes = useStyles()

    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState("")

    const { onChange, onSubmit, values } = useForm(Create, {
        caption: ''
    })

    const [CreateTopImage, { loading: createLoading }] = useMutation(CREATE_TOP_IMAGE, {
        update(proxy, result) {
            const CurrentData = proxy.readQuery({query: FETCH_GALLERY_CONFIG_DATA_QUERY})
            proxy.writeQuery({
                query: FETCH_GALLERY_CONFIG_DATA_QUERY,
                data: {
                    gallery: {
                        carousel_photos: [
                            ...CurrentData.gallery.carousel_photos,
                            result.data.gallery.create_top_image
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
            caption: values.caption,
            src: imageSrc
        },
    })


    function Create(){
        CreateTopImage()
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
                
                {createLoading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Create Top Image
                    </Button>
                )}
                
            </form>
        </React.Fragment>
        
    )
}

export default TopImagesAdd