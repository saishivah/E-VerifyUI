import React from 'react';
import LargeCorpData from '../../data/preprocessing/Bynumber/10,000andover.json';

const SearchByName = (props) => {
  console.log("searching");
  console.log(props.name);

  const result = LargeCorpData.filter((Employer) => {
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
        <h2>Matching Employers:</h2>
        <ul>
          {result.map((employer, index) => (
            <li key={index}>
              <strong>Employer:</strong> {employer.Employer}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return <ResultUI />;
}

export default SearchByName;
