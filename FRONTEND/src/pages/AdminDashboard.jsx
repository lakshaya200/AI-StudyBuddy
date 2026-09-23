
import { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      } else {
        alert(data.message || "Failed to fetch users");
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (userId, newRole) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("User role updated successfully!");
        fetchUsers();
      } else {
        alert(data.message || "Failed to update role");
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>AI StudyBuddy</h1>
        <h2>Admin Dashboard</h2>
      </div>

      <div className="admin-users-section">
        <h3>All Users</h3>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div className="admin-user-card" key={user._id}>
              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>

              <button
                onClick={() =>
                  updateRole(
                    user._id,
                    user.role === "admin" ? "student" : "admin"
                  )
                }
              >
                {user.role === "admin"
                  ? "Change to Student"
                  : "Change to Admin"}
              </button>

              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
