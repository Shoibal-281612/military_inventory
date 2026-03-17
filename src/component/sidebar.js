import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Military System</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/purchases" style={{ color: "white" }}>
            Purchases
          </Link>
        </li>
        <li>
          <Link to="/transfers" style={{ color: "white" }}>
            Transfers
          </Link>
        </li>
        <li>
          <Link to="/assignments" style={{ color: "white" }}>
            Assignments
          </Link>
        </li>
        <li>
          <Link to="/expenditure" style={{ color: "white" }}>
            Expenditure
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
