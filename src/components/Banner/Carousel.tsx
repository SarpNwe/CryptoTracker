import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    textDecoration: "none",
    '& img': {
      height: 80,
    },
    '& span': {
      fontSize: 12,
    },
    '&:hover': {
      color: "gold",
    },
  },
});

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel: React.FC = () => {
  const [trending, setTrending] = useState<any[]>([]);

  const classes = useStyles();

  // const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      console.log("GET TRENDING");
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/search/trending'
      );
      setTrending(data.coins);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []); //[currency]);

  const items = trending.map((coin) => {
    return (
      <div key={coin.item.id}>
        <Link
          className={classes.carouselItem}
          to={`/coins/${coin.item.id}`}
        >
          <img
            src={coin.item.large}
            alt={coin.item.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span>{coin.item.symbol}</span>
        </Link>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;