"use client";
import { useEffect, useState, useMemo } from "react";
import type React from "react";
import { Eye, Heart, ShoppingCart, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../reduxslice/WishlistSlice";
import { addItemToCart } from "../../reduxslice/CartSlice";
import LoginModal from "../loginModal/LoginModal";
import Login1 from "../../pages/Login1";

interface Product {
  _id: string;
  productName: string;
  description: string;
  images: string[];
  actualPrice: number;
  price?: number;
  discount?: number;
  size?: string;
  brand?: string;
  category: {
    _id: string;
    name: string;
  };
  rating?: number;
  reviewCount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false);
  const [wishlistProduct, setWishlistProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Generate random review count and rating if not provided
  const ratedProduct = useMemo(() => {
    return {
      ...product,
      rating: product.rating ?? Math.floor(Math.random() * 5) + 1, // 1-5
      reviewCount:
        product.reviewCount ?? Math.floor(Math.random() * (100 - 25 + 1)) + 25, // 25-100
    };
  }, [product]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation();
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

    // closeModal();
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isUserLoggedIn = !!localStorage.getItem("token");

    if (!isUserLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    dispatch(addItemToWishlist(ratedProduct));
    setWishlistProduct(ratedProduct);
    setIsWishlistPopupVisible(true);

    setTimeout(() => {
      setIsWishlistPopupVisible(false);
    }, 3000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={12}
        className={`${
          i < Math.floor(rating)
            ? "fill-yellow-400 stroke-yellow-400"
            : "stroke-gray-300"
        }`}
      />
    ));
  };

  // Handle image URL construction more safely
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    return imagePath.startsWith("http")
      ? imagePath
      : `http://api.jajamblockprints.com${imagePath}`;
  };
  const outOfStock = !ratedProduct || ratedProduct.stock <= 0;

  return (
    <>
      <Link
        to={`/product/${ratedProduct._id}`}
        state={{
          rating: ratedProduct.rating,
          reviewCount: ratedProduct.reviewCount,
        }}
        className="group block"
      >
        <div
          className="bg-white rounded-xl shadow-sm overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Section */}
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            {ratedProduct.images?.[0] && (
              <img
                src={getImageUrl(ratedProduct.images[0])}
                alt={ratedProduct.productName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}

            {ratedProduct.images?.[1] && (
              <img
                src={getImageUrl(ratedProduct.images[1])}
                alt={`${ratedProduct.productName} - View 2`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}

            {ratedProduct.discount && (
              <div
                className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-full z-10"
                style={{ background: "rgb(157 48 137)" }}
              >
                {ratedProduct.discount}% OFF
              </div>
            )}

            <div
              className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2"
              }`}
            >
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                style={{ color: "rgb(157 48 137)" }}
                title="Add to Cart"
                aria-label="Add to cart"
                disabled={product.stock <= 0}
              >
                <ShoppingCart size={16} />
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                style={{ color: "rgb(157 48 137)" }}
                title="Add to Wishlist"
                aria-label="Add to wishlist"
              >
                <Heart size={16} />
              </button>
              <Link
                to={`/product/${ratedProduct._id}`}
                className="bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                style={{ color: "rgb(157 48 137)" }}
                title="Quick View"
                aria-label="Quick view"
              >
                <Eye size={16} />
              </Link>
            </div>

            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-all duration-300 ${
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <button
                onClick={(e) => {
                  if (outOfStock) return; // safety guard
                  handleAddToCart(e, product);
                }}
                disabled={outOfStock}
                className={[
                  "w-full text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300",
                  outOfStock
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : "hover:scale-105",
                ].join(" ")}
                style={{ background: "rgb(157 48 137)" }}
                aria-label={outOfStock ? "Out of Stock" : "Add to cart"}
              >
                {outOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {ratedProduct.brand && (
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                {ratedProduct.brand}
              </p>
            )}

            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
              {ratedProduct.productName}
            </h3>

            <p className="text-xs text-gray-500 mb-2">
              {ratedProduct.category?.name || "Traditional Wear"}
            </p>

            {/* Enhanced Rating Display */}
            {/* <div className="flex items-center mb-3 gap-1">
              <div className="flex mr-1">
                {renderStars(ratedProduct.rating ?? 0)}
              </div>
              <span className="text-xs text-gray-500">
                ({ratedProduct.reviewCount?.toLocaleString() ?? 0})
              </span>
            </div> */}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span
                  className="text-lg font-bold"
                  style={{ color: "rgb(157 48 137)" }}
                >
                  ₹{ratedProduct.actualPrice.toLocaleString()}
                </span>
                {ratedProduct.price &&
                  ratedProduct.price !== ratedProduct.actualPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{ratedProduct.price.toLocaleString()}
                    </span>
                  )}
              </div>
              {ratedProduct.discount && (
                <span className="text-xs font-medium text-green-600">
                  Save {ratedProduct.discount}%
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {isWishlistPopupVisible && wishlistProduct && (
        <div
          className="fixed top-4 right-4 bg-yellow-100 text-yellow-500 p-4 rounded-lg shadow-lg z-50 transition-transform transform translate-x-0 opacity-100"
          style={{
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[12px]">Product Added to Wishlist</span>
            <button
              onClick={() => setIsWishlistPopupVisible(false)}
              aria-label="Close notification"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mt-2 text-[12px]">{wishlistProduct.productName}</p>
        </div>
      )}
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
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1 />
        </LoginModal>
      )}
    </>
  );
};

export default ProductCard;
