import React from "react";
import Link from "next/link";
import { AIOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Titleist Golf</Link>
      </p>
      <button type="button" className="cart-icon" onClick="">
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
