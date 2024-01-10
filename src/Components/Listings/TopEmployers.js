import { useMatch } from "react-router-dom";
function TopEmployers(){
    const match = useMatch(
        "/Texas/:Top100");


    console.log(match)

 
return(
    <div>Top Employers in Texas</div>
);

}

export default TopEmployers