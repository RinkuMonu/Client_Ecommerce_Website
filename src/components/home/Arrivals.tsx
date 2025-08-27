"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Heart,
  ShoppingCart,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../reduxslice/WishlistSlice";
import { addItemToCart } from "../../reduxslice/CartSlice";
import LoginModal from "../loginModal/LoginModal";
import Login1 from "../../pages/Login1";

interface Product {
  _id: string;
  productName: string;
  images: string;
  category: {
    name: string;
  };
  actualPrice: number;
  price?: number;
  discount?: number;
  description?: string;
  rating?: number;
  reviewCount?: number;
}

const Arrivals = ({ addToCart }: { addToCart: (product: Product) => void }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

  // Popup States
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false);
  const [wishlistProduct, setWishlistProduct] = useState<Product | null>(null);

  // Generate rated products with random ratings and review counts
  const ratedProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      rating: Math.floor(Math.random() * 5) + 1,
      reviewCount: Math.floor(Math.random() * (100 - 25 + 1)) + 25,
    }));
  }, [products]);

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (ratedProducts.length === 0) return;

    const maxSlides = Math.ceil(ratedProducts.length / itemsPerSlide);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [ratedProducts.length, itemsPerSlide]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`
        );
        const data = await res.json();
        if (Array.isArray(data.products)) {
          setProducts(data.products.slice(5, 17)); // Get different slice for arrivals
        } else {
          console.error("Unexpected products format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [baseUrl, referenceWebsite]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = (product: Product) => {
    const token = localStorage.getItem("token");

    const cartItem = {
      id: product._id,
      name: product.productName,
      image: product.images?.[0] || "",
      category: product.category?.name || "Uncategorized",
      price: product.actualPrice || product.price || 0,
      quantity,
    };

    if (!token) {
      const existingCart = JSON.parse(
        localStorage.getItem("addtocart") || "[]"
      );

      const existingProductIndex = existingCart.findIndex(
        (item: any) => item.id === product._id
      );

      if (existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem("addtocart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("guestCartUpdated"));
    } else {
      dispatch(addItemToCart(cartItem));
    }

    setAddedProduct(product);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);

    closeModal();
  };

  const handleAddToWishlist = (product: Product) => {
    const isUserLoggedIn = !!localStorage.getItem("token");

    if (!isUserLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    dispatch(addItemToWishlist(product._id));
    setWishlistProduct(product);
    setIsWishlistPopupVisible(true);

    setTimeout(() => {
      setIsWishlistPopupVisible(false);
    }, 3000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating)
            ? "fill-yellow-400 stroke-yellow-400"
            : "stroke-gray-300"
        }`}
      />
    ));
  };

  const maxSlides = Math.ceil(ratedProducts.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1B2E4F" }}
          >
            Latest <span style={{ color: "rgb(157 48 137)" }}>Arrivals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our newest collection of authentic traditional wear
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center -ml-6 sm:hidden md:flex xs:hidden"
            style={{
              background: "white",
              border: "2px solid rgb(157 48 137)",
              color: "rgb(157 48 137)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgb(157 48 137)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "rgb(157 48 137)";
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center -mr-6 sm:hidden md:flex xs:hidden"
            style={{
              background: "white",
              border: "2px solid rgb(157 48 137)",
              color: "rgb(157 48 137)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgb(157 48 137)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = "rgb(157 48 137)";
            }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`,
                    }}
                  >
                    {ratedProducts
                      .slice(
                        slideIndex * itemsPerSlide,
                        (slideIndex + 1) * itemsPerSlide
                      )
                      .map((product) => (
                        <div
                          key={product._id}
                          className="group relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                          onMouseEnter={() => setHoveredProduct(product._id)}
                          onMouseLeave={() => setHoveredProduct(null)}
                        >
                          {/* Product Image */}
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              className="absolute inset-0 w-full h-full object-cover"
                              src={`http://api.jajamblockprints.com${product.images[0]}`}
                              alt={product.productName}
                              loading="lazy"
                            />

                            {/* Discount Badge */}
                            {product.discount && (
                              <div
                                className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-2 rounded-full z-10"
                                style={{ background: "rgb(157 48 137)" }}
                              >
                                {product.discount}% OFF
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-white rounded-full p-2 shadow-lg transition-all hover:text-white"
                                style={{
                                  color: "rgb(157 48 137)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgb(157 48 137)";
                                  e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "white";
                                  e.currentTarget.style.color =
                                    "rgb(157 48 137)";
                                }}
                              >
                                <ShoppingCart size={18} />
                              </button>
                              <button
                                onClick={() => openProductModal(product)}
                                className="bg-white rounded-full p-2 shadow-lg transition-all hover:text-white"
                                style={{
                                  color: "rgb(157 48 137)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgb(157 48 137)";
                                  e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "white";
                                  e.currentTarget.style.color =
                                    "rgb(157 48 137)";
                                }}
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                onClick={() => handleAddToWishlist(product)}
                                className="bg-white rounded-full p-2 shadow-lg transition-all hover:text-white"
                                style={{
                                  color:
                                    hoveredProduct === product._id
                                      ? "#ef4444"
                                      : "rgb(157 48 137)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgb(157 48 137)";
                                  e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "white";
                                  e.currentTarget.style.color =
                                    "rgb(157 48 137)";
                                }}
                              >
                                <Heart size={18} />
                              </button>
                            </div>

                            {/* Add to Cart Overlay */}
                            {product.stock <= 0 ?<button
                              // onClick={() => handleAddToCart(product)}
                              className={`absolute bottom-0 left-0 w-full text-white py-3 text-center font-semibold transition-all duration-300 z-20 ${
                                hoveredProduct === product._id
                                  ? "translate-y-0 opacity-100"
                                  : "translate-y-full opacity-0"
                              }`}
                              style={{ background: "rgb(157 48 137)" }}
                              disabled={true}
                            >
                              Out of Stock
                            </button> :
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`absolute bottom-0 left-0 w-full text-white py-3 text-center font-semibold transition-all duration-300 z-20 ${
                                hoveredProduct === product._id
                                  ? "translate-y-0 opacity-100"
                                  : "translate-y-full opacity-0"
                              }`}
                              style={{ background: "rgb(157 48 137)" }}
                            >
                              ADD TO CART
                            </button>}
                          </div>

                          {/* Product Info */}
                          <div className="p-5">
                            <div className="mb-3">
                              <Link
                                to={`/product/${product._id}`}
                                state={{
                                  rating: product.rating,
                                  reviewCount: product.reviewCount,
                                }}
                                className="text-lg font-bold mb-1 line-clamp-1"
                                style={{ color: "#1B2E4F" }}
                              >
                                {product.productName}
                              </Link>
                              <p className="text-sm text-gray-500">
                                {product.category?.name || "Traditional Wear"}
                              </p>
                            </div>
                              
                            {/* Rating */}
                            {/* <div className="flex items-center mb-3">
                              <div className="flex mr-2">
                                {renderStars(product.rating)}
                              </div>
                              <span className="text-xs text-gray-500">
                                ({product.reviewCount} Reviews)
                              </span>
                            </div> */}

                            {/* Price */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span
                                  className="text-xl font-bold"
                                  style={{ color: "rgb(157 48 137)" }}
                                >
                                  ₹{product.actualPrice}
                                </span>
                                {product.price &&
                                  product.price !== product.actualPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                      ₹{product.price}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-8" : ""
                }`}
                style={{
                  background:
                    currentSlide === index
                      ? "rgb(157 48 137)"
                      : "rgba(157, 48, 137, 0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold transition-all duration-300 border-2 hover:shadow-lg"
            style={{
              color: "rgb(157 48 137)",
              borderColor: "rgb(157 48 137)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgb(157 48 137)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgb(157 48 137)";
            }}
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* Product Added Popup */}
      {isPopupVisible && addedProduct && (
        <div
          className="fixed top-4 right-4 bg-green-100 text-green-500 p-4 rounded-lg shadow-lg z-50 transition-transform transform translate-x-0 opacity-100"
          style={{
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[12px]">Product Added to Cart</span>
            <button onClick={() => setIsPopupVisible(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="mt-2 text-[12px]">{addedProduct.productName}</p>
        </div>
      )}
      {isWishlistPopupVisible && wishlistProduct && (
        <div
          className="fixed top-4 right-4 bg-yellow-100 text-yellow-500 p-4 rounded-lg shadow-lg z-50 transition-transform transform translate-x-0 opacity-100"
          style={{
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[12px]">Product Added to Wishlist</span>
            <button onClick={() => setIsWishlistPopupVisible(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="mt-2 text-[12px]">{wishlistProduct.productName}</p>
        </div>
      )}
      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className={`relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold" style={{ color: "#1B2E4F" }}>
                {selectedProduct.productName}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
                <img
                  className="rounded-xl object-contain max-h-[400px]"
                  src={`http://api.jajamblockprints.com${selectedProduct.images}`}
                  alt={selectedProduct.productName}
                  loading="lazy"
                />
              </div>

              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {renderStars(selectedProduct.rating || 4)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({selectedProduct.reviewCount} Reviews)
                    </span>
                  </div>
                  <div className="flex items-center mb-6">
                    <span
                      className="text-3xl font-bold mr-3"
                      style={{ color: "rgb(157 48 137)" }}
                    >
                      ₹{selectedProduct.actualPrice}
                    </span>
                    {selectedProduct.price &&
                      selectedProduct.price !== selectedProduct.actualPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          ₹{selectedProduct.price}
                        </span>
                      )}
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {selectedProduct.description ||
                      "Premium quality traditional wear crafted with authentic techniques and finest materials. Perfect for special occasions and cultural celebrations."}
                  </p>
                </div>

                <div className="mb-8">
                  <h4
                    className="text-lg font-semibold mb-4 border-b pb-2"
                    style={{ color: "#1B2E4F" }}
                  >
                    Product Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Category</span>
                      <span className="font-medium">
                        {selectedProduct.category?.name || "Traditional Wear"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Material</span>
                      <span className="font-medium">Premium Fabric</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">Occasion</span>
                      <span className="font-medium">Festive & Wedding</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">
                        Availability
                      </span>
                      <span className="font-medium text-green-600">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                    style={{ background: "rgb(157 48 137)" }}
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1 />
        </LoginModal>
      )}
    </section>
  );
};

export default Arrivals;