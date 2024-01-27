import React, { useState, useEffect } from "react";

function AllEmployers() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch available categories
  useEffect(() => {
    fetch("http://localhost:8080/company/available-categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data); // assuming the endpoint returns an array of categories
        setSelectedCategory(data[0]); // Set the first category as the default selected one
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Size</th>
            <th>Primary Industry</th>
            <th>Secondary</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.size}</td>
              <td>{company.primaryindustry}</td>
              <td>{company.secondary}</td>
              <td>{company.state}</td>
              <td>{company.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllEmployers;
