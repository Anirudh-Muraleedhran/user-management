import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/form.css";
import { logout } from "../utils/auth";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>User Management</h2>
        <button className="btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <Link to="/users/add">
        <button className="btn-primary">Add User</button>
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="table-actions">
                <Link to={`/users/edit/${u.id}`}>
                  <button className="btn-secondary">Edit</button>
                </Link>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
