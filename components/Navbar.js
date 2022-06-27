import React from "react";
import Link from "next/link";
import { AIOutlineShopping } from "react-icons/ai";

import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";

const Navbar = () => {
  //Importing state from our stateContext
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Titleist Golf</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => {
          setShowCart(true);
        }}
      >
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
