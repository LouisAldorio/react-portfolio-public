import React,{useState,useRef,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Paper,FormControl,FormHelperText,InputLabel,Input,Button, IconButton } from '@material-ui/core';
import CustomizedSwitches from '../../switch';
import { UPDATE_IMAGE_CATEGORY_BY_ID } from '../../../../../graphql/owner/gallery';
import { useMutation } from '@apollo/client';
import { useForm } from '../../../../../customHooks/hooks';
import { SETTING_CREATE_IMAGE_CATEGORY, SETTING_DELETE_IMAGE_CATEGORY, SETTING_QUERY } from '../../../../../graphql/owner/setting';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
    formControl: {
        width: '70%',
        marginLeft: 20,
        marginBottom: 20,
        marginRight: 20
    },
    button:{
        marginTop:15
    },
    icon: {
        fontSize: 32,
    },
})


function Row(props){
    
	const {image_category} = props
	const [state, setState] = useState(image_category.on_duty === 1 ? true : false);

	const handleChange = (event) => {
        setState(event.target.checked);
    };

	const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        Update()
    }, [state])

    const [UpdateImageCategory, { loading }] = useMutation(UPDATE_IMAGE_CATEGORY_BY_ID, {
        update(cache, result) {

        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: image_category.id,
            category: image_category.category,
            on_duty: state ? 1 : 2
        }
    })

    function Update(){
        UpdateImageCategory()
    }

    //delete
    const [DeleteImageCategory, { loading : DeleteLoading }] = useMutation(SETTING_DELETE_IMAGE_CATEGORY, {
        update(cache, result) {

            const CurrentData = cache.readQuery({query: SETTING_QUERY})
            cache.writeQuery({
                query: SETTING_QUERY,
                data: {
                    gallery: {
                        tabs_photos: CurrentData.gallery.tabs_photos.filter(category => { 
                            return category.id !== result.data.gallery.delete_image_category 
                        })
                    }
                }
            })
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: image_category.id,
        }
    })

    function Delete(){
        DeleteImageCategory()
    }

    return (	
		<ListItem >
			<ListItemText primary={image_category.category} />        
			<ListItemIcon>
				<CustomizedSwitches state={state} handleChange={handleChange}/>  
            </ListItemIcon>
            <ListItemIcon>
                <IconButton onClick={Delete}>
                    <DeleteIcon /> 
                </IconButton>              
            </ListItemIcon>
		</ListItem>
    )
}

export default function ImageCategoryManagement(props) {
    const classes = useStyles()

    const { onChange, onSubmit, values } = useForm(Create, {
        category: ''
    })

    const [CreateNewCategory ,{ loading : CreateLoading }] = useMutation(SETTING_CREATE_IMAGE_CATEGORY, {
        update(cache, result) {
            
            const CurrentData = cache.readQuery({query: SETTING_QUERY})
            cache.writeQuery({
                query: SETTING_QUERY,
                data: {
                    gallery: {
                        tabs_photos: [
                            ...CurrentData.gallery.tabs_photos,
                            result.data.gallery.create_image_category
                        ]
                    }
                }
            })
            values.category = ''
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            category: values.category
        }
    })


    function Create() {
        CreateNewCategory()
    }


	return (
		<Paper elevation={3}>
			<List subheader={<ListSubheader>Image Category Settings</ListSubheader>}>
				{props.data.map((image_category,index) => (
					<Row image_category={image_category} key={index}/>
				))}
			</List>
            <form onSubmit={onSubmit}>
                <FormControl className={classes.formControl} color="secondary">
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Input id="category" name="category" value={values.category} onChange={onChange}/>
                    <FormHelperText >New Category Here!</FormHelperText>
                </FormControl>
                <Button variant="contained"
                    color="secondary"
                    type="submit"
                    className={classes.button}
                    >Add</Button>
            </form>           
		</Paper>
	);
}