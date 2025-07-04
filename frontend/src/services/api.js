export const fetchHistory = async (coin) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`);
    const json = await res.json();
    return json.prices || [];
  };
  

  
  
  