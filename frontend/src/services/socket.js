
// src/services/socket.js
export function initSocket(onData) {
  const ws = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const updated = {};
    data.forEach((coin) => {
      const symbol = coin.s.toLowerCase();
      if (['btcusdt', 'ethusdt', 'solusdt', 'dogeusdt', 'ltcusdt'].includes(symbol)) {
        updated[symbol] = parseFloat(coin.c).toFixed(8);
      }
    });


    onData(updated);
  };

  return ws;
}






