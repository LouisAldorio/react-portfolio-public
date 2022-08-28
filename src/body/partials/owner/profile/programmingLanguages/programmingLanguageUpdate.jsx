import { useQuery,useMutation } from '@apollo/client';
import { makeStyles,TextField,Grid,Button } from '@material-ui/core'
import React, { useState ,useContext} from 'react'
import { UPDATE_PROGRAMMING_LANGUAGE_BY_ID} from '../../../../../graphql/owner/profile';
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
function EditProgrammingLanguage(props){
    const classes = useStyles()
    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const splittedByLeftBacket = props.data.color.split("(")
    const splittedByRightBracket = splittedByLeftBacket[1].split(")")
    const SplittedByComa = splittedByRightBracket[0].split(", ")

    const { onChange, onSubmit, values } = useForm(Update, {
        name: props.data.name,
        value: props.data.value,
        total: props.data.total,
        R: SplittedByComa[0],
        G: SplittedByComa[1],
        B: SplittedByComa[2],
        A: SplittedByComa[3]
    })

    const [UpdateProgrammingLanguage, { loading: updateLoading }] = useMutation(UPDATE_PROGRAMMING_LANGUAGE_BY_ID, {
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
            color: `rgba(${values.R}, ${values.G}, ${values.B}, ${values.A})`,
            value: parseInt(values.value),
            total: parseInt(values.total),
            on_duty: props.data.on_duty
        },
    })

    function Update(){
        UpdateProgrammingLanguage()
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
                    label="Programming Language name"
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
                    name="value"
                    value={values.value}
                    onChange={onChange}
                    label="Current Value"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    name="total"
                    value={values.total}
                    onChange={onChange}
                    label="Total"
                />
                
                <div style={{display: 'flex'}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        name="R"
                        type="number"
                        value={values.R}
                        onChange={onChange}
                        label="Red"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        name="G"
                        value={values.G}
                        onChange={onChange}
                        label="Green"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        name="B"
                        value={values.B}
                        onChange={onChange}
                        label="Blue"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="number"
                        name="A"
                        value={values.A}
                        onChange={onChange}
                        label="Opacity"
                    />
                </div>
                {updateLoading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Update Programming Language
                    </Button>
                )}
                
            </form>
        </React.Fragment>
    )
}

export default EditProgrammingLanguage