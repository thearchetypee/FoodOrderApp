import { useReducer } from "react";
import CartContext from "./cart-context";

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === ADD_ITEM) {
    const updatedTotalAmount =
      state.totalAmount + action.value.price * action.value.amount;

    const existingItemIndex = state.items.findIndex((item) => {
      return item.id === action.value.id;
    });
    const existingItem = state.items[existingItemIndex];

    let updatedItem;
    let updatedItems;

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.value.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.value);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === REMOVE_ITEM) {
    let updatedTotalAmount;

    const existingItemIndex = state.items.findIndex((item) => {
      return item.id === action.value;
    });
    const existingItem = state.items[existingItemIndex];

    let updatedItem;
    let updatedItems;
    if (existingItem) {
      if (existingItem.amount > 1) {
        updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.filter(item => { return (item.id !== action.value) })
      }
      updatedTotalAmount = Math.abs(state.totalAmount - existingItem.price.toFixed(2));
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    } else {
      return state;
    }
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: ADD_ITEM, value: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartState({type: REMOVE_ITEM, value: id });
  };

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
