import { useQuery,useMutation } from '@apollo/client';
import { makeStyles,TextField,Grid,Button } from '@material-ui/core'
import React, { useState ,useContext} from 'react'
import { GET_EDUCATION_CATEGORY,CREATE_EDUCATION,FETCH_CONFIG_ABOUT_EDUCATION_QUERY, UPDATE_EDUCATION_BY_ID } from '../../../../../../../graphql/owner/about';
import SimpleListMenu from '../../../../spinner';
import CircularProgress from '@material-ui/core/CircularProgress';
import Uploader from '../../../../uploadComponent';
import {useForm} from '../../../../../../../customHooks/hooks'
import {DrawerTogglerContext} from '../../../../../../main'


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
function EditEducation(props){
    const classes = useStyles()
    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [logo,setLogo] = useState()
    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState(props.data.image)
    const [logoSrc,setLogoSrc] = useState(props.data.logo)
    const [educationCategoryId,setEducationCategoryId] = useState(props.data.education_category_id)

    const { onChange, onSubmit, values } = useForm(UpdateEdu, {
        name: props.data.name,
        link: props.data.link,
        start_year: props.data.start_year,
        end_year: props.data.end_year,
        address: props.data.address,
    })

    const {loading,data} = useQuery(GET_EDUCATION_CATEGORY)

    const [UpdateEducation, { loading: updateLoading }] = useMutation(UPDATE_EDUCATION_BY_ID, {
        update(proxy, result) {
            toggleDrawer(false)()
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: props.data.id,
            name: values.name,
            link: values.link,
            logo: logoSrc,
            image: imageSrc,
            start_year: values.start_year,
            end_year: values.end_year,
            education_category_id: educationCategoryId,
            address: values.address,
            on_duty: props.data.on_duty
        },
        refetchQueries:[{
            query: FETCH_CONFIG_ABOUT_EDUCATION_QUERY
        }]
    })

    function UpdateEdu(){
        UpdateEducation()
    }

    return  (
        <React.Fragment>           
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                    value={values.name}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    onChange={onChange}
                    name="name"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    value={values.address}
                    onChange={onChange}
                    label="Address"
                />
                <Grid container>
                    <Grid md={6} sm={6} xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            value={values.start_year}
                            name="start_year"
                            onChange={onChange}
                            label="Start Year"
                        />
                    </Grid >
                    <Grid md={6} sm={6} xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            value={values.end_year}
                            type="number"
                            onChange={onChange}
                            fullWidth
                            name="end_year"
                            label="End Year"
                        />
                    </Grid>
                </Grid>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={values.link}
                    name="link"
                    onChange={onChange}
                    label="Link To Website"
                />
                {loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <SimpleListMenu 
                        data={data && data.about.education}
                        value={educationCategoryId}
                        handler={setEducationCategoryId}/>
                )}
                <br />
                <div>
                    <Uploader 
                        buttonName={"Upload Image"} 
                        src={imageSrc} 
                        fileHandler={setImage}
                        handler={setImageSrc}
                        file={image && image}
                        fileName={image && image.name}/>
                    <br />
                    <br />
                    <Uploader 
                        buttonName={"Upload Logo"} 
                        src={logoSrc} 
                        fileHandler={setLogo}
                        handler={setLogoSrc}
                        file={logo && logo}
                        fileName={logo && logo.name}/>
                </div>
                
                {updateLoading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Update Education
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default EditEducation