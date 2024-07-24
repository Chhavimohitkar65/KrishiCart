import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h1 className="text-center" style={{ color: "#487C48", fontSize: "24px", marginTop: "20px", marginBottom: "30px", fontFamily: "'Roboto', sans-serif" }}>
          {category?.name}
        </h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {products?.map((p) => (
            <div key={p._id} className="col mb-4">
              <div className="card" style={{ width: "220px", height: "340px" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">₹ {p.price}</p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/product/${p.slug}`)}
                     style={{
                      fontSize: "9px",
                      backgroundColor: "#D4AC0D",
                      borderColor: "#F4D03F",
                    }}>
                      More Details
                    </button>
                    <button   className="btn btn-primary"
                     onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                    style={{
                      fontSize: "9px",
                      backgroundColor: "#2F6A2F",
                      borderColor: "#2A592A",
                    }}
                      >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
