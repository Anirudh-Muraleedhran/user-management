import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin" },
      { id: 2, name: "John Doe", email: "john@example.com", role: "User" },
    ]);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="page-container">
      <h2>User Management</h2>

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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="table-actions">
                <Link to={`/users/edit/${user.id}`}>
                  <button className="btn-secondary">Edit</button>
                </Link>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(user.id)}
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
