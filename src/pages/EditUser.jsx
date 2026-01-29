import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/form.css";
import Navbar from "../components/Navbar";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
  });

  const [error, setError] = useState("");

  // 🔹 Fetch existing user on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        });
      } catch (err) {
        setError("Failed to load user data");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.put(`/users/${id}`, formData);
      navigate("/users");
    } catch (err) {
      setError("Failed to update user");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
      </div>
    </>
  );
}
