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

  if (isLoading) return <div className="text-4xl font-bold text-center mt-10">Loading...</div>;
  if (error) return <div className="text-4xl font-bold text-center mt-10 text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-yellow-200 p-8">
      <h1 className="text-6xl font-black mb-8 text-center bg-black text-white p-4">Top 50 Crypto Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <Link to={`/asset/${asset.id}`} key={asset.id} className="block">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 hover:bg-blue-200 transition-colors">
              <h2 className="text-2xl font-bold mb-2">{asset.name} ({asset.symbol})</h2>
              <p className="text-xl font-semibold">Rank: {asset.rank}</p>
              <p className="text-lg">Price: ${parseFloat(asset.priceUsd).toFixed(2)}</p>
              <p className="text-lg">Market Cap: ${parseFloat(asset.marketCapUsd).toFixed(0)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
