import React, { useState, useEffect } from "react";
import "../LargeEmployers/AllEmployers.css";
import UpdateCompanyModal from "../Insertion/UpdateCompanyModal";
import { Link } from "react-router-dom";
function AllEmployers() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [updatedCompany, setUpdatedCompany] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ApplicationURL = {
    'public-url': 'https://api.test.opt.glancejobs.com/company/',
    'local-url': 'http://localhost:8080/company/'
  }
  
  const [appliedJobs, setAppliedJobs] = useState(() => {
    // Initialize with jobs from localStorage
    return JSON.parse(localStorage.getItem("appliedJobs")) || [];
  });

  const handleSave = async (updatedData) => {
    try {
      const companyIdToUpdate = updatedData.id; // Get the company ID from the updated data
      const response = await fetch(`${ApplicationURL['public-url']}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Convert the updated data to JSON format
      });

      if (response.ok) {
        // Handle a successful update, e.g., show a success message
        console.log("Company updated successfully");
        // Update the companies state with the new data
        const updatedCompanies = companies.map((company) => {
          if (company.id === companyIdToUpdate) {
            return updatedData; // Replace the updated company data
          }
          return company;
        });
        setCompanies(updatedCompanies);
        setIsModalOpen(false);
      } else {
        // Handle errors here, e.g., show an error message
        console.error("Error updating company");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors here
    }
  };

  const handleCancel = () => {
    // Specific cancel logic for this context

    // Close the modal
    setIsModalOpen(false);

    // Optionally, you can reset any form fields to their original values here if needed
    setUpdatedCompany(null); // Reset the updated company data

    // You can also perform any other actions related to cancellation
  };

  const handleUpdate = (companyId) => {
    const companyToUpdate = companies.find(
      (company) => company.id === companyId
    );
    const sanitizedCompany = sanitizeCompanyData(companyToUpdate);
    console.log(sanitizedCompany);
    setUpdatedCompany(sanitizedCompany);
    setIsModalOpen(true);
  };

  const sanitizeCompanyData = (data) => {
    const defaultValues = {
      id: "",
      name: "",
      size: "",
      primaryIndustry: "",
      secondary: "",
      state: "",
      country: "",
      careersPage: "",
      companyLogoUrl: "",
    };

    return Object.keys(defaultValues).reduce((acc, key) => {
      acc[key] = data[key] == null ? defaultValues[key] : data[key];
      return acc;
    }, {});
  };

  const handleDelete = async (companyId) => {
    try {
      const response = await fetch(
        `${ApplicationURL['public-url']}${companyId}/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the company from the state to update the UI
        setCompanies(companies.filter((company) => company.id !== companyId));
      } else {
        // Handle errors here, e.g., show a notification
        console.error("Error deleting company");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors here
    }
  };
  // Fetch available categories
  useEffect(() => {
    fetch(`${ApplicationURL['public-url']}available-categories/`)
      .then((response) => response.json())
      .then((data) => {
        let withAll = ["All", ...data];
        setCategories(withAll);
        setSelectedCategory(data[0]);
      })
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);

  // Fetch companies based on the selected category
  // Fetch companies based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      const url = selectedCategory === "All"
        ? `${ApplicationURL['public-url']}all/`
        : `${ApplicationURL['public-url']}${selectedCategory}/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCompanies(data.companies);
          setTotalResults(data.count);
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
        ? prevAppliedJobs.filter((id) => id !== jobId)
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
        </select>{" "}
        Results:{totalResults}
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
            <th>careersPage</th>
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
                {company.careersPage ? (
                  <a
                    href={company.careersPage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Career Page
                  </a>
                ) : (
                  "Not available"
                )}
              </td>
              <td>
                <button
                  className="button-apply"
                  onClick={() => handleApply(company.id)}
                >
                  {appliedJobs.includes(company.id) ? "Applied" : "Apply"}
                </button>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(company.id)}
                >
                  Delete
                </button>
                <button
                  className="button-update"
                  onClick={() => handleUpdate(company.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <UpdateCompanyModal
          company={updatedCompany}
          isOpen={isModalOpen}
          onSave={handleSave} // Define this function for saving updates
          onCancel={handleCancel} // Define this function for canceling
        />
      )}
    </div>
  );
}

export default AllEmployers;
