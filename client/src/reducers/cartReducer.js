// src/reducers/cartReducer.js

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[index].quantity++;
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      const updatedCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
