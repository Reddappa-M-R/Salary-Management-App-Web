import React from 'react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import NeedsPage from './pages/NeedsPage';
import DesiresPage from './pages/DesiresPage';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <NavigationBar />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/needs" element={<NeedsPage />} />
            <Route path="/desires" element={<DesiresPage />} />
            <Route path="/" element={<h2>Welcome to Salary Management</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
