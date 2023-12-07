import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
     initialState: {
        cartItems: {}
      },
      reducers: {
        setCartItems: (state, action) => {
          state.cartItems = action.payload;
        },
        addCartItem: (state, action) => {
         state.cartItems.push(action.payload)
          //state.cartItems =[...state.cartItems, action.payload];
        },
      },
      
});

export default cartSlice.reducer;
export const {setCartItems, addCartItem } = cartSlice.actions;