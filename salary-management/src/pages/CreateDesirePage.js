import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateDesirePage = () => {
  const [desires, setDesire] = useState({
    Desires: '',
    amount: '',
    date: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesire({ ...desires, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://salary-management-app-blond.vercel.app/desires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(desires),
      });

      if (!response.ok) {
        throw new Error('Failed to create the desires');
      }

      const data = await response.json();
      console.log('Desire created:', data);
      setSuccessMessage('Desire created successfully!');
      setError('');
      setDesire({ Desires: '', amount: '', date: '' }); // Clear form after submission

      // Redirect to the DesiresPage after successful form submission
      setTimeout(() => {
        navigate('/desires');  // Navigate to Desires page after success
      }, 1000); // Delay navigation by 1 second to show success message
    } catch (err) {
      setError('There was an error creating the desires');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Create New Desire</h3>
      <form onSubmit={handleSubmit}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', backgroundColor: 'red', color: 'white' }}>Field</th>
              <th style={{ textAlign: 'left', padding: '10px', backgroundColor: 'red', color: 'white' }}>Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Desire</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="text"
                  name="Desires"
                  value={desires.Desires}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '5px', width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Amount</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="number"
                  name="amount"
                  value={desires.amount}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '5px', width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Date</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="date"
                  name="date"
                  value={desires.date}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '5px', width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ padding: '10px', textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{ padding: '10px', backgroundColor: 'red', color: 'white', border: 'none' }}
                >
                  Create Desire
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {successMessage && <div style={{ color: 'red', marginTop: '10px' }}>{successMessage}</div>}
    </div>
  );
};

export default CreateDesirePage;
