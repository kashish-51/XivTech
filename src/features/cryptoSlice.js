import { createSlice } from '@reduxjs/toolkit';
import sampleData from './sampleData';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    assets: sampleData,
  },
  reducers: {
    updateAssets: (state) => {
      state.assets = state.assets.map((asset) => {
        const randomFactor = (Math.random() * 2 - 1).toFixed(4); // -1% to +1%
        const price = (asset.price * (1 + randomFactor / 100)).toFixed(2);
        const change1h = (parseFloat(asset.change1h) + parseFloat(randomFactor)).toFixed(2);
        const change24h = (parseFloat(asset.change24h) + parseFloat(randomFactor)).toFixed(2);
        const change7d = (parseFloat(asset.change7d) + parseFloat(randomFactor)).toFixed(2);
        const volume = (asset.volume24h * (1 + randomFactor / 100)).toFixed(0);

        return {
          ...asset,
          price,
          change1h,
          change24h,
          change7d,
          volume24h: volume,
        };
      });
    },
  },
});

export const { updateAssets } = cryptoSlice.actions;
export default cryptoSlice.reducer;
