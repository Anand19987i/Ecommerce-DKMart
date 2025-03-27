import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [], // ✅ Load cart from localStorage
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, productName, productPrice, productImage, quantity } = action.payload;
            
            const existingItem = state.cart.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity += quantity; // ✅ Increase quantity if product exists
            } else {
                state.cart.push({ id, productName, productPrice, productImage, quantity });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ Save to localStorage
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ Update localStorage
        },
        clearCart: (state) => {
            state.cart = []; // ✅ Clears the cart after order placement
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
