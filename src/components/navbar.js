import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
// import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
  const lengthItems = useSelector((state) => state.cartDetail.value);
  console.log(`lengthItems`, lengthItems);
  return (
    <div className="navbar">
      <div className="nav_box">
        <span className="my_shop">

          <Link
            to={`/`}
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "40px",
              fontSize:"20px"
            }}
          >
            RJT
          </Link>

        </span>
        
        <div className="cart">

          <Link
            to={`/Cart`}
            style={{ textDecoration: "none", fontSize: "15px" }}
          >
            <span className="icons">
            <FontAwesomeIcon icon={faCartArrowDown} />
            </span>
            <span>{lengthItems?.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
