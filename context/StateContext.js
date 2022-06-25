import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

//We export this function so that we can wrap our entire application in our StateContext in the _app.js
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [cartItems, setCartITems] = useState();

  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

  //On add to cart
  const onAdd = (product, quantity) => {
    //Checking if the product already exists in the cart
    const checkProductInCart = cartItems.find(
      (item) => item.id === product._id
    );
    if (checkProductInCart) {
      setTotalPrice(
        (prevTotalPrice = prevTotalPrice + product.price * quantity)
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities + quantity
      );
      //1:56
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartITems(updatedCartItems);
      toast.success(`${qty} ${product.name} added to the cart.`);
    } else {
    }
  };

  //Function to handle quantity - Notice that these two functions are also passed to the global state
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
