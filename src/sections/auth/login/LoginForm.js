import axios from 'axios'
import { useState } from 'react';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import swal from '@sweetalert/with-react';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async e => {
    e.preventDefault()

    if (!login || !password) {
      swal({
        title: "Un erreur est survenue!",
        text: "Veuillez remplir tous les formulaires.",
        icon: "error",
        button: "OK",
      });
    } 
    else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/user/login",
        { login, password },
        config
      );

      sessionStorage.setItem("userInfo", JSON.stringify(data));
      window.location.href = "http://localhost:3000/dashboard/home?welcome";
    }
  };

  return (
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Adresse mail"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Stack>

        <br /><br />

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Connexion
        </LoadingButton>
      </form>
  );
}
