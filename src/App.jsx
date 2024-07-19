import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";

const App = () => {
  const {
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
  } = useCart();
  return (
    <>
      <Header
        cart={cart}
        totalItems={totalItems}
        total={total}
        removeItem={removeItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
        isEmpty={isEmpty}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
