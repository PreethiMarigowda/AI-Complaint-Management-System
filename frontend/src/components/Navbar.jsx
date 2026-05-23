import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  // GET LOGGED IN USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logoutHandler = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#071739",
        color: "white",
      }}
    >

      <h2 style={{ color: "#3B82F6" }}>
        Smart Complaint System
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >

        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>

        {/* ADMIN ONLY */}
        {user?.email === "preethimarigowda@gmail.com" && (

          <Link
            to="/admin"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Admin
          </Link>

        )}

        <button
          onClick={logoutHandler}
          style={{
            background: "#EF4444",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;