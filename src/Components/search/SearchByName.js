import React from 'react';
import ALLDATA from './../../data/USA-E-verifed-employers.json';

const SearchByName = (props) => {
  console.log("searching");
  console.log(props.name);
  console.log(props.showDetails)
  const ShowDetails = props.showDetails;

  const result = ALLDATA.filter((Employer) => {
    // Perform case-insensitive partial match
    return Employer.Employer.toLowerCase().includes(props.name.toLowerCase());
  });

  console.log(result);

  const ResultUI = () => {
    if (result.length === 0) {
      return <div>No matching employers found</div>;
    }

    return (
      <div>
        <h2>Matching Employers: {result.length}</h2>
        {result.map((employer, index) => (
          <div key={index}>
            <h3>{index + 1}:{employer.Employer}</h3>
           {ShowDetails && <ul>
              {Object.entries(employer).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}

            </ul>}
          </div>
        ))}
      </div>
    );
  };

  return <ResultUI />;
}

export default SearchByName;
