import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Coin, CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: 350,
    height: '100%',
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'monospace',
  },
  profile: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    height: '92%',
  },
  picture: {
    height: 200,
    width: 200,
    cursor: 'pointer',
    backgroundColor: '#EEBC1D',
    objectFit: 'contain',
  },
  logout: {
    height: '8%',
    width: '100%',
    backgroundColor: '#EEBC1D',
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    overflowY: 'scroll',
  },
});

interface UserSidebarProps {}

const UserSidebar: React.FC<UserSidebarProps> = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, coins } = CryptoState();

  const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    window.location.reload();

    setAlert({
      open: true,
      message: 'Logged out successfully',
      type: 'success',
    });

    toggleDrawer('right', false);
  };

  const coinMap: {[key: string]: Coin} = {};
  coins.forEach((coin) => {
    coinMap[coin.symbol.toLowerCase()] = coin;
  });

  return (
    <div>
      <React.Fragment key='right'>
          <Avatar
            onClick={toggleDrawer('right', true)}
            style={{
              height: 38,
              width: 38,
              cursor: 'pointer',
              backgroundColor: '#EEBC1D',
            }}
            alt={user?.email}
          />
          <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar className={classes.picture} alt={user?.email} />
                <span
                  style={{
                    width: '100%',
                    fontSize: 25,
                    textAlign: 'center',
                    fontWeight: 'bolder',
                    wordWrap: 'break-word',
                  }}
                >
                  {user?.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: '0 0 5px black' }}>Watchlist</span>
                  {user?.watchlist?.list_coins.map((coin) => (
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        textTransform: 'uppercase',
                      }}
                      key={coin}
                    >
                      <span>{coin}</span>
                      <span>{Object.keys(coinMap).length === 0 ? "N/A" : coinMap[coin.toLowerCase()].current_price}</span>
                    </span>
                  ))}
                </div>
              </div>
              <Button variant="contained" className={classes.logout} onClick={logOut}>
                Logout
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
};

export default UserSidebar;