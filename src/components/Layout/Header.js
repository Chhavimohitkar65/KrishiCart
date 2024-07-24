import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand" style={{ fontFamily: "Roboto, sans-serif", marginLeft: "10px", marginRight: "90px" }}>
            🌱कृषिCart
          </Link>
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <SearchInput className="form-control" style={{ width: "800px" }} />
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink exact to="/" className="nav-link" style={{   fontFamily: "Roboto, sans-serif" , color: "#0B5345 ", textDecoration: "none" }}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ color: "#0B5345   ", fontFamily: "Roboto, sans-serif", textDecoration: "none" }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link style={{fontFamily: "Roboto, sans-serif", textDecoration: "none" }} className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link
                      style={{fontFamily: "Roboto, sans-serif",fontSize: "13px" , textDecoration: "none" }}
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" style={{ fontFamily: "Roboto, sans-serif",  color: "#196F3D ", textDecoration: "none" }}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" style={{ color: "#196F3D ",fontFamily: "Roboto, sans-serif", textDecoration: "none" }}>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: " #0B5345 ", textDecoration: "none",fontFamily: "Roboto, sans-serif" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? `admin` : `user`}`}
                          className="dropdown-item"
                          style={{ color: "#196F3D ", textDecoration: "none" ,fontFamily: "Roboto, sans-serif"}}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          style={{ color: "#196F3D ", textDecoration: "none" ,fontFamily: "Roboto, sans-serif"}}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
              <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link" style={{ color: "#0B5345 ", fontSize:"17px",marginTop:"5px" ,fontFamily: "Roboto, sans-serif"}}>
                  Cart 
                </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
