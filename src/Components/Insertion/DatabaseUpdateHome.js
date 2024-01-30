import {Link } from "react-router-dom";

const DatabaseUpdateHome=()=>{

    return(
        <div>
        <div> 
            Want to create new company go to url:  <Link to="/Create"> Create</Link>
        </div>
           <div> 
           Want to create new company go to url:  <Link to="/Update"> Update</Link>
       </div>
       </div>
    )
}

export default DatabaseUpdateHome;