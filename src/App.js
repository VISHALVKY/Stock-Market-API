import React, { useState, useEffect } from "react";
import "./App.css";

function API() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompaniesData, setSelectedCompaniesData] = useState([]);
  const [data, setData] = useState([]);

  const handleScript = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCompanyData = data.find(company => company.companyName === selectedCompany);
    setSelectedCompaniesData([...selectedCompaniesData, selectedCompanyData]);
    setShowForm(false);
  };

  const handleSelectChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  useEffect(() => {
    fetch("https://mocki.io/v1/e1706842-8c58-4641-9671-2573e96c3682")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "Ok" && response.result) {
          setData(response.result);
        } else {
          console.error("Failed to fetch data:", response.message);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <button onClick={handleScript}>+</button>
      {showForm && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <select onChange={handleSelectChange} value={selectedCompany}>
              <option value="" disabled>Please select company</option>
              {data.map((company, index) => (
                <option key={index} value={company.companyName}>{company.companyName}</option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
          <button onClick={handleScript}>close</button>
        </div>
      )}

      {selectedCompaniesData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Strike Price</th>
              <th>CE PE</th>
              <th>Expiry Date</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            {selectedCompaniesData.map((companyData, index) => (
              <tr key={index}>
                <td>{companyData.companyName}</td>
                <td>{companyData.strikePrice}</td>
                <td>{companyData.cepe}</td>
                <td>{companyData.expiry}</td>
                <td>{companyData.exchange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default API;