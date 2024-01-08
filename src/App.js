import logo from './logo.svg';
import './App.css';

import SearchByName from './Components/search/SearchByName';
import { useState } from 'react';

function App() {
  const [employerName,setEmployerName]= useState('SLB')
  const InputHandler = (e)=>{
    setEmployerName(e.target.value)
    console.log(employerName)
  }
  return (
  
    <div>
      <input type='text' onKeyUp={InputHandler}></input>
      {/* <SearchByName props={employerName} /> */}

    </div>

  );
}

export default App;
