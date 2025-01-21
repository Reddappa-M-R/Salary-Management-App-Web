import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const DesiresPage = () => {
  const [desiresData, setDesiresData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch('https://salary-management-app-blond.vercel.app/desires')
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setDesiresData(data.data); // Use fetched data
        } else {
          // Fallback to dummy data if no data is returned
          setDesiresData([
            {
              id: 1,
              Desires: 'Office Supplies',
              amount: 100,
              date: new Date().toISOString(),
            },
            {
              id: 2,
              Desires: 'Projector',
              amount: 500,
              date: new Date().toISOString(),
            },
            {
              id: 3,
              Desires: 'Team Lunch',
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
  

  const deleteDesire = async (desiresId) => {
    try {
      const response = await fetch(`https://salary-management-app-blond.vercel.app/desires/${desiresId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the desires');
      }

      // Re-fetch the data after successful deletion
      const newData = await fetch('https://salary-management-app-blond.vercel.app/desires')
        .then((response) => response.json())
        .then((data) => data.data); // Get the updated data

      setDesiresData(newData); // Update the state with the new data
    } catch (error) {
      console.error('Error deleting desires:', error);
      setError('Failed to delete the desires.');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = desiresData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < desiresData.length) {
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

  const totalPages = Math.ceil(desiresData.length / itemsPerPage);
  const isNextPageAvailable = currentPage * itemsPerPage < desiresData.length;
  const isFirstPage = currentPage === 1;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: 'red' }}>Desires</h2>
      
      {/* "Create New Desire" Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/create-desires')}
          style={{
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Create New Desire
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: 'red' }}>Loading...</div>
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
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Id</th>
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Desire</th>
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Amount</th>
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Date</th>
                <th style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} style={{ backgroundColor: 'white' }}>
                    {/* Replace item.id with dynamic index */}
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.Desires}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.amount)}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {new Date(item.date).toLocaleDateString('en-GB')}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteDesire(item.id)}
                        style={{
                          cursor: item.isDummy ? 'not-allowed' : 'pointer',
                          color: item.isDummy ? 'gray' : 'gray',
                          fontSize: '16px',
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '10px', color: 'red' }}>
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

          <div style={{ alignSelf: 'center', color: 'red' }}>
            Page {currentPage} of {totalPages}
          </div>

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

export default DesiresPage;
