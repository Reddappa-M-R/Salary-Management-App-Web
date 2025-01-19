import React, { useState, useEffect } from 'react';

const DesirePage = () => {
  const [desireData, setDesireData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to show per page
  const [loading, setLoading] = useState(true); // Loading state to show loading message
  const [error, setError] = useState(''); // Error state for API issues

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching new data
    setError(''); // Reset error before making a request
    fetch('https://salary-management-app-h2f4-gfz329ei5-reddappa-m-rs-projects.vercel.app/desires/')
      .then((response) => response.json())
      .then((data) => {
        setDesireData(data.data); // Set the 'data' from the API response
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('There was an error loading the data.');
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  // Get the current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = desireData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < desireData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Calculate total pages
  const totalPages = Math.ceil(desireData.length / itemsPerPage);

  // Determine if there's a next page
  const isNextPageAvailable = currentPage * itemsPerPage < desireData.length;
  // Determine if we're on the first page
  const isFirstPage = currentPage === 1;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: 'red' }}>Desires</h2>
      
      {loading ? (
        <div style={{ textAlign: 'center', color: 'red' }}>Loading...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
      ) : (
        <div>
          {/* Items per page selector */}
          <div style={{ marginBottom: '10px', textAlign: 'right' }}>
            <label style={{ marginRight: '10px' }}>Items per page: </label>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Id</th>
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Desire</th>
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Amount</th>
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} style={{ backgroundColor: 'white' }}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.desire_id}</td>
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
      )}

      {/* Pagination Controls */}
      {!loading && !error && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {/* Previous Page button */}
          <div>
            <button
              onClick={handlePreviousPage}
              disabled={isFirstPage}
              style={{
                padding: '10px 20px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: isFirstPage ? 'not-allowed' : 'pointer',
                marginRight: '10px',
              }}
            >
              Previous Page
            </button>
          </div>

          {/* Page Info */}
          <div style={{ alignSelf: 'center', color: 'red' }}>
            Page {currentPage} of {totalPages}
          </div>

          {/* Next Page button */}
          <div>
            <button
              onClick={handleNextPage}
              disabled={!isNextPageAvailable}
              style={{
                padding: '10px 20px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: isNextPageAvailable ? 'pointer' : 'not-allowed',
              }}
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesirePage;
