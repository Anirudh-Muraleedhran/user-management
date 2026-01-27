import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/form.css";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    // TEMP: mock fetch user by ID
    const mockUser = {
      id,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
    };

    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError("Name and Email are required");
      return;
    }

    // TEMP: mock update
    console.log("Updated User:", { id, ...formData });

    // Later → API.put(`/users/${id}`, formData)
    navigate("/users");
  };

  return (
    <div className="form-container">
      <h2>Edit User</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button className="btn-primary">Update User</button>
      </form>
    </div>
  );
}
