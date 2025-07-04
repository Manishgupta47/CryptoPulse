import { useEffect, useState } from 'react';
import CryptoCard from './components/CryptoCard';
import DownloadReport from './components/DownloadReport';
import './App.css';

const WEBSOCKET_URL =
  'wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/solusdt@trade/dogeusdt@trade/ltcusdt@trade';

const coins = ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'litecoin'];

function App() {
  const [prices, setPrices] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);
    ws.onmessage = (msg) => {
      const { stream, data } = JSON.parse(msg.data);
      const symbolMap = {
        btcusdt: 'bitcoin',
        ethusdt: 'ethereum',
        solusdt: 'solana',
        dogeusdt: 'dogecoin',
        ltcusdt: 'litecoin',
      };
      const coin = symbolMap[stream.split('@')[0]];
      const price = data.p;
      setPrices((prev) => ({ ...prev, [coin]: price }));
    };
    return () => ws.close();
  }, []);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <button className="toggle-btn" onClick={toggleTheme}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1>📈 CryptoPulse</h1>
      <DownloadReport prices={prices} />
      <div className="grid">
        {coins.map((coin) => (
          <CryptoCard key={coin} name={coin} price={prices[coin]} />
        ))}
      </div>
    </div>
  );
}

export default App;





