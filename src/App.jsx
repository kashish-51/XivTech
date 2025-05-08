import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAssets } from './features/cryptoSlice';
import CryptoTable from './components/CryptoTable';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateAssets());
    }, 1500); // every 1.5s

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="app-container">
      <h1 className="app-title"> Real-Time Crypto Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
