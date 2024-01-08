import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchByName from './Components/search/SearchByName';

function App() {
  const [employerName, setEmployerName] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const inputHandler = (e) => {
    if(e.target.value!=='' && e.target.value.length>=2 ){
    setEmployerName(e.target.value);

    console.log(employerName); 
    setSearchVisible(true);// This will log the previous state due to closure

  }
  else{

    setSearchVisible(false);
  }

  };

  return (
    <div>
      <input type="text" onKeyUp={inputHandler} />
      <div className="search-state">{searchVisible ? 'Search Visible' : 'Search Not Visible'}</div>
      
      {searchVisible && <SearchByName name={employerName} />}
    </div>
  );
}

export default App;
