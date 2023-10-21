import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "bismark",
    password: "123456",
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const notify = () => {
    toast.success("Logged in succesfully");
  };

  useEffect(() => {
    if (error) {
      toast.error("Incorrect username or password");
    }
  }, [error]);

  const delay = () => {
    navigate(-1);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      localStorage.setItem("user", res.data.details);
      notify();
      setTimeout(delay, 2000);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <section className="vh-100 login-mdb">
      <ToastContainer autoClose={2000} />
      <div className="container py-5 vh-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card card-mbd">
              <div className="row g-0">
                <div className="col-md-6 col-lg-6 d-none d-md-block">
                  <img
                    src="https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="login form"
                    className="img-fluid img-mdb"
                  />
                </div>
                <div className="col-md-6 col-lg-6 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">Book Me</span>
                      </div>

                      <h5 className="fw-normal headersign mb-3 pb-3">
                        Sign into your account
                      </h5>

                      <div class="mb-3">
                        <label for="username" class="form-label">
                          Username(case-sensitive)
                        </label>
                        <input
                          value={credentials.username}
                          type="text"
                          class="form-control form-control-lg"
                          id="username"
                          onChange={handleChange}
                          placeholder="username: phillip"
                        />
                      </div>

                      <div class="mb-3">
                        <label for="passowrd" class="form-label">
                          Password
                        </label>
                        <input
                          value={credentials.password}
                          type="password"
                          class="form-control form-control-lg"
                          id="password"
                          onChange={handleChange}
                          placeholder="password: 12345678"
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          disabled={loading}
                          onClick={handleClick}
                          type="button"
                        >
                          {loading && (
                            <div
                              class="spinner-grow me-2 spinner-grow-sm text-light"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          )}
                          Login
                        </button>
                      </div>

                      <br />
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
