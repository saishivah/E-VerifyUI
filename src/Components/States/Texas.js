import { Link } from "react-router-dom";
function Texas() {
  return (
    <div className="Cities">
      <ul>
        <li>
          <Link to="/Texas/Houston">Houston</Link>
        </li>
        <li>
          <Link to="/Texas/Dallas">Dallas</Link>
        </li>
        <li>
          <Link to="/Texas/Austin"> Austin</Link>
        </li>
        <li>
        <Link to="/Texas/:Top100"> Top 100 Big Employers</Link>
        </li>
      </ul>
    </div>
  );
}

export default Texas;