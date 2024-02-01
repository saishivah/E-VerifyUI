import React,{ useEffect,useState } from "react";
import '../Insertion/UpdateModal.css'
function UpdateCompanyModal({ company, isOpen, onSave, onCancel }) {

   // Initialize formData state with sanitized company data
   const [formData, setFormData] = useState(company);

  

    console.log("model open")
    useEffect(() => {
      setFormData(company); // Update form data when the company prop changes
    }, [company]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSave(formData);
    };
  
    if (!isOpen) return null;
  
    return (

      <div className="modal">
      <div>
        {/* Create form inputs for each field of the company data */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* Add other fields similarly */}
        <div className="form-group">
          <label htmlFor="size">Size:</label>
          <input
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="form-control"
          />
          <label htmlFor="State">State:</label>
            <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-control"
          />
          <label htmlFor="State">Primary Industry:</label>
            <input
            type="text"
            id="Primary"
            name="primaryIndustry"
            value={formData.primaryIndustry}
            onChange={handleChange}
            className="form-control"
          />
           <label htmlFor="State">Secondary Industry:</label>
            <input
            type="text"
            id="Secondary"
            name="secondary"
            value={formData.secondary}
            onChange={handleChange}
            className="form-control"
          />
           <label htmlFor="State">Country:</label>
            <input
            type="text"
            id="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-control"
          />
           <label htmlFor="carrerpage">CareersPage:</label>
            <input
            type="text"
            id="careersPage"
            name="careersPage"
            value={formData.careersPage}
            onChange={handleChange}
            className="form-control"
          />
            <label htmlFor="carrerpage">Logourl:</label>
             <input
            type="text"
            id="companyLogoUrl"
            name="companyLogoUrl"
            value={formData.companyLogoUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="upload an image for url"
          />
        </div>
        {/* Add more fields here */}
        <button  className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
        <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
    );
  }

  export default UpdateCompanyModal;
