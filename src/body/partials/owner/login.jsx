import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../../footer/footer';
import {useMutation} from '@apollo/client'
import {useForm} from '../../../customHooks/hooks'
import OWNER_LOGIN from '../../../graphql/owner/login'
import { AuthContext } from '../../../auth/auth';
import { useSnackbar } from 'notistack';
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '85vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000000',
    backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
  },
}));

function LoginPage(props) {
    const classes = useStyles();
    const context = useContext(AuthContext)
    const { enqueueSnackbar } = useSnackbar()
    const failLogin = (variant,message) => () => {
        enqueueSnackbar(message, { variant });
    };
    let history = useHistory()

    const { onChange, onSubmit, values } = useForm(Login, {
        username: '',
        password: '',
    })

    const [LoginUser, { loading }] = useMutation(OWNER_LOGIN, {
        update(cache, result) {
            context.login(result.data.login)
            history.push('/owner/config/about')          
        },
        onError(err) {
            if(err) {
                failLogin('warning',err.graphQLErrors[0].message)()
            }
        },
        variables: values
    })

    function Login() {
        LoginUser()
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} >
                
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        onChange={onChange}
                        value={values.username}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="username"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        onChange={onChange}
                        value={values.password}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>             
                    </Grid>
                    <Box mt={5}>
                    <Footer />
                    </Box>
                </form>
                </div>
            </Grid>
        </Grid>
    );
}
export default LoginPage;