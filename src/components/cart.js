import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItem } from "./../Redux/CartSlice";
import { Button } from "react-bootstrap";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [currentItems, setCurrentItems] = useState();
  const lengthItems = useSelector((state) => state.cartDetail.value);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = (e, item) => {
    dispatch(removeCartItem(item));
    setCurrentItems(lengthItems);
  };

  const handlePrice = () => {
    let ans = 0;
    lengthItems?.map((item) => (ans += item.price));
    setPrice(ans);
  };

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (price === 0) {
        toast.error(`Please add items to your cart`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      toast.success(`Thank you! Your total price is $${price}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }, 1); 
  };

  useEffect(() => {
    handlePrice();
    setCurrentItems(lengthItems);
  }, [lengthItems]);

  return (
    <article>
      {currentItems?.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.thumbnail} alt="" />
            <p>{item.title}</p>
          </div>
          <div>
            <span>{"$ " + item.price}</span>
            <LoadingButton
              className="btn btn-danger d-flex"
              onClick={(e) => handleRemove(e, item)}
            >
              Remove
            </LoadingButton>

          </div>
        </div>
      ))}
      <div className="text-dark d-flex justify-content-between mt-4">
        <b>Total Price of your Cart</b>
        <LoadingButton
          variant="outlined"
          sx={{
            marginTop: "auto",
            color: "red",
            borderColor: "red",
            outlineColor: "red",
          }}
          fullWidth
          loading={isLoading}
          onClick={handleButtonClick}
        >
          <b><span>$ {price}</span></b>
          
        </LoadingButton>
      </div>

      <ToastContainer />
    </article>
  );
};

export default Cart;