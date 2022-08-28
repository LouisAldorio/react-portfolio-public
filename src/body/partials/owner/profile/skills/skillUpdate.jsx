import { useQuery,useMutation } from '@apollo/client';
import { makeStyles,TextField,Grid,Button } from '@material-ui/core'
import React, { useState ,useContext} from 'react'
import {  UPDATE_SKILL_BY_ID} from '../../../../../graphql/owner/profile';
import CircularProgress from '@material-ui/core/CircularProgress';
import Uploader from '../../uploadComponent';
import {useForm} from '../../../../../customHooks/hooks'
import {DrawerTogglerContext} from '../../../../main'


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
function EditSkill(props){
    const classes = useStyles()
    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [logo,setLogo] = useState()
    const [logoSrc,setLogoSrc] = useState(props.data.logo)

    const { onChange, onSubmit, values } = useForm(Update, {
        name: props.data.name,
        state: props.data.state,
    })

    const [UpdateSkill, { loading: createLoading }] = useMutation(UPDATE_SKILL_BY_ID, {
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
            logo: logoSrc,
            state: parseFloat(values.state),
            on_duty: props.data.on_duty
        },
    })

    function Update(){
        UpdateSkill()
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
                    label="Skill name"
                    onChange={onChange}
                    name="name"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    name="state"
                    value={values.state}
                    onChange={onChange}
                    label="Current State"
                />
                <br />
                <div>
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
                        Update Skill
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default EditSkill