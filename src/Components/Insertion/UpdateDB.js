// import React, { useState, useEffect } from "react";
// import '../LargeEmployers/AllEmployers.css'
// import UpdateCompanyModal from "./UpdateModal";
// function UpdateDB() {
//     const [showModal, setShowModal] = useState(false);
//     const [companies, setCompanies] = useState([]);
//     const [companyData, setCompanyData] = useState({ /* initial state */ });
//     const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [totalResults,setTotalResults]=useState(0);
//   const [appliedJobs, setAppliedJobs] = useState(() => {
//     // Initialize with jobs from localStorage
//     return JSON.parse(localStorage.getItem("appliedJobs")) || [];
//   });


//   const handleInputChange = (e) => {
//     console.log("input changed")
//     setCompanyData({ ...companyData, [e.target.name]: e.target.value });
//   };

//   const updateCompany = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/Company/', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(companyData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Company updated successfully:', data);
//     } catch (error) {
//       console.error('Error during the update:', error);
//     }
//   };



//   const handleDelete = (companyId) => {
//    console.log(companyId)
//     fetch(`http://localhost:8080/company/${companyId}/`, { 
//       method: 'DELETE'
//     })
//     .then(response => {
//       if (response.ok) {
//         // Remove the company from the state to update the UI
//         setCompanies(companies.filter(company => company.id !== companyId));
//       } else {
//         // Handle errors here, e.g., show a notification
//         console.error('Error deleting company');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Handle network errors here
//     });
//   };
//   // Fetch available categories
//   useEffect(() => {
//     fetch("http://localhost:8080/company/available-categories/")
//       .then((response) => response.json())
//       .then((data) => {
//         setCategories(data);
//         setSelectedCategory(data[0]);
//       })
//       .catch((error) => console.error("Error fetching categories: ", error));
//   }, []);

//   // Fetch companies based on the selected category
//   useEffect(() => {
//     if (selectedCategory) {
//       setIsLoading(true);
//       const url = 
//         selectedCategory === "All"
//           ? "http://localhost:8080/company/all/"
//           : `http://localhost:8080/company/${selectedCategory}/`;
//       fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//           setCompanies(data.companies);
//           setTotalResults(data.count)
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching companies: ", error);
//           setIsLoading(false);
//         });
//     }
//   }, [selectedCategory]);

//   const handleApply = (jobId) => {
//     setAppliedJobs((prevAppliedJobs) => {
//       const isCurrentlyApplied = prevAppliedJobs.includes(jobId);
//       const newAppliedJobs = isCurrentlyApplied
//         ? prevAppliedJobs.filter(id => id !== jobId)
//         : [...prevAppliedJobs, jobId];
        
//       localStorage.setItem("appliedJobs", JSON.stringify(newAppliedJobs));
//       return newAppliedJobs;
//     });
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
  
//   return (
//     <div name="all-employers-container">
//       <h1>Company List</h1>
//       <div>
//         <label htmlFor="category-select">Choose a Category: </label>
//         <select
//           id="category-select"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>  Results:{totalResults} 
//       </div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Size</th>
//             <th>Primary Industry</th>
//             <th>Secondary</th>
//             <th>State</th>
//             <th>Country</th>
//             <th>careersPage</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {companies.map((company) => (
//             <tr key={company.id}>
//               <td>{company.id}</td>
//               <td>{company.name}</td>
//               <td>{company.size}</td>
//               <td>{company.primaryIndustry}</td>
//               <td>{company.secondary}</td>
//               <td>{company.state}</td>
//               <td>{company.country}</td>
//               <td>{company.careersPage}</td>
//               <td>
//                 <button  className="button-apply" onClick={() => handleApply(company.id)}>
//                   {appliedJobs.includes(company.id) ? 'Applied' : 'Apply'}
//                 </button>
//                 <button  className="button-delete" onClick={() => handleDelete(company.id)}>Delete</button>
    
//       <button onClick={() => setShowModal(true)}>Edit Company</button>

//       <UpdateModal show={showModal} onClose={() => setShowModal(false)}>
   
//       <h2>Update Company</h2>
//         <form>
//           <input
//             type="text"
//             placeholder="Company Name"
//             name="name"
//             value={company.name || ""}
//             onChange={handleInputChange}
//           />
//           {/* Add more input fields for other data */}
//           <button onClick={updateCompany}>Update Company</button>
//           </form>
//       </UpdateModal>

//                 </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UpdateDB;
