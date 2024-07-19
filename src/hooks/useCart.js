import { useEffect, useState } from "react";
import { db } from "../data/db.js";

const max_stock = 5;

export const useCart = () => {
    const initialCart = () => {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
      };
    
    
      const [guitars, setGuitars] = useState(db);
      const [cart, setCart] = useState(initialCart);
      
    
     const isEmpty = cart.length === 0;
    
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);
    
      const addToCart = (item) => {
        setCart([...cart, item]);
        const existsProduct = cart.findIndex((product) => product.id === item.id);
        
        if (existsProduct >= 0) {
          const updateCart = [...cart];
          if (updateCart[existsProduct].quantity >= max_stock) return;
          updateCart[existsProduct].quantity++;
          setCart(updateCart);
        } else {
          item.quantity = 1;
          setCart([...cart, item]);
        }
    
        
      };
    
      const removeItem = (id) => {
        const updateCart = cart.filter((item) => item.id !== id);
        setCart(updateCart);
      };
    
      const increaseQuantity = (id) => {
        const updateCart = cart.map((item) => {
          if (item.id === id && item.quantity < max_stock) {
            item.quantity++;
          }
          return item;
        });
        setCart(updateCart);
      };
    
      const decreaseQuantity = (id) => {
        const updateCart = cart
          .map((item) => {
            if (item.id === id) {
              item.quantity--;
            }
            return item;
          })
          .filter((item) => item.quantity > 0);
        setCart(updateCart);
      };
    
      const cleanCart = () => {
        setCart([]);
      };
    
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);
      const total = cart.reduce(
        (acc, guitar) => acc + guitar.quantity * guitar.price,
        0
      );
      const totalItems = cart.reduce((acc, guitar) => acc + guitar.quantity, 0);
  return {

    guitars,
    cart,
    totalItems,
    total,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    isEmpty,
    addToCart,
    setCart,
    setGuitars,
    
  }

}