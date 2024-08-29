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
    <div className="min-h-screen bg-yellow-200 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-black text-white p-3">
        <h1 className="text-4xl font-black mb-2 sm:mb-0">
          Top 50 Crypto Assets
          <span className="block text-lg font-normal mt-1">powered by iT'24</span>
        </h1>
        <div className="text-lg text-center">
          <div>{currentDateTime.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div>{currentDateTime.toLocaleTimeString('th-TH')}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {assets.map((asset, index) => (
          <Link to={`/asset/${asset.id}`} key={asset.id} className="block">
            <div className={`border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-3 hover:bg-blue-200 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-yellow-100'}`}>
              <h2 className="text-xl font-black mb-2">{asset.name} <span className="text-lg font-bold">({asset.symbol})</span></h2>
              <p className="text-base font-bold">Rank: {asset.rank}</p>
              <p className="text-sm">Price: ${parseFloat(asset.priceUsd).toFixed(2)}</p>
              <p className="text-sm">MCap: ${(parseFloat(asset.marketCapUsd) / 1e9).toFixed(2)}B</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
