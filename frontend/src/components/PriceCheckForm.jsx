// src/components/PriceCheckForm.js
import React, { useState } from 'react';


function PriceCheckForm() {
  const [productUrl, setProductUrl] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [result, SetResult] = useState('');


  const handleCheckPrice = async () => {
    try {
      const response = await fetch(`http://localhost:3000/check-price?url=${encodeURIComponent(productUrl)}&tgtPrice=${targetPrice}`);

      
      if (response.ok) {
        const text = await response.text();
  
        try {
          const data = JSON.parse(text);
          setCurrentPrice(data.price);
          SetResult(data.result);
        } catch (jsonError) {
          console.error('JSON Parsing Error:', jsonError);
        }
      } else {
        console.error('Fetch Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  


  return (
    <div>
      <h2>Price Checker</h2>
      <div>
        <label>Product URL:</label>
        <input type="text" value={productUrl} onChange={(e) => setProductUrl(e.target.value)}/>
      </div>
      <div>
        <label>Target Price:</label>
        <input type="number" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)}/>
      </div>
      <button onClick={handleCheckPrice}>Check Price</button>
      {currentPrice && <p>Current Price: ₹ {currentPrice}</p>}
      {result && <p>{result}</p>}
    </div>
  );
}

export default PriceCheckForm;
