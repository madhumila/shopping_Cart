import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import NotFound from "./Components/NotFound";
import {ToastContainer} from "react-toastify"


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/cart" Component={Cart} />
          <Route path="/not found" Component={NotFound} />
          <Route path="*" Component={NotFound} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
