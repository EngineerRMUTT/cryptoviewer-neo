import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const fetchAssetDetails = async (id) => {
  const [assetResponse, historyResponse] = await Promise.all([
    fetch(`https://api.coincap.io/v2/assets/${id}`),
    fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
  ]);
  const assetData = await assetResponse.json();
  const historyData = await historyResponse.json();
  return { asset: assetData.data, history: historyData.data };
};

const AssetDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['assetDetail', id],
    queryFn: () => fetchAssetDetails(id),
  });

  if (isLoading) return <div className="text-4xl font-bold text-center mt-10">Loading...</div>;
  if (error) return <div className="text-4xl font-bold text-center mt-10 text-red-600">Error: {error.message}</div>;

  const { asset, history } = data;

  return (
    <div className="min-h-screen bg-pink-200 p-8">
      <h1 className="text-6xl font-black mb-8 text-center bg-black text-white p-4">{asset.name} ({asset.symbol})</h1>
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
        <p className="text-2xl font-bold mb-2">Rank: {asset.rank}</p>
        <p className="text-xl mb-2">Price: ${parseFloat(asset.priceUsd).toFixed(2)}</p>
        <p className="text-xl mb-2">Market Cap: ${parseFloat(asset.marketCapUsd).toFixed(0)}</p>
        <p className="text-xl mb-2">24h Change: {parseFloat(asset.changePercent24Hr).toFixed(2)}%</p>
      </div>
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-3xl font-bold mb-4">Price History</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={history}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetDetail;