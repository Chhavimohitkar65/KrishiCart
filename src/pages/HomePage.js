import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import CategoryForm from "./../components/Form/CategoryForm";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotalCount
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      {/* Banner Image */}
      <img
        src="/images/disscount.png"
        className="banner-img"
        alt="bannerimage"
        style={{ width: "100%" }}
      />
      {/* End Banner Image */}
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <div className="mb-4">
            <h4 style={{ color: "#487C48", fontSize: "18px" }}>
              Filter Category
            </h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: "#487C48", fontSize: "18px" }}>
              Filter by price
            </h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-danger w-100"
              style={{
                backgroundColor: "#E7C400",
                borderColor: "#FFD900",
                color: "white",
                fontSize: "16px",
                borderRadius: "5px",
              }}
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <h1
            className="text-center"
            style={{
              color: "#487C48",
              fontSize: "24px",
              marginTop: "20px",
              marginBottom: "30px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            All Products
          </h1>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
            {products?.map((p) => (
              <div key={p._id} className="col mb-4">
                <div className="card" style={{ width: "220px", height: "320px" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "14px" }}>{p.name}</h5>
                    <p className="card-text" style={{ fontSize: "12px" }}>
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text" style={{ fontSize: "14px" }}> ₹ {p.price}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <button
                        className="btn btn-primary"
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
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-secondary" onClick={() => navigate(`/product/${p.slug}`)}
                        style={{
                          fontSize: "9px",
                          backgroundColor: "#D4AC0D",
                          borderColor: "#F4D03F",
                        }}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
