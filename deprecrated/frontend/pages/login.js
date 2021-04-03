import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import {Link as Nextlink} from 'next/link'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useRouter} from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { useAlreadyAuth } from "../lib/useAuth";

import Loading from '../components/loading';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
    },
}));


export default function Login() {
  const classes = useStyles();
  const auth = useAlreadyAuth(); 
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if(!auth || auth.user){
    return(<Loading/>);
  }

  const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;
      setError(false);
      setErrorMsg('');
      if(name === 'email') {
        setEmail(value);
      }
      else if(name === 'password'){
        setPassword(value);
      }
  };

  const onSignIn = () => {
    auth
      .signin(email, password, rememberMe)
      .then(
        function(user){
          if(user){
            router.push('/');
          }
        }
      ).catch(
        function(error) {
          var errorMessage = error.message;
          setErrorMsg(errorMessage);
          setError(true);
        }
      );
  };

  

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => onChangeHandler(event)}
            error={error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => onChangeHandler(event)}
            error={error}
            helperText={errorMsg}
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={rememberMe}
                onChange={()=>setRememberMe(!rememberMe)}
                value="remember" 
                color="primary" 
              />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event)=>{onSignIn(event)}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={Nextlink} href="/authentication/forgotpass" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={Nextlink} href="/authentication/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}