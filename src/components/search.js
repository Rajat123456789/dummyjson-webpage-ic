// import React, { useState, useEffect } from "react";
// import SmallCard from "./SmallCard";
// import "../styles/main.css";
// import axios from "axios";
// import PaginationRounded from "./pagination";
// import CustomLoader from "./Loader";

// export default function search({ handleClick, handlePdp }) {
//     const [allProducts, setAllProducts] = useState();
//     const [productList, setProductList] = useState();
//     const [isLoading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [isSorting, setSorting] = useState(false);
    
//     useEffect(() => {
//         (async function fetchProductList() {
//         try {
//             const { data } = await axios.get(
//             `https://dummyjson.com/products/search?q=`
//             );
//             const slicedProduct = data?.products?.slice(0, 10);
    
//             setAllProducts(data.products);
//             setProductList(slicedProduct);
//         } catch (error) {
//             console.log(`error in getting product list`, error);
//         } finally {
//             setTimeout(() => {
//             setLoading(false);
//             }, 2500);
//         }
//         })();
//     }, []);
        
//     const handleSearch = (e) => {
//         const searchValue = e.target.value;
//         const searchProduct = allProducts.filter((item) =>
//         item.title.toLowerCase().includes(searchValue.toLowerCase())
//         );
//         setProductList(searchProduct);
//         setSorting(true);
//     }

//     useEffect(() => {
//         setLoading(true);
//         const pageChangeProduct = allProducts?.slice(page * 10 - 10, 10 * page);
//         setTimeout(() => {
//         setLoading(false);
//         }, 4500);
//         setProductList(pageChangeProduct);
//         setSorting(false);
//     }, [page]);

//     console.log(`productList`, productList);
//     console.log(`allProducts`, allProducts);

//     return (
//         <div>
//             <div className="search">
//                 <input
//                     type="text"
//                     placeholder="Search for products"
//                     onChange={handleSearch}
//                 />
//             </div>
//             <div className="main">
//                 {isLoading ? (
//                     <CustomLoader />
//                 ) : (
//                     <>
//                         {productList?.map((item, index) => (
//                             <SmallCard
//                                 key={index}
//                                 item={item}
//                                 handleClick={handleClick}
//                                 handlePdp={handlePdp}
//                             />
//                         ))}
//                     </>
//                 )}
//             </div>
//             <PaginationRounded setPage={setPage} />
//         </div>
//     );
// }