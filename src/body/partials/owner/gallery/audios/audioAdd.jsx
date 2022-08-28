import React,{useState} from 'react'
import {Button,makeStyles,TextField} from '@material-ui/core'
import { useForm } from '../../../../../customHooks/hooks'
import CircularProgress from '@material-ui/core/CircularProgress';
import Uploader from '../../uploadComponent';
import {useMutation} from '@apollo/client'
import { CREATE_AUDIO, FETCH_GALLERY_CONFIG_DATA_QUERY } from '../../../../../graphql/owner/gallery';

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

function AudioAdd(props){

    const classes = useStyles()

    const [cover,setCover] = useState()
    const [coverSrc,setCoverSrc] = useState("")

    const [song,setSong] = useState()
    const [songSrc,setSongSrc] = useState("")

    const { onChange, onSubmit, values } = useForm(Create, {
        title: '',
        author: ''
    })

    const [CreateSong, { loading: createLoading }] = useMutation(CREATE_AUDIO, {
        update(proxy, result) {
            const CurrentData = proxy.readQuery({query: FETCH_GALLERY_CONFIG_DATA_QUERY})
            proxy.writeQuery({
                query: FETCH_GALLERY_CONFIG_DATA_QUERY,
                data: {
                    gallery: {
                        carousel_photos: [
                            ...CurrentData.gallery.audios,
                            result.data.gallery.audio.create
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
            src: songSrc,
            title: values.title,
            author: values.author,
            cover: coverSrc
        },
    })

    function Create(){
        CreateSong()
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
                
                {createLoading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Create Audio
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default AudioAdd