import { createSlice } from "@reduxjs/toolkit";
import cartItemApi from "./cartItemApi";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
     const quantity = action.payload.quantity;
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(productIndex);
      if (productIndex >= 0) {
        //Item already exist in the cart
        //Increase the cart quantity
        state.cartItems[productIndex].cartQuantity += 1;
      } else {
        //Item doesn't exists in the cart
        //Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity:1};
        state.cartItems.push(tempProduct);
      }
      //save cart to Local stroage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action) => {
      const newCartProduct = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartProduct;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    calculateSubtotal: (state, action) => {
      const array = [];
      state.cartItems.length !== 0 &&
        state.cartItems.map((item) => {
          const { price, cartQuantity } = item;
          const cartItemAmount = Number(price.substring(1)) * cartQuantity;
          return array.push(cartItemAmount);
        });
      if (state.cartItems.length >= 1) {
        const totalAmount = array.reduce((sum, curr) => sum + curr);
        state.cartTotalAmount = totalAmount;
      }
    },
    calculateQuantity: (state, action) => {
      const array = [];
      state.cartItems.map((item) => array.push(item.cartQuantity));
      if (state.cartItems.length >= 1) {
        const totalQuantity = array.reduce((sum, curr) => sum + curr);
        state.cartTotalQuantity = totalQuantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartItemApi.endpoints.fetchCartItemByUserCart.matchFulfilled,
      (state, payload) => {
        console.log("cartSlice   " + payload);
        localStorage.setItem("cartItems", JSON.stringify(payload.product));
      }
    );

    builder.addMatcher(
      cartItemApi.endpoints.deleteAllCartItem.matchFulfilled,
      (state, payload) => localStorage.setItem("cartItems", [])
    );
  },
});

export default cartSlice.reducer;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const {
  addCartItem,
  decreaseQuantity,
  removeItemFromCart,
  clearCart,
  calculateSubtotal,
  calculateQuantity,
} = cartSlice.actions;
