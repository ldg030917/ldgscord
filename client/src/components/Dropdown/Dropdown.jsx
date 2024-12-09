import React from "react";
import { Link } from "react-router-dom";

function NavigateLink({ to, label }) {
  return (
    <Link to={to} className="navigate-link">
      {label}
    </Link>
  );
}

export default NavigateLink;