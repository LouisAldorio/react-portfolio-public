import React,{useState,useRef,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IconButton,FormControl,FormHelperText,Button,InputLabel,Input} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CustomizedSwitches from '../../switch';
import { Paper } from '@material-ui/core';
import { UPDATE_EDUCATION_CATEGORY_BY_ID } from '../../../../../graphql/owner/gallery';
import { useMutation } from '@apollo/client';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm } from '../../../../../customHooks/hooks';
import { SETTING_CREATE_EDUCATION_CATEGORY, SETTING_DELETE_EDUCATION_CATEGORY, SETTING_QUERY } from '../../../../../graphql/owner/setting';
import Uploader from '../../uploadComponent';

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
    const classes = useStyles()
	const {education_category} = props
	const [state, setState] = useState(education_category.on_duty === 1 ?  true : false);

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

    const [UpdateEducationCategory, { loading }] = useMutation(UPDATE_EDUCATION_CATEGORY_BY_ID, {
        update(cache, result) {

        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: education_category.id,
            title: education_category.title,
            logo: education_category.logo,
            on_duty: state ? 1 : 2
        }
    })

    function Update(){
        UpdateEducationCategory()
    }

    //delete 
    const [DeleteEducationCategory, { loading : DeleteLoading }] = useMutation(SETTING_DELETE_EDUCATION_CATEGORY, {
        update(cache, result) {

            const CurrentData = cache.readQuery({query: SETTING_QUERY})
            cache.writeQuery({
                query: SETTING_QUERY,
                data: {
                    about: {
                        education: CurrentData.about.education.filter(category => { 
                            return category.id !== result.data.about.delete_education_category 
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
            id: education_category.id,
        }
    })

    function Delete(){
        DeleteEducationCategory()
    }

    return (	
		<ListItem>
            <ListItemIcon style={{width: '50px',height: '50px',marginRight: 10}}>
                <img src={education_category.logo}  />
            </ListItemIcon>
			<ListItemText primary={education_category.title} />
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

export default function EducationCategoryManagement(props) {
    const classes = useStyles()


    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState("")
    const { onChange, onSubmit, values } = useForm(Create, {
        title: '',
    })

    const [CreateNewEducationCategory ,{ loading : CreateLoading }] = useMutation(SETTING_CREATE_EDUCATION_CATEGORY, {
        update(cache, result) {
            
            const CurrentData = cache.readQuery({query: SETTING_QUERY})
            cache.writeQuery({
                query: SETTING_QUERY,
                data: {
                    about: {
                        education: [
                            ...CurrentData.about.education,
                            result.data.about.create_education_category
                        ]
                    }
                }
            })
            values.category = ''
            setImageSrc("")
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            title: values.title,
            logo: imageSrc
        }
    })


    function Create() {
        CreateNewEducationCategory()
    }

	return (
		<Paper elevation={3}>
			<List subheader={<ListSubheader>Education Category Settings</ListSubheader>}>
				{props.data.map((education_category,index) => (
					<Row education_category={education_category} key={index}/>
				))}
			</List>
            <form onSubmit={onSubmit}>
                <div style={{marginLeft: 20}}>
                    <Uploader 
                        buttonName={"Upload Logo"} 
                        src={imageSrc} 
                        fileHandler={setImage}
                        handler={setImageSrc}
                        file={image && image}
                        fileName={image && image.name}/>
                </div>
                <FormControl className={classes.formControl} color="secondary">
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Input id="category" name="title" value={values.category} onChange={onChange}/>
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
