import { useMutation } from '@apollo/client'
import React,{useContext, useState} from 'react'
import { useForm } from '../../../../../customHooks/hooks'
import { UPDATE_AUDIO_BY_ID } from '../../../../../graphql/owner/gallery'
import {TextField,makeStyles,Button, Drawer} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { DrawerTogglerContext } from '../../../../main'
import Uploader from '../../uploadComponent'

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

function EditAudio(props){
    const classes = useStyles()

    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const [cover,setCover] = useState()
    const [coverSrc,setCoverSrc] = useState(props.data.cover)

    const [song,setSong] = useState()
    const [songSrc,setSongSrc] = useState(props.data.src)

    const { onChange, onSubmit, values } = useForm(Update, {
        title: props.data.title,
        author: props.data.author
    })

    const [UpdateAudio, { loading }] = useMutation(UPDATE_AUDIO_BY_ID, {
        update(cache, result) {
            props.refHandler.current.load()
            toggleDrawer(false)()
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: props.data.id,
            cover: coverSrc,
            title: values.title,
            author: values.author,
            src: songSrc,
            on_duty: props.data.on_duty
        }
    })

    function Update(){
        UpdateAudio()
    }
    return (
        <React.Fragment>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                    value={values.title}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Song Title"
                    onChange={onChange}
                    name="title"
                    autoFocus
                />
                <TextField
                    value={values.author}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Song Author"
                    onChange={onChange}
                    name="author"
                    autoFocus
                />

                <br />
                <div>
                    <Uploader 
                        buttonName={"Upload Cover"} 
                        src={coverSrc} 
                        fileHandler={setCover}
                        handler={setCoverSrc}
                        file={cover && cover}
                        fileName={cover && cover.name}/>
                </div>

                <div>
                    <Uploader 
                        buttonName={"Upload Song"} 
                        src={songSrc} 
                        fileHandler={setSong}
                        handler={setSongSrc}
                        isSong={true}
                        file={song && song}
                        fileName={song && song.name}/>
                </div>
                
                {loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Update Audio
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default EditAudio;