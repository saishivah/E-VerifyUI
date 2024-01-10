import { useMatch } from "react-router-dom";
import ALLDATA from "./../../data/USA-E-verifed-employers.json";
import { useState } from "react";
import './TopEmployers.css'
function TopEmployers() {

  const [showDetails, setShowDetails] = useState(false);
  const [CurrentState, SetCurrentState] = useState("TX");
  const [WorkForceSize, SetWorkForceSize] = useState("10000");
  const [CurrentWorkForce, SetCurrentWorkForce] = useState("Select a WorkForce Size");
  const DropDownHandler = (event) => {
    SetCurrentState(event.target.value);
    // You can perform additional actions here, such as updating the state in a parent component or making an API call
  };
  const WorkForceDropDownHandler = (event) => {
    let WorkForceSize = event.target.value;
    SetCurrentWorkForce(WorkForceSize)

    WorkForceSize = parseInt(WorkForceSize, 10); // Convert the substring back to a number
    WorkForceSize = WorkForceSize.toLocaleString("en-US");
    SetWorkForceSize(WorkForceSize);
    
  };



  console.log("top is");
  console.log(CurrentState);

  const TopEmployersDATA = ALLDATA.filter(
    (Employer) =>
      Employer["Hiring Site Locations (by state)"].includes(CurrentState) &&
      Employer["Workforce Size"].includes(WorkForceSize)
  );

  const ShowDetailsHandler = (e) => {
    // intiallize set to false
    setShowDetails(!showDetails);
  };

  const TopEmployersDATAUI = () => {
    if (TopEmployersDATA.length === 0 && CurrentWorkForce==="Select a WorkForce Size") {
        return <div>Please select from above options</div>;
      }
    if (TopEmployersDATA.length === 0) {
      return <div>No matching employers found</div>;
    }

    return (
      <div>
        <h2>
          Matching Employers in {CurrentState} with Workforce {WorkForceSize}{" "}
          and over: {TopEmployersDATA.length}
        </h2>
        <input type="checkbox" onChange={ShowDetailsHandler} />
        View Full Detail
        {TopEmployersDATA.map((employer, index) => (
          <div key={index}>
            <h3>
              {index + 1}:{employer.Employer}
            </h3>
            {showDetails && (
              <ul>
                {Object.entries(employer).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <select
        id="WorkForce"
        value={CurrentWorkForce}
        onChange={WorkForceDropDownHandler}
        className="WorkForceSelecter"
      >
        <option value="none">Select a WorkForce Size</option>
        <option value="5">5 and over</option>
        <option value="10">10 and over</option>
        <option value="100">100 and over</option>
        <option value="1000">1000 and over</option>
        <option value="10000">10000 and over</option>
      </select>
      <select id="stateSelect" className="stateSelector" value={CurrentState} onChange={DropDownHandler}>
        <option value="" selected>
          Select a state
        </option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>

      <TopEmployersDATAUI />
    </div>
  );
}

export default TopEmployers;
