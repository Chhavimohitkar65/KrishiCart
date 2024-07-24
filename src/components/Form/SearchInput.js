import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{ width: "550px" }} // Adjust the width as needed
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          style={{
            backgroundColor: "#28a745", // Green color for background
            color: "#fff", // White color for text
            transition: "background-color 0.3s ease", // Smooth transition effect
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")} // Darker green on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")} // Original green on hover out
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
