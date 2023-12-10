import React, { createContext, useContext, useEffect, useState } from 'react';

interface Alert {
  open: boolean;
  message?: string;
  type?: string;
}

interface Watchlist {
  id: number;
  list_coins: string[];
}

interface User {
  id: number;
  email: string;
  token: string;
  watchlist: Watchlist | null;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
}

interface CryptoContextProps {
  children: React.ReactNode;
}

interface CryptoContextValue {
  currency: string;
  symbol: string;
  setCurrency: (currency: string) => void;
  alert: Alert;
  setAlert: (alert: Alert) => void;
  user: User;
  setUser: (user: User) => void;
  coins: Coin[];
  setCoins: (coins: Coin[]) => void;
}

const Crypto = createContext<CryptoContextValue | undefined>(undefined);

const CryptoContext: React.FC<CryptoContextProps> = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');
  const [alert, setAlert] = useState<Alert>({
    open: false,
    message: '',
    type: 'success',
  });

  const storedUser = JSON.parse(localStorage.getItem('user') || "{}");
  let userToSave: User = {
    email: '',
    id: 0,
    token: '',
    watchlist: null,
  };
  if(storedUser.id) {
    userToSave = {
      email: storedUser.email,
      id: storedUser.id,
      token: storedUser.authToken,
      watchlist: storedUser.watchlist ? {
        id: storedUser.watchlist.id,
        list_coins: storedUser.watchlist.list_coins,
      } : null,
    };
  }

  let [user, setUser] = useState<User>(userToSave);

  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    if (currency === 'USD') {
      setSymbol('$');
    }
    if (currency === 'EUR') {
      setSymbol('€');
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency, alert, setAlert, user, setUser, coins, setCoins }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = (): CryptoContextValue => {
  const context = useContext(Crypto);
  if (!context) {
    throw new Error('CryptoState must be used within a CryptoContextProvider');
  }
  return context;
};