import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import './CryptoTable.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function CryptoTable() {
  const assets = useSelector((state) => state.crypto.assets);

  const formatNumber = (num) =>
    num >= 1e12
      ? (num / 1e12).toFixed(2) + 'T'
      : num >= 1e9
      ? (num / 1e9).toFixed(2) + 'B'
      : num >= 1e6
      ? (num / 1e6).toFixed(2) + 'M'
      : num?.toLocaleString();

  const getChartData = (prices) => ({
    labels: prices.map((_, i) => i + 1),
    datasets: [
      {
        data: prices,
        borderColor: '#2196f3',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: { point: { radius: 0 } },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr className="table-header">
            <th>#</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Max Supply</th>
            <th>7d Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((coin, index) => (
            <tr key={coin.id} className="table-row">
              <td>{index + 1}</td>
              <td><img src={coin.logo} alt={coin.symbol} className="coin-logo" /></td>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>${coin.price}</td>
              <td className={Number(coin.change1h) >= 0 ? 'positive' : 'negative'}>
                {coin.change1h}%
              </td>
              <td className={Number(coin.change24h) >= 0 ? 'positive' : 'negative'}>
                {coin.change24h}%
              </td>
              <td className={Number(coin.change7d) >= 0 ? 'positive' : 'negative'}>
                {coin.change7d}%
              </td>
              <td>${formatNumber(coin.marketCap)}</td>
              <td>${formatNumber(coin.volume24h)}</td>
              <td>{coin.circulatingSupply}</td>
              <td>{coin.maxSupply}</td>
              <td style={{ width: '80px', height: '40px' }}>
                {coin.sparkline ? (
                  <Line data={getChartData(coin.sparkline)} options={chartOptions} />
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
