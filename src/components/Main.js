import React, { useState, useEffect } from "react";
import SmallCard from "./SmallCard";
import "../styles/main.css";
import axios from "axios";
import PaginationRounded from "./pagination";
import CustomLoader from "./Loader";
import { LoadingButton } from "@mui/lab";

const Main = ({ handleClick, handlePdp }) => {
  const [allProducts, setAllProducts] = useState();
  const [productList, setProductList] = useState();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isSorting, setSorting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function fetchProductList() {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products?limit=100`
        );
        const slicedProduct = data?.products?.slice(0, 10);
        setAllProducts(data.products);
        setProductList(slicedProduct);
      } catch (error) {
        console.log(`error in getting product list`, error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      }
    })();

    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        console.log(data); 
        setCategories(data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      setProductList(response.data.products);
    } catch (error) {
      console.error("Error fetching products by category", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const searchProduct = allProducts.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductList(searchProduct);
    setSorting(true);
    if (searchValue === "") {
      setProductList(allProducts);
      const pageChangeProduct = allProducts?.slice(page * 10 - 10, 10 * page);
      setProductList(pageChangeProduct);
    }
  }

  useEffect(() => {
    setLoading(true);
    const pageChangeProduct = allProducts?.slice(page * 10 - 10, 10 * page);
    setTimeout(() => {
      setLoading(false);
    }, 4500);
    setProductList(pageChangeProduct);
    setSorting(false);
  }, [page]);

  console.log(`productList`, productList);
  console.log(`allProducts`, allProducts);

  return (
    <>
      <section className="first-thing">
        <div className="pagination-container">
          <PaginationRounded setPage={setPage} />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products"
            onChange={handleSearch}
          />
        </div>
      </section>
      <section>
        <div className="category-tabs">
          {categories.map((category, index) => (
            <LoadingButton
              key={index}
              className={`tab ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </LoadingButton>
          ))}
        </div>
      </section>
      <section>
        {isLoading ? (
          <CustomLoader />
        ) : (
          productList.map((item) => (
            <SmallCard
              key={item.id}
              item={item}
              handleClick={handleClick}
              handlePdp={handlePdp}
            />
          ))
        )}
      </section>
    </>
  );
};

export default Main;