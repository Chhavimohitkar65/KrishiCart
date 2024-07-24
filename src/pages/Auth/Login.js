import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useLocation } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate("");
  const location = useLocation("");

  //hover
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - कृषिCart">
      <div className="login">
        <h1 className=" neww">Login Page</h1>
        <br></br>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputName" className="form-label">
                            Email
                        </label> */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label> */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary d-flex justify-content-center mx-auto"
              style={{
                backgroundColor: "#40513B",
                color: "#fff",
                border: "2px solid #40513B",
                outline: "none",
                fontSize: "14px",
              }}
            >
              Login
            </button>
            <button
              type=""
              forgotPasswordController
              className="btn btn-primary d-flex justify-content-center mx-auto"
              onClick={() => {
                navigate("/forgot-password");
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: "transparent",
                color: hovered ? "#4E944F" : "#CCD6A6",
                border: "none",
                outline: "none",
                fontSize: "14px",
                transition: "color 0.3s ease-in-out",
              }}
            >
              Forgot password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
