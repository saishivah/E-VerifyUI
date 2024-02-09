import React, { useState, useEffect, useRef } from "react"; // Combined import statement
import "../LargeEmployers/AllEmployers.css";

function AllEmployers() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedJobs")) || [];
  });

  const ApplicationURL = useRef({
    'public-url': 'https://api.test.opt.glancejobs.com/company/',
    'local-url': 'http://localhost:8080/company/'
  });

  useEffect(() => {
    const fetchCategories = () => {
      fetch(`${ApplicationURL.current['public-url']}available-categories/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
          return response.json();
        })
        .then((data) => {
          let withAll = ["All", ...data];
          setCategories(withAll);
          setSelectedCategory(data[0]);
        })
        .catch((error) => console.error("Error fetching categories: ", error));
    };
  
    fetchCategories();
  }, []); // Dependency array remains empty since useRef does not trigger re-renders
  
  useEffect(() => {
    const fetchCompanies = () => {
      if (selectedCategory) {
        setIsLoading(true);
        const url = selectedCategory === "All"
          ? `${ApplicationURL.current['public-url']}all/`
          : `${ApplicationURL.current['public-url']}${selectedCategory}/`;
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch companies');
            }
            return response.json();
          })
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
    };
  
    fetchCompanies();
  }, [selectedCategory]); // selectedCategory is a valid dependency here

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
        </select> {" "}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllEmployers;
