// React component
import React, { useState, useEffect } from 'react';

function StockPrice({ symbol }) {
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/stock-price/${symbol}`)
      .then(response => response.json())
      .then(data => {
        setPrice(data.price);
      })
      .catch(error => {
        console.error('Error fetching stock price:', error);
      });
  }, [symbol]);

  return (
    <div>
      <h1>Stock Price for {symbol}: {price}</h1>
    </div>
  );
}

export default StockPrice;
