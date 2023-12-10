import React from 'react';
import { CryptoState } from '../CryptoContext';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alerts: React.FC = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event: React.SyntheticEvent<Element, Event>, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity={alert.type as AlertProps['severity']}
          elevation={10}
          variant="filled"
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Alerts;