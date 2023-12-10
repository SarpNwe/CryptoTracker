import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { Coin, CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Button, LinearProgress, Theme, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../components/Banner/Carousel';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "column",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<any>();

  const { currency, symbol, user, setUser } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id ?? ""));
    setCoin(data);
  };

  const addToWatchlist = async () => {
    if(user.watchlist === null) {
      const list = {
        user_id: user.id,
        list_coins: [coin.symbol.toUpperCase()]
      };
      
      const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:dXrDxx2J/watchlist',  { headers: { 'Content-Type': 'application/json', 'Authorization': `${user.token}` }, data: JSON.stringify(list) })
      console.log("POST");
      console.log(response);

    } else {
      const list = {
        watchlist_id: user.watchlist.id,
        user_id: user.id,
        list_coins: [...user.watchlist.list_coins, coin.symbol.toUpperCase()]
      };

      const response = await axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:dXrDxx2J/watchlist/${user.watchlist.id}`,  list, { headers: { 'Content-Type': 'application/json', 'Authorization': `${user.token}` } })
      setUser({
        ...user,
        watchlist: {
          ...user.watchlist,
          list_coins: response.data.list_coins
        }
      });
    }
  };

  const removeFromWatchlist = async () => {
    if(user.watchlist === null) return;

    const list = {
      watchlist_id: user.watchlist.id,
      user_id: user.id,
      list_coins: [...user.watchlist.list_coins.filter((item) => item.toLowerCase() !== coin.symbol.toLowerCase())]
    };

    const response = await axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:dXrDxx2J/watchlist/${user.watchlist.id}`,  list, { headers: { 'Content-Type': 'application/json', 'Authorization': `${user.token}` } })
    setUser({
      ...user,
      watchlist: {
        ...user.watchlist,
        list_coins: response.data.list_coins
      }
    });
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const classes = useStyles();

  const isInWatchlist = (coin: Coin) => {
    console.log("IS IN WATCHLIST", coin);
    return user.watchlist?.list_coins.includes(coin.symbol.toUpperCase());
  }

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0].concat(". "))}
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()] ?? 0
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>

          {user.email !== '' && isInWatchlist(coin) ? 
            (<Button
              onClick={removeFromWatchlist}
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "red",
              }}
            >
              Remove from Watchlist
            </Button>)
            : 
            (<Button
              onClick={addToWatchlist}
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#EEBC1D",
              }}
            >
              Add to Watchlist
            </Button>)
          }
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;