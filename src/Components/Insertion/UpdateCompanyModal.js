import React,{ useEffect,useState } from "react";
import '../Insertion/UpdateModal.css'
function UpdateCompanyModal({ company, isOpen, onSave, onCancel }) {
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
        </div>
        {/* Add more fields here */}
        <button  className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
        <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
    );
  }

  export default UpdateCompanyModal;
