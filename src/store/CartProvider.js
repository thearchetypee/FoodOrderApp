import { useReducer } from "react";
import CartContext from "./cart-context";

const ADD_ITEM = "ADD_ITEM";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    if(action.type === ADD_ITEM) {
        const updatedItem = state.items.concat(action.value);
        const updatedTotalAmount = state.totalAmount + (action.value.price*action.value.amount)
        return { items: updatedItem, totalAmount: updatedTotalAmount };
    }

    return defaultCartState
}

const CartProvider = (props) => {

    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: ADD_ITEM , value: item});
  };
  const removeItemFromCartHandler = (id) => {};

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
