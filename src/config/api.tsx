export const CoinList = (currency: string) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id: string, days = 365, currency: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency: string) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;




export const PriceToEuro = (id: string) => 
`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=eur&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`


export const PriceToUsd = (id: string) => 
`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`





// const fetchCoins = async () => {
//   setLoading(true)
//   const res = await fetch('https://api.coinlore.net/api/tickers/')
//   const data = await res.json()
//   setCoins(data.data)
//   setLoading(false)
// } 