import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <>
          <Login onLogin={handleLogin} />

          <hr />

          <Register />
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>

          <hr />

          {user.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <Dashboard />
          )}
        </>
      )}
    </div>
  );
}

export default App;