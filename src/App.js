import React, { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartDismissHanlder = (event) => {
    setCartIsShown(false);
  }

  const showCartHandler = (event) => {
    setCartIsShown(true);
  }

  return (
    <div>
      {cartIsShown && <Cart cartDismissHanlder = {cartDismissHanlder}/>}
      <Header showCartHandler={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </div>
  );
}

export default App;
