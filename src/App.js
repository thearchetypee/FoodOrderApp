import React, { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider"

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartDismissHanlder = (event) => {
    setCartIsShown(false);
  }

  const showCartHandler = (event) => {
    setCartIsShown(true);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart cartDismissHanlder={cartDismissHanlder} />}
      <Header showCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
