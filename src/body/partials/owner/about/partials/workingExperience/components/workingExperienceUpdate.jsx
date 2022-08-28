import { useQuery,useMutation } from '@apollo/client';
import { makeStyles,TextField,Grid,Button } from '@material-ui/core'
import React, { useState ,useContext} from 'react'
import { UPDATE_WORKING_EXPERIENCE_BY_ID,FETCH_CONFIG_ABOUT_WORKING_EXPERIENCE_QUERY } from '../../../../../../../graphql/owner/about';
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
function EditWorkingExperience(props){
    const classes = useStyles()
    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [logo,setLogo] = useState()
    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState(props.data.image)
    const [logoSrc,setLogoSrc] = useState(props.data.company_logo)

    const [startDate,setStartDate] = useState(new Date(props.data.start_date).toISOString().slice(0, 10))
    const [endDate,setEndDate] = useState(props.data.end_date !== 'Now' ? new Date(props.data.end_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))
    const handleStartDateChange = (date) => {
        setStartDate(new Date(date).toISOString().slice(0, 10));
    };
    const handleEndDateChange = (date) => {
        setEndDate(new Date(date).toISOString().slice(0, 10));
    };

    const [checked, setChecked] = React.useState(props.data.end_date === 'Now' ? true : false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    
    const { onChange, onSubmit, values } = useForm(Update, {
        company_name: props.data.company_name,
        position: props.data.position,
        overview: props.data.overview,
        description: props.data.description,
        address: props.data.address
    })

    const [UpdateWorkingWorkingExperience, { loading: createLoading }] = useMutation(UPDATE_WORKING_EXPERIENCE_BY_ID, {
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

    function Update(){
        UpdateWorkingWorkingExperience()
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
                                label="End Working Date"
                                value={endDate}
                                disabled={checked}
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
                        Update Working Experience
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default EditWorkingExperience