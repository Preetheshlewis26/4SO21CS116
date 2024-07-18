import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:9867/numbers/'; // URL to your Flask API

const AverageCalculator = () => {
  const [numberId, setNumberId] = useState('');
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [fetchedNumbers, setFetchedNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchNumbers = async () => {
    try {
      const response = await axios.get(`${API_URL}${numberId}`);
      const data = response.data;
      setPrevState(data.windowPrevState);
      setCurrState(data.windowCurrState);
      setFetchedNumbers(data.numbers);
      setAverage(data.avg);
      setError(null);
    } catch (err) {
      setError('Failed to fetch numbers');
    }
  };

  return (
    <div>
      <h1>Average Calculator Microservice</h1>
      <input
        type="text"
        placeholder="Enter number ID (p, f, e, r)"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
      />
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Results</h2>
        <p><strong>Previous State:</strong> {JSON.stringify(prevState)}</p>
        <p><strong>Current State:</strong> {JSON.stringify(currState)}</p>
        <p><strong>Fetched Numbers:</strong> {JSON.stringify(fetchedNumbers)}</p>
        <p><strong>Average:</strong> {average}</p>
      </div>
    </div>
  );
};

export default AverageCalculator;
