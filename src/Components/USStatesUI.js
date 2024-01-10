import {
 Link
  } from "react-router-dom";
function USStatesUI() {
    return (
       <div className='Cities'>
  
        <ul>
          <li>
            <Link to="/Texas">Texas</Link>
          </li>
          <li>
            <Link to="/Californina">Californina</Link>
          </li>
          <li>
            <Link to="/NewYork"> NewYork</Link>
          </li>
        </ul>
        </div>
  
  
    );
  }

  export default USStatesUI