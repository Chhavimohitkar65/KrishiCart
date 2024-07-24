import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  const boxStyle = {
    background: "linear-gradient(#C0E020, #27C268, #20AB5A )", // Gradient background
    color: "white",
    padding: "20px",
    borderRadius: "5px",
    width: "calc(80.33% - 20px)", // Adjusted width for the box (33.33% minus margin)
    height: "100px", // Fixed height for square box
    margin: "10px", // Margin between boxes
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  };

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3" key={c._id}> {/* Changed col-md-4 to col-md-4 */}
              <Link to={`/category/${c.slug}`} style={boxStyle}>
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
