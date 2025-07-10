import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#f0f2f5";
    document.body.style.color = darkMode ? "#f0f0f0" : "#333";
  }, [darkMode]);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        borderBottom: "1px solid #ccc",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: darkMode ? "#fff" : "#333",
            textDecoration: "none",
          }}
        >
          📝 Task Manager
        </Link>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: darkMode ? "#fff" : "#333",
          }}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        <div
          className={`menu ${menuOpen ? "open" : ""}`}
          style={{
            display: menuOpen ? "flex" : "none",
            flexDirection: "column",
            width: "100%",
            marginTop: "10px",
            background: darkMode ? "#2a2a2a" : "#f9f9f9",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          {isLoggedIn ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #444",
                }}
              >
                <NavLink to="/" label="Dashboard" darkMode={darkMode} />
                <NavLink to="/add" label="Add Task" darkMode={darkMode} />
                <NavLink to="/analytics" label="Analytics" darkMode={darkMode} />
                <NavLink to="/gantt" label="Gantt" darkMode={darkMode} />
                <NavLink to="/kanban" label="Kanban" darkMode={darkMode} />
                <NavLink to="/contact" label="Contact" darkMode={darkMode} />

              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button onClick={toggleDarkMode} style={buttonStyle(darkMode)}>
                  {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    ...buttonStyle(darkMode),
                    backgroundColor: "#d9534f",
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #444",
                }}
              >
                <NavLink to="/login" label="Login" darkMode={darkMode} />
                <NavLink to="/register" label="Register" darkMode={darkMode} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button onClick={toggleDarkMode} style={buttonStyle(darkMode)}>
                  {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Desktop Menu */}
        <div
          className="desktop-menu"
          style={{
            display: "none",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {isLoggedIn ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  flex: 1,
                }}
              >
                <NavLink to="/" label="Dashboard" darkMode={darkMode} />
                <NavLink to="/add" label="Add Task" darkMode={darkMode} />
                <NavLink to="/analytics" label="Analytics" darkMode={darkMode} />
                <NavLink to="/gantt" label="Gantt" darkMode={darkMode} />
                <NavLink to="/kanban" label="Kanban" darkMode={darkMode} />
                <NavLink to="/contact" label="Contact" darkMode={darkMode} />

              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={toggleDarkMode} style={buttonStyle(darkMode)}>
                  {darkMode ? "🌞 Light" : "🌙 Dark"}
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    ...buttonStyle(darkMode),
                    backgroundColor: "#d9534f",
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flex: 1,
              }}
            >
              <NavLink to="/login" label="Login" darkMode={darkMode} />
              <NavLink to="/register" label="Register" darkMode={darkMode} />
              <button onClick={toggleDarkMode} style={buttonStyle(darkMode)}>
                {darkMode ? "🌞 Light" : "🌙 Dark"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS media query */}
      <style>
        {`
          @media (min-width: 768px) {
            .hamburger {
              display: none;
            }
            .menu {
              display: none !important;
            }
            .desktop-menu {
              display: flex !important;
            }
          }
        `}
      </style>
    </nav>
  );
}

function NavLink({ to, label, darkMode }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        fontSize: "14px",
        padding: "6px 12px",
        borderRadius: "4px",
        backgroundColor: darkMode ? "#333" : "#eee",
        color: darkMode ? "#f0f0f0" : "#333",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = darkMode ? "#555" : "#ddd";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = darkMode ? "#333" : "#eee";
      }}
    >
      {label}
    </Link>
  );
}

function buttonStyle(darkMode) {
  return {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: darkMode ? "#444" : "#333",
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.2s ease",
  };
}

export default Navbar;
