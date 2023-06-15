import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { productFetch } from "../Feature/ProductSlice";
import { addToCart } from "../Feature/CartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const abcd = dispatch(productFetch());
  }, []);
  const items = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.status);
  // console.log(items);
  const handleAddToCart = (item)=>{
    dispatch(addToCart(item));
    navigate("/cart")
    
  }

  return (
    <div className="home-container">
      {Object.keys(items).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div>
          <h2>New Arrivals</h2>
          <div className="products">
          {items.map((item) => {
            return (
              <>
                <div key={item.id} className="product">
                <h3>{item.name}</h3>
                <img src={item.image} alt={item.name} />
                <div className="details">
                <span>{item.desc}</span>
                <span className="price">${item.price}</span>
                </div>
                <button onClick={()=>handleAddToCart(item)}>Add to cart</button>
               </div>
              </>
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
};

export default Home;
