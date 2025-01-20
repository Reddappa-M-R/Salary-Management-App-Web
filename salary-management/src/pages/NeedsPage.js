import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const NeedsPage = () => {
  const [needsData, setNeedsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch('https://salary-management-app-blond.vercel.app/needs')
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setNeedsData(data.data); // Use fetched data
        } else {
          // Fallback to dummy data if no data is returned
          setNeedsData([
            {
              id: 1,
              Needs: 'Office Supplies',
              amount: 100,
              date: new Date().toISOString(),
            },
            {
              id: 2,
              Needs: 'Projector',
              amount: 500,
              date: new Date().toISOString(),
            },
            {
              id: 3,
              Needs: 'Team Lunch',
              amount: 200,
              date: new Date().toISOString(),
            },
          ]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('There was an error loading the data.');
        setLoading(false);
      });
  }, []);
  

  const deleteNeed = async (needId) => {
    try {
      const response = await fetch(`https://salary-management-app-blond.vercel.app/needs/${needId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the need');
      }

      // Re-fetch the data after successful deletion
      const newData = await fetch('https://salary-management-app-blond.vercel.app/needs')
        .then((response) => response.json())
        .then((data) => data.data); // Get the updated data

      setNeedsData(newData); // Update the state with the new data
    } catch (error) {
      console.error('Error deleting need:', error);
      setError('Failed to delete the need.');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = needsData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < needsData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(needsData.length / itemsPerPage);
  const isNextPageAvailable = currentPage * itemsPerPage < needsData.length;
  const isFirstPage = currentPage === 1;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: 'green' }}>Needs</h2>
      
      {/* "Create New Need" Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/create-need')}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
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
        <div>
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
                <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Id</th>
                <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Need</th>
                <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Amount</th>
                <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Date</th>
                <th style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} style={{ backgroundColor: 'white' }}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.Needs}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.amount}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      <button
                        onClick={() => deleteNeed(item.id)}
                        style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>
            <button
              onClick={handlePreviousPage}
              disabled={isFirstPage}
              style={{
                padding: '10px 20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                cursor: isFirstPage ? 'not-allowed' : 'pointer',
                marginRight: '10px',
              }}
            >
              Previous Page
            </button>
          </div>

          <div style={{ alignSelf: 'center', color: 'green' }}>
            Page {currentPage} of {totalPages}
          </div>

          <div>
            <button
              onClick={handleNextPage}
              disabled={!isNextPageAvailable}
              style={{
                padding: '10px 20px',
                backgroundColor: 'green',
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

export default NeedsPage;
