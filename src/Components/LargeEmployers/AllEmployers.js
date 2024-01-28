import React, { useState, useEffect } from "react";
import '../LargeEmployers/AllEmployers.css'
function AllEmployers() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [appliedJobs, setAppliedJobs] = useState(() => {
    // Initialize with jobs from localStorage
    return JSON.parse(localStorage.getItem("appliedJobs")) || [];
  });

  const handleDelete = (companyId) => {
   console.log(companyId)
    fetch(`http://localhost:8080/company/${companyId}/`, { 
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Remove the company from the state to update the UI
        setCompanies(companies.filter(company => company.id !== companyId));
      } else {
        // Handle errors here, e.g., show a notification
        console.error('Error deleting company');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle network errors here
    });
  };
  // Fetch available categories
  useEffect(() => {
    fetch("http://localhost:8080/company/available-categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategory(data[0]);
      })
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);

  // Fetch companies based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      const url = 
        selectedCategory === "All"
          ? "http://localhost:8080/company/all/"
          : `http://localhost:8080/company/${selectedCategory}/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCompanies(data.companies);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching companies: ", error);
          setIsLoading(false);
        });
    }
  }, [selectedCategory]);

  const handleApply = (jobId) => {
    setAppliedJobs((prevAppliedJobs) => {
      const isCurrentlyApplied = prevAppliedJobs.includes(jobId);
      const newAppliedJobs = isCurrentlyApplied
        ? prevAppliedJobs.filter(id => id !== jobId)
        : [...prevAppliedJobs, jobId];
        
      localStorage.setItem("appliedJobs", JSON.stringify(newAppliedJobs));
      return newAppliedJobs;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div name="all-employers-container">
      <h1>Company List</h1>
      <div>
        <label htmlFor="category-select">Choose a Category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Size</th>
            <th>Primary Industry</th>
            <th>Secondary</th>
            <th>State</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.size}</td>
              <td>{company.primaryIndustry}</td>
              <td>{company.secondary}</td>
              <td>{company.state}</td>
              <td>{company.country}</td>
              <td>
                <button  className="button-apply" onClick={() => handleApply(company.id)}>
                  {appliedJobs.includes(company.id) ? 'Applied' : 'Apply'}
                </button>
                <button  className="button-delete" onClick={() => handleDelete(company.id)}>Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllEmployers;
