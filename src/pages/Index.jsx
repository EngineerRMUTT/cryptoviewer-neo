import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const fetchTopAssets = async () => {
  const response = await fetch('https://api.coincap.io/v2/assets?limit=50');
  const data = await response.json();
  return data.data;
};

const Index = () => {
  const { data: assets, isLoading, error } = useQuery({
    queryKey: ['topAssets'],
    queryFn: fetchTopAssets,
  });

  if (isLoading) return <div className="text-3xl font-bold text-center mt-10">Loading...</div>;
  if (error) return <div className="text-3xl font-bold text-center mt-10 text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-yellow-200 p-4">
      <h1 className="text-5xl font-black mb-6 text-center bg-black text-white p-3">Top 50 Crypto Assets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <Link to={`/asset/${asset.id}`} key={asset.id} className="block">
            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-blue-200 transition-colors">
              <h2 className="text-lg font-bold mb-1">{asset.name} ({asset.symbol})</h2>
              <p className="text-sm font-semibold">Rank: {asset.rank}</p>
              <p className="text-xs">Price: ${parseFloat(asset.priceUsd).toFixed(2)}</p>
              <p className="text-xs">MCap: ${(parseFloat(asset.marketCapUsd) / 1e9).toFixed(2)}B</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
