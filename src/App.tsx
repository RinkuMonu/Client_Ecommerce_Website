import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/cart/Cart";
import Cookies from "./pages/tems$policy/Cookies";
import Privacy from "./pages/tems$policy/Privacy";
import CancellationPolicy from "./pages/tems$policy/CancellationPolicy";
import Refund from "./pages/tems$policy/Refund";
import Termsandcondition from "./pages/tems$policy/Termsandcondition";
import ShippingAddress from "./pages/AddresShiping";
import Shipping from "./pages/tems$policy/Shipping";
// import Policy from "./pages/Policy"
import Terms from "./pages/tems$policy/Terms";
import { Product } from "./types"; // Import Product interface
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { addItemToCart, fetchCart } from "./reduxslice/CartSlice";
import Orders from "./pages/orders";
import ShoppingCart from "./pages/BackCart";
// import {Phonepay} from './components/Phonepay/Phonepay';
import Checkout from "./components/checkout/checkout";
import PaymentStatus from "./components/PaymentStatus/PaymentStatus";
import ResultPage from "./pages/ResultPage";
import Wishlist from "./pages/Wishlist";
import VendorVerificationForm from "./pages/VerdorVerification";
import OrderHistory from "./pages/order-history";
import TrackOrder from "./pages/track-order";
import Products from "./pages/Products";
import WhatsAppButton from "./pages/WhatsAppButton";
import LoginModal from "./components/loginModal/LoginModal";
import AboutUs from "./pages/AboutUs";
import { ProfilePage } from "./components/userProfile/userProfile";
import SearchPage from "./pages/SearchPage";

function App() {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Pages where Navbar and Footer should not be displayed
  const hideNavbarFooter = ["/address", "/test"];
  const shouldHide = hideNavbarFooter.includes(location.pathname);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const cartData = JSON.parse(localStorage.getItem("addtocart") || "[]");
  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from Redux store
  const getCartItem = isLoggedIn ? cartItems : cartData;
  // console.log(getCartItem,"Get Cart Item")
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      dispatch(fetchCart()); // ✅ fetch from backend if logged in
    }
  }, [dispatch]);

  // const handleAddToCart = (product: Product) => {
  //   dispatch(
  //     addItemToCart({
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       image: product.image,
  //     }),

  //   );
  //   toggleCart()
  // };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      })
    );
    toggleCart();
  };

  const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHide && (
        <Navbar onCartClick={toggleCart} cartItemCount={cartItems.length} />
      )}
      <ScrollToTop />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <Login />
      </LoginModal>
      <main className="flex-grow">
        <Routes>
          {/* royruhdfhdhf */}
          {/* <Route path="/" element={<Home addToCart={handleAddToCart} />} /> */}
          <Route
            path="/"
            element={
              <Home addToCart={handleAddToCart} onCartClick={toggleCart} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/product/:id"
            element={<ProductDetails addToCart={handleAddToCart} />}
          />
          {/* <Route path="/refund" element={<Refund />} />
            <Route path="/terms" element={<Terms />} />*/}
          {/* <Route path="/policy" element={<Policy />} />  */}
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/returns-and-exchanges" element={<Refund />} />
          <Route path="/cancellation_policy" element={<CancellationPolicy />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/shipping-policy" element={<Shipping />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route
            path="/address"
            element={
              <ShippingAddress cartItems={getCartItem} onClose={toggleCart} />
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/cart"
            element={<ShoppingCart cartItems={getCartItem} />}
          />
          <Route path="/paymentstatus" element={<PaymentStatus />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/resultPage" element={<ResultPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/vendorverification"
            element={<VendorVerificationForm />}
          />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/trackorder" element={<TrackOrder />} />
          <Route path="/products" element={<Products />} />
          <Route path="/terms-and-conditions" element={<Termsandcondition />} />

          {/* <Route path="/phonepay" element={<Phonepay/>} />  */}
        </Routes>
      </main>
      <Cart isOpen={isCartOpen} onClose={toggleCart} cartItems={cartItems} />
      {!shouldHide && <Footer />}
      <WhatsAppButton />
    </div>
  );
}

export default App;
