import React, { useState, useEffect } from "react";
import SmallCard from "./SmallCard";
import "../styles/main.css";
import axios from "axios";
import PaginationRounded from "./pagination";
import CustomLoader from "./Loader";
import search from "./search";

const Main = ({ handleClick, handlePdp }) => {
  const [allProducts, setAllProducts] = useState();
  const [productList, setProductList] = useState();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isSorting, setSorting] = useState(false);

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
  }, []);

  // search functionality

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const searchProduct = allProducts.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductList(searchProduct);
    setSorting(true);
    if (searchValue === "") {
      setProductList(allProducts);
      // with pagination
      const pageChangeProduct = allProducts?.slice(page * 10 - 10, 10 * page);
      setProductList(pageChangeProduct);
    }
  }

  // search by category
  


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
      <section>
      <PaginationRounded setPage={setPage} />
      </section>

      <section>
        <div className="search">
          <input
            type="text"
            placeholder="Search for products"
            onChange={handleSearch}
          />
        </div>
      </section>

      <section>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <>
            {productList?.map((item) => (
              <SmallCard
                key={item.id}
                item={item}
                handleClick={handleClick}
                setProductList={setProductList}
                productList={productList}
                handlePdp={handlePdp}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};
export default Main;