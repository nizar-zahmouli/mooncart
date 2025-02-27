import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemList: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.itemList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
          cover: newItem.images,
        });
        state.totalQuantity++;
      }
    },

    //    removeFromCart
    removeFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.itemList.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.itemList = state.itemList.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    removeFromAllCart(state, action) {
      const id = action.payload;

      state.itemList = state.itemList.filter((item) => item.id !== id);
      state.totalQuantity -= state.itemList.reduce(
        (arc, item) => arc + item.quantity,
        0
      );
    },
    clearCart(state) {
      state.itemList = []
      state.totalQuantity = 0

    }
  },
});

export const CartActions = cartSlice.actions;
export const { clearCart } = cartSlice.actions;

export const selectTotalQuantity = createSelector(
  (state) => state.cart.itemList,
  (itemList) => itemList.reduce((arc) => arc + 1, 0)
);
export const selectTotalPrice = createSelector(
  (state) => state.cart.itemList,
  (itemList) => itemList.reduce((arc, item) => arc + item.totalPrice, 0)
);
export default cartSlice;
