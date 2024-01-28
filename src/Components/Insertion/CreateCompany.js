import React, { useState } from 'react';
import axios from 'axios';
import '../Insertion/CreateCompany.css'
function CreateCompany() {
  const [company, setCompany] = useState({
    name: '',
    size: '',
    primaryindustry: '',
    secondary: '',
    state: '',
    country: ''
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/company/', company);
      setResponse(res.data);
      // Optionally reset form here
    } catch (error) {
      console.error('Error creating company', error);
      // Handle error response here
    }
  };

  return (
    
    <div className="create-company-container">
        
      <h2>Create New Company</h2>
      <form onSubmit={handleSubmit} className="create-company-form">
        <input type="text" name="name" placeholder="Name" value={company.name} onChange={handleChange} /><br />
        <input type="text" name="size" placeholder="Size" value={company.size} onChange={handleChange} /><br />
        <input type="text" name="primaryindustry" placeholder="Primary Industry" value={company.primaryindustry} onChange={handleChange} /><br />
        <input type="text" name="secondary" placeholder="Secondary" value={company.secondary} onChange={handleChange} /><br />
        <input type="text" name="state" placeholder="State" value={company.state} onChange={handleChange} /><br />
        <input type="text" name="country" placeholder="Country" value={company.country} onChange={handleChange} /><br />
        <button type="submit">Create Company</button>
      </form>

      {response && <div>
        <h3>Company Created:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>}
    </div>
  );
}

export default CreateCompany;
