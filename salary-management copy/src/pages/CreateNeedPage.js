import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNeedPage = () => {
  const [need, setNeed] = useState({
    Needs: '',
    amount: '',
    date: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNeed({ ...need, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://salary-management-app-h2f4.vercel.app/needs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(need),
      });

      if (!response.ok) {
        throw new Error('Failed to create the need');
      }

      const data = await response.json();
      setSuccessMessage('Need created successfully!');
      setError('');
      setNeed({ Needs: '', amount: '', date: '' }); // Clear form after submission

      // Redirect to the NeedsPage after successful form submission
      setTimeout(() => {
        navigate('/needs');  // Navigate to Needs page after success
      }, 1000); // Delay navigation by 1 second to show success message
    } catch (err) {
      setError('There was an error creating the need');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Create New Need</h3>
      <form onSubmit={handleSubmit}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px', backgroundColor: 'green', color: 'white' }}>Field</th>
              <th style={{ textAlign: 'left', padding: '10px', backgroundColor: 'green', color: 'white' }}>Input</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Need</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <input
                  type="text"
                  name="Needs"
                  value={need.Needs}
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
                  value={need.amount}
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
                  value={need.date}
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
                  style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none' }}
                >
                  Create Need
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
    </div>
  );
};

export default CreateNeedPage;
