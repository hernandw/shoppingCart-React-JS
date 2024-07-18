import { useState } from "react";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db.js";

const max_stock = 5;

const App = () => {
  const [guitars, setGuitars] = useState(db);
  const [cart, setCart] = useState([]);
  const [activo, setActivo] = useState(false);

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

    setActivo(true);
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

  return (
    <>
      <Header
        cart={cart}
        activo={activo}
        removeItem={removeItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
