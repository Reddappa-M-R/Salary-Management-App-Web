import React from 'react';
import NavigationBar from './components/NavigationBar';
import FinancialDashboard from './components/FinancialDashboard';
import DashboardPage from './pages/DashBoardPage'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import NeedsPage from './pages/NeedsPage';
import CreateNeedPage from './pages/CreateNeedPage'; // Path to CreateNeedPage
import DesiresPage from './pages/DesiresPage';
import CreateDesirePage from './pages/CreateDesirePage';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <NavigationBar />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/needs" element={<NeedsPage />} />
            <Route path="/create-need" element={<CreateNeedPage />} /> {/* Create new need page */}
            <Route path="/desires" element={<DesiresPage />} />
            <Route path="/create-desires" element={<CreateDesirePage />} /> 
            <Route path="/financial-dashboard" element={<FinancialDashboard />} />
            <Route path="/" element={<h2>Welcome to Salary Management</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
