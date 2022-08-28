import { useQuery,useMutation } from '@apollo/client';
import { makeStyles,TextField,Grid,Button } from '@material-ui/core'
import React, { useState ,useContext} from 'react'
import { CREATE_WORKING_EXPERIENCE,FETCH_CONFIG_ABOUT_WORKING_EXPERIENCE_QUERY } from '../../../../../../../graphql/owner/about';
import CircularProgress from '@material-ui/core/CircularProgress';
import Uploader from '../../../../uploadComponent';
import {useForm} from '../../../../../../../customHooks/hooks'
import {DrawerTogglerContext} from '../../../../../../main'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
function AddWorkingExperience(){
    const classes = useStyles()
    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [logo,setLogo] = useState()
    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState("")
    const [logoSrc,setLogoSrc] = useState("")

    const [startDate,setStartDate] = useState(new Date().toISOString().slice(0, 10))
    const [endDate,setEndDate] = useState(new Date().toISOString().slice(0, 10))
    const handleStartDateChange = (date) => {
        setStartDate(new Date(date).toISOString().slice(0, 10));
    };
    const handleEndDateChange = (date) => {
        setEndDate(new Date(date).toISOString().slice(0, 10));
    };
    
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const { onChange, onSubmit, values } = useForm(Create, {
        company_name: '',
        position: '',
        overview: '',
        description: '',
        address: ''
    })
    console.log(values)

    const [CreateWorkingExperience, { loading: createLoading }] = useMutation(CREATE_WORKING_EXPERIENCE, {
        update(proxy, result) {
            toggleDrawer(false)()
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            company_name: values.company_name,
            start_date: startDate,
            end_date: checked === true ? 'Now' : endDate,
            company_logo: logoSrc,
            image: imageSrc,
            address: values.address,
            position: values.position,
            overview: values.overview,
            description: values.description,
            on_duty: 0
        },
        refetchQueries:[{
            query: FETCH_CONFIG_ABOUT_WORKING_EXPERIENCE_QUERY
        }]
    })

    function Create(){
        CreateWorkingExperience()
    }

    return  (
        <React.Fragment>           
            <form className={classes.form} noValidate onSubmit={onSubmit}>
                <TextField
                    value={values.company_name}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Company Name"
                    onChange={onChange}
                    name="company_name"
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="position"
                    value={values.position}
                    onChange={onChange}
                    label="Position"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="overview"
                    value={values.overview}
                    onChange={onChange}
                    label="Overview"
                />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                label="Start Working Date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                disabled={checked}
                                label="End Working Date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <FormControlLabel
                        value="start"
                        control={<Checkbox color="primary" checked={checked} onChange={handleChange}/>}
                        label="Now"
                        labelPlacement="end"
                    />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={values.description}
                    name="description"
                    onChange={onChange}
                    rows={5}
                    multiline
                    label="A little Description Here!"
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
                
                {createLoading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Create Education
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default AddWorkingExperience