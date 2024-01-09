import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchByName from './Components/search/SearchByName';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter> 
    <div className='appContent'>
    <div className='navBar'>
      <ul>
        <li>
          <Link to="/">Search</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      </div>




 {/* Ensure you are importing BrowserRouter from 'react-router-dom' */}
        <Routes>
          <Route path="/" element={<EmployerSearch />} />
          {/* Add other routes as needed */}
        </Routes>  
        </div>
      </BrowserRouter>



  );
}

function EmployerSearch(){
  const [employerName, setEmployerName] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [showDetails,setShowDetails] = useState(false);

  const ShowDetailsHandler = (e)=>{
      // intiallize set to false
    setShowDetails(!showDetails)

  }

  const inputHandler = (e) => {
    if(e.target.value!=='' && e.target.value.length>2 ){
    setEmployerName(e.target.value);

    console.log(employerName); 
    setSearchVisible(true);// This will log the previous state due to closure
    
  }
  else{
    console.log(e.target.value.length)
    setSearchVisible(false);
  }

  };

  return (

    <div className='SearchUI'>
      <input className='searchByName' type="text" placeholder='Search An Employer' onKeyDown={inputHandler} />
      <div className="search-state">{searchVisible ? 'Search Visible' : 'Search Not Visible'}</div>
      <input type="checkbox" onChange={ShowDetailsHandler}/>View Full Detail
      {searchVisible && <SearchByName name={employerName} showDetails={showDetails}/>}
      </div>
  );

}

function About() {
  return (
    <div>
      <h2>About</h2>
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
