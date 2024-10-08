import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const fetchTopAssets = async () => {
  const response = await fetch('https://api.coincap.io/v2/assets?limit=50');
  const data = await response.json();
  return data.data;
};

const Index = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: assets, isLoading, error } = useQuery({
    queryKey: ['topAssets'],
    queryFn: fetchTopAssets,
  });

  if (isLoading) return <div className="text-3xl font-bold text-center mt-10">Loading...</div>;
  if (error) return <div className="text-3xl font-bold text-center mt-10 text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neobrutalism-blue via-neobrutalism-pink to-neobrutalism-yellow p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-black text-white p-3 rounded-lg shadow-lg">
        <h1 className="text-3xl font-black mb-2 sm:mb-0">
          Top 50 Crypto Assets
          <span className="block text-sm font-normal mt-1">powered by iT'24</span>
        </h1>
        <div className="text-base text-center">
          <div>{currentDateTime.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div>{currentDateTime.toLocaleTimeString('th-TH')}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {assets.map((asset, index) => (
          <Link to={`/asset/${asset.id}`} key={asset.id} className="block">
            <div className={`border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-neobrutalism-yellow transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-neobrutalism-pink bg-opacity-30'}`}>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-black">{asset.name} <span className="text-base font-bold">({asset.symbol})</span></h2>
                <span className="text-sm font-bold">Rank: {asset.rank}</span>
              </div>
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
