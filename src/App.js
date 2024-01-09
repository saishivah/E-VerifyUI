import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchByName from './Components/search/SearchByName';

function App() {
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

    setSearchVisible(false);
  }

  };

  return (
    <div className='appContent'>
    <div className='SearchUI'>
      <input className='searchByName' type="text" placeholder='Search An Employer' onKeyUp={inputHandler} />
      <div className="search-state">{searchVisible ? 'Search Visible' : 'Search Not Visible'}</div>
      <input type="checkbox" onChange={ShowDetailsHandler}/>View Full Detail
      {searchVisible && <SearchByName name={employerName} showDetails={showDetails}/>}
      </div>
    </div>
  );
}

export default App;
