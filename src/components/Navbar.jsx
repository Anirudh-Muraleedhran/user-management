import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  }}
>

      <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600 }}>
  User Management
</h2>


      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user && <span>{user.email}</span>}
        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
