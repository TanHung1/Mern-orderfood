import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/actions";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartReducer = (state = initialState, action) => {
  console.log(action, "redux");
  switch (action.type) {
    case ADD_TO_CART:
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex !== -1) {
        alert("co sp trong gio hang");
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return { ...state, cartItems: [...state.cartItems] };
      } else {
        alert("theem gio hang thah cong");

        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
