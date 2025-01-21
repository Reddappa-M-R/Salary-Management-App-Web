import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import xlsx library

const NeedsPage = () => {
  const [needsData, setNeedsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch('https://salary-management-app-blond.vercel.app/needs')
      .then((response) => response.json())
      .then((data) => {
        setNeedsData(data.data || []); // Use dummy data if the API returns empty
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('There was an error loading the data.');
        setLoading(false);
      });
  }, []);

  const exportToExcel = () => {
    if (needsData.length === 0) {
      alert('No data available to export!');
      return;
    }

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      needsData.map((item, index) => ({
        Index: index + 1,
        Need: item.Needs,
        Amount: item.amount,
        Date: new Date(item.date).toLocaleDateString('en-IN'),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Needs Data');

    // Export the Excel file
    XLSX.writeFile(workbook, 'NeedsData.xlsx');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = needsData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: 'green' }}>Needs</h2>

      {/* Export to Excel Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={exportToExcel}
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Export to Excel
        </button>
        <button
          onClick={() => navigate('/create-need')}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Create New Need
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'green' }}>Loading...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Index</th>
              <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Need</th>
              <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Amount</th>
              <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} style={{ backgroundColor: 'white' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.Needs}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    ₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {new Date(item.date).toLocaleDateString('en-IN')}
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
      )}
    </div>
  );
};

export default NeedsPage;
