import { Link } from "react-router-dom";

function BackButton({ to = "/", label = "Volver" }) {
  return (
    <Link to={to} className="btn btn-outline-primary mb-3">
      ⬅ {label}
    </Link>
  );
}

export default BackButton;
