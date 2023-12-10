import { Box, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';

interface SignUpProps {
  handleClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAlert } = CryptoState();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('handling submit');
    try {
      const result = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:dXrDxx2J/auth/signup', { email, password });

      console.log('called API');
      console.log(result.data);

      if (result.data.email && result.data.password) {
        console.log(result.data.email);
        console.log(result.data.password);

        setAlert({
          open: true,
          message: `Registration successful! Welcome ${result.data.email}.`,
          type: 'success',
        });
        console.log('set alert');
        handleClose();
      } else {
        throw new Error('User data not found in the response.');
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Registration failed. Please try again.',
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
        gap: '20px',
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: '#EEBC1D' }}
        onClick={handleSubmit}
      >
        SignUp
      </Button>
    </Box>
  );
};

export default SignUp;