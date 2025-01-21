import React, { useState, useEffect } from 'react';

const DashboardPage = () => {
  const [needsData, setNeedsData] = useState([]);
  const [desiresData, setDesiresData] = useState([]);
  const [loading, setLoading] = useState(true);  // To track loading status
  const [error, setError] = useState('');  // To track any errors

  // Fetch data for Needs and Desires
  useEffect(() => {
    setLoading(true);  // Set loading true while data is being fetched
    setError('');  // Reset any previous errors

    // Fetch Needs Data
    const fetchNeeds = fetch('https://salary-management-app-blond.vercel.app/needs')
      .then((response) => response.json())
      .then((data) => setNeedsData(data.data))
      .catch((error) => {
        console.error('Error fetching Needs data:', error);
        setError('Failed to load Needs data');
      });

    // Fetch Desires Data
    const fetchDesires = fetch('https://salary-management-app-blond.vercel.app/desires')
      .then((response) => response.json())
      .then((data) => setDesiresData(data.data))
      .catch((error) => {
        console.error('Error fetching Desires data:', error);
        setError('Failed to load Desires data');
      });

    // Once both fetches are done, set loading to false
    Promise.all([fetchNeeds, fetchDesires])
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: 'green' }}>Dashboard</h2>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'green' }}>Loading...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <div>
          {/* Display Needs Table */}
          <div style={{ marginBottom: '30px' }}>
            <h3>Needs</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Id</th>
                  <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Need</th>
                  <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Amount</th>
                  <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {needsData.length > 0 ? (
                  needsData.map((item) => (
                    <tr key={item.id}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.Needs}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.amount}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Display Desires Table */}
          <div>
            <h3>Desires</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Id</th>
                  <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Desire</th>
                  <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Amount</th>
                  <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {desiresData.length > 0 ? (
                  desiresData.map((item) => (
                    <tr key={item.id}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.Desires}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.amount}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
