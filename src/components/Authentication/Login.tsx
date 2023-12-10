import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../../CryptoContext';
import axios from 'axios';
import { Box, Button, TextField } from '@material-ui/core';

interface LoginProps {
  handleClose: () => void;
}

const Login: React.FC<LoginProps> = ({ handleClose }) => {
  const [email, setEmail] = useState('test1@test.com');
  const [password, setPassword] = useState('Doris2601');

  const { setAlert, setUser } = CryptoState();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please enter an email and password.",
        type: 'error',
      });
      return;
    }
    try {
      const loginResponse = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:dXrDxx2J/auth/login', { email, password });
      const authToken = loginResponse.data.authToken;

      if (loginResponse.data.email && loginResponse.data.password) {

        setAlert({
          open: true,
          message: `Registration successful! Welcome ${loginResponse.data.email}.`,
          type: 'success',
        });

        const authResponse = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:dXrDxx2J/auth/me", {
          headers: {
            'Authorization': `${authToken}`
          }
        });

        console.log("AUTH RESPONSE");
        console.log(authResponse);

        const user = {
          id: authResponse.data.result_1.id,
          email: authResponse.data.result_1.email,
          token: authToken,
          watchlist: authResponse.data.result_1.watchlist ? {
            id: authResponse.data.result_1.watchlist.id,
            list_coins: authResponse.data.result_1.watchlist.list_coins,
          } : null,
        };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));

        handleClose();
      } else {
        throw new Error("User data not found in the response.");
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Registration failed. Please try again.",
        type: 'error',
      });
      console.log(error);
    }
  };

  return (
    <Box
      style={{
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: "20px",
      }}
    >
      <TextField
        variant='outlined'
        type='email'
        label='Enter email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type='password'
        label='Enter password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant='contained'
        size='large'
        style={{ backgroundColor: '#EEBC1D' }}
        onClick={handleSubmit}
      >
        Login
      </Button>

    </Box>
  );
};

export default Login;