import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios"; // Use axios or fetch to make API requests

const FinancialDashboard = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API or backend service
        const needsResponse = await axios.get('https://salary-management-app-blond.vercel.app/needs'); // Replace with actual endpoint
        const desiresResponse = await axios.get('https://salary-management-app-blond.vercel.app/desires'); // Replace with actual endpoint

        const needsData = needsResponse.data;
        const desiresData = desiresResponse.data;

        // Combine the data
        const data = [...needsData, ...desiresData];
        setCombinedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const exportToExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to a sheet
    const worksheet = XLSX.utils.json_to_sheet(combinedData);

    // Append the sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Needs_Desires");

    // Export to Excel file
    XLSX.writeFile(workbook, "Needs_Desires.xlsx");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "green" }}>Financial Dashboard</h2>
      
      <button
        onClick={exportToExcel}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Export Needs & Desires to Excel
      </button>

      <table style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "green", color: "white", padding: "10px" }}>No.</th>
            <th style={{ backgroundColor: "green", color: "white", padding: "10px" }}>Category</th>
            <th style={{ backgroundColor: "green", color: "white", padding: "10px" }}>Name</th>
            <th style={{ backgroundColor: "green", color: "white", padding: "10px" }}>Amount (₹)</th>
            <th style={{ backgroundColor: "green", color: "white", padding: "10px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.index}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.category}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>₹ {item.amount.toLocaleString()}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialDashboard;
