import { configureStore} from "@reduxjs/toolkit";
import ProductReducer from "./Feature/ProductSlice"
import cartReducer from "./Feature/CartSlice"

export const store = configureStore({
  reducer: {
   
      products:ProductReducer,
      cart:cartReducer
    
  },
});
// store.dispatch(productFetch(productFetch()))
