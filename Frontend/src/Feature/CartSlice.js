import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `increased  ${state.cartItems[itemIndex].name} cart quantity`,
          { position: "bottom-left" }
        );
      } else {
        const tempProduct = { ...payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${payload.name} is added to cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, { payload }) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== payload.id
      );
      state.cartItems = nextCartItems;
      toast.error(`${payload.name} removed from cart`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart: (state, { payload }) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${payload.name} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== payload.id
        );

        state.cartItems = nextCartItems;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.error(`Decreased ${payload.name} cart quantity`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart:(state,{payload})=>{
      state.cartItems=[];
      toast.error(`Cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },
    getTotal:(state,{payload})=>{
      let total = 0;
      let quantity = 0;
    
      for (let i = 0; i < state.cartItems.length; i++) {
        // const { price, cartQuantity } = state.cartItems[i];
        const itemTotal = state.cartItems[i].price * state.cartItems[i].cartQuantity;
    
        total = total+itemTotal;
        quantity = quantity+state.cartItems[i].cartQuantity;
      }
    
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  },
});
export const { addToCart, removeFromCart, decreaseCart ,clearCart,getTotal} = CartSlice.actions;
export default CartSlice.reducer;
