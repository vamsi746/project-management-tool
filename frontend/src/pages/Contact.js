import React from "react";

function Contact() {
  const darkMode = localStorage.getItem("darkMode") === "true";

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        boxShadow: darkMode
          ? "0 0 20px rgba(0,0,0,0.7)"
          : "0 0 20px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "10px", textAlign: "center" }}>
        👨‍💻 About the Developer
      </h2>
      <p
        style={{
          fontSize: "15px",
          textAlign: "center",
          color: darkMode ? "#ddd" : "#555",
        }}
      >
        Hi, I'm Vamsi. I'm a passionate Full Stack Developer building user-friendly and
        responsive web applications.
      </p>

      <hr
        style={{
          margin: "20px 0",
          border: "none",
          borderTop: "1px solid #ccc",
        }}
      />

      <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>📝 About This Project</h3>
      <p style={{ fontSize: "14px", color: darkMode ? "#ccc" : "#555" }}>
        This is a complete Task Management System built using the MERN stack. It features
        Kanban board, Gantt chart, analytics, user authentication, and dark mode. Designed
        for productivity and collaboration.
      </p>

      <h3 style={{ fontSize: "20px", marginTop: "20px" }}>⚙️ My Skills</h3>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {[
          "React",
          "Node.js",
          "Express.js",
          "MongoDB",
          "JavaScript",
          "HTML",
          "CSS",
          "Git",
        ].map((skill) => (
          <li
            key={skill}
            style={{
              backgroundColor: darkMode ? "#333" : "#eee",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "13px",
            }}
          >
            {skill}
          </li>
        ))}
      </ul>

      <h3 style={{ fontSize: "20px", marginTop: "20px" }}>🌐 Connect with Me</h3>
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "15px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="mailto:sangarajuvamsi6@gmail.com"
          style={linkStyle(darkMode)}
          target="_blank"
          rel="noreferrer"
        >
          📧 Email
        </a>
        <a
          href="https://www.linkedin.com/in/lakshmi-narayana-sangaraju-a814472b6/"
          style={linkStyle(darkMode)}
          target="_blank"
          rel="noreferrer"
        >
          🔗 LinkedIn
        </a>
        <a
          href="https://github.com/vamsi746"
          style={linkStyle(darkMode)}
          target="_blank"
          rel="noreferrer"
        >
          💻 GitHub
        </a>
      </div>
    </div>
  );
}

function linkStyle(darkMode) {
  return {
    textDecoration: "none",
    padding: "10px 16px",
    backgroundColor: darkMode ? "#333" : "#f0f0f0",
    color: darkMode ? "#f0f0f0" : "#333",
    borderRadius: "6px",
    fontSize: "14px",
    display: "inline-block",
    transition: "background 0.3s",
  };
}

export default Contact;
