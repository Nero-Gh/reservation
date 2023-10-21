import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [navbar, setNavbar] = useState(false);

  const notify = () => {
    toast.success("Logged out");
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <nav
      className={
        navbar
          ? "navbar active fixed-top navbar-expand-lg navbar-light bg-light"
          : "navbar fixed-top navbar-expand-lg navbar-light bg-light"
      }
    >
      <ToastContainer autoClose={800} />

      <div className="container">
        <Link className="navbar-brand" to="/">
          Book Me
        </Link>
        <button
          className="navbar-toggler d-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarTogglerDemo01"
        ></div>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {user && (
            <li
              className="nav-item me-3"
              onClick={() => {
                notify();
                // window.location.reload();

                setTimeout(() => {
                  window.location.reload();
                }, 800);
                localStorage.setItem("user", null);
              }}
            >
              <a
                href="##"
                className="nav-link btn px-2 btn-md d-flex align-items-center"
              >
                <i class="bx bx-power-off me-1"></i> {user.username}
              </a>
            </li>
          )}
          {!user && (
            <Link to="/login" className="nav-item me-3">
              <Link className="nav-link btn px-2 btn-md login-btn" to="/login">
                Login <i class="bx bx-log-in-circle"></i>
              </Link>
            </Link>
          )}
          {!user && (
            <Link to="/register" className="nav-item me-3">
              <Link className="nav-link btn px-2 btn-md login-btn" to="/register">
                Register <i class="bx bx-log-in-circle"></i>
              </Link>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
