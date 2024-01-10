import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchByName from "./Components/search/SearchByName";
import USStatesUI from "./Components/USStatesUI";
import Texas from "./Components/States/Texas";
import TopEmployers from "./Components/Listings/TopEmployers";
import { HashRouter as BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="appContent">
        <div className="navBar">
          <ul>
            <li>
              <Link to="/">Search</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
            <li>
              <Link to="/TOPEmployers"> US TOP Employers</Link>
            </li>
          </ul>
        </div>

        {/* Ensure you are importing BrowserRouter from 'react-router-dom' */}
        <Routes>
          <Route path="/" element={<EmployerSearch />} />
          {/* <Route path="/USStates" element={<USStatesUI />} /> */}
          <Route path="/TOPEmployers" element={<TopEmployers/>} />
          {/* <Route path="./Texas" element={<Texas />} />

          <Route path="./Texas/:Top100" element={<TopEmployers />} /> */}

          {/* <Route path="./Californina" element={<USStatesUI />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function EmployerSearch() {
  const [employerName, setEmployerName] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const ShowDetailsHandler = (e) => {
    // intiallize set to false
    setShowDetails(!showDetails);
  };

  const inputHandler = (e) => {
    if (e.target.value !== "" && e.target.value.length > 2) {
      setEmployerName(e.target.value);

      console.log(employerName);
      setSearchVisible(true); // This will log the previous state due to closure
    } else {
      console.log(e.target.value.length);
      setSearchVisible(false);
    }
  };

  return (
    <div className="SearchUI">
      <input
        className="searchByName"
        type="text"
        placeholder="Search An Employer"
        onKeyDown={inputHandler}
      />
      <div className="search-state">
        {searchVisible ? "Search Visible" : "Search Not Visible"}
      </div>
      <input type="checkbox" onChange={ShowDetailsHandler} />
      View Full Detail
      {searchVisible && (
        <SearchByName name={employerName} showDetails={showDetails} />
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;
