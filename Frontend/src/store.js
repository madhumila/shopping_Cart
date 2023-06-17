import { configureStore} from "@reduxjs/toolkit";
import ProductReducer, { productFetch } from "./Feature/ProductSlice"
import cartReducer, { getTotal } from "./Feature/CartSlice"

export const store = configureStore({
  reducer: {
   
      products:ProductReducer,
      cart:cartReducer
    
  },
});
store.dispatch(productFetch())
store.dispatch(getTotal())

