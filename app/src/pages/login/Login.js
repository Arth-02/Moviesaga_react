import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

import { MyContext } from '../../MyContext';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const Login = () => {

  const navigate = useNavigate();

  const { setIsAuthenticated , setUserInfo} = useContext(MyContext);

  const handleSubmit = async (event) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);

      try {
        const response = await fetch("http://localhost:8000/auth/login", {
          method : 'POST',
          body : JSON.stringify({
            username: data.get('username'),
            password: data.get('password'),
            }),
          headers : { 'Content-type' : 'application/json; charset=UTF-8' },
          credentials: 'include'
      });

      console.log(response);

      if(response.status === 200){
        const data = await response.json();

        setIsAuthenticated(true);
        setUserInfo(data);
        const c = Cookies.get("connect.sid");
        console.log(c);
        Cookies.remove('connect.sid');

        navigate('/',{ replace: true });
      }
      else{
        console.log("Data not found");
      }
      }

      catch(error) {
        console.log(error);
      }


      // .then((response) => response.json()).then((data) => {
      
      //   console.log(data);
      //     if(data === 200){

      //       setIsAuthenticated(true);

      //       setUserInfo()

      //       navigate('/',{ replace: true });
      //     }
      //     else{
      //       console.log("Data not found");
      //     }

      // }).catch((err) => {
      //     console.log(err);
      // })
      
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="uname"
              label="Username"
              name="username"
              autoComplete="uname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="pass"
              name="password"
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <Link to="/SignUp">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}


export default Login