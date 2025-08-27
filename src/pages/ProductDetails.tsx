"use client";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaRegCopy,
  FaRegUser,
} from "react-icons/fa";
import Arrivals from "../components/home/Arrivals";
import { useDispatch } from "react-redux";
import LoginModal from "../components/loginModal/LoginModal";
// import Login from "../pages/Login";

import { addItemToCart } from "../reduxslice/CartSlice";
import Login1 from "./Login1";
import { X } from "react-feather";
import { RatingModal } from "./reviewmodal";
// Define Product type directly in this file as requested
interface Product {
  _id: string;
  productName: string;
  description: string;
  images: string[];
  actualPrice: number;
  price?: number; // Original price, optional
  discount?: number; // Discount percentage, optional
  size?: string; // Size, optional
  category: {
    _id: string;
    name: string;
  };
  rating?: number; // Rating, optional
  quantity?: number; // Used in cart context, optional
}

interface ProductDetailsProps {
  addToCart: (product: Product) => void;
}

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const location = useLocation();
  const rating = location.state?.rating || 4;
  const reviewCount = location.state?.reviewCount;
  const [product, setProduct] = useState<Product | null>(null);
  // console.log(product,"sadfg")
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const [mainImage, setMainImage] = useState<string>(""); // Re-introducing mainImage state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

  // Popup States
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState<any>(null);
  const [review, setReview] = useState(null);
  const [gettoken, settoken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    settoken(token);
    const fetchReview = async () => {
      try {
        const response = await fetch(`${baseUrl}/sendreview/${id}`);
        const data = await response.json();
        setReview(data);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      fetchReview();
    }
  }, [id, isRatingModalOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // All Products
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`
        );
        const allData = await res.json();
        setAllProducts(allData.products);

        // Single Product
        const response = await fetch(
          `${baseUrl}/product/getproduct/${id}?referenceWebsite=${referenceWebsite}`
        );
        const singleData = await response.json();
        setProduct(singleData.product);

        if (singleData.product?.images?.length > 0) {
          setMainImage(singleData.product.images[0]);
        } else {
          setMainImage("/placeholder.svg?height=600&width=600");
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setProduct(null);
        setMainImage("/placeholder.svg?height=600&width=600");
      }
    };

    if (id) fetchProducts();
  }, [id, baseUrl, referenceWebsite]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  useEffect(() => {
    if (product?.size?.length) {
      setSelectedSize(product.size[0]);
    }
  }, [product]);
  // const handleAddToCart = () => {
  //   if (product) {
  //     addToCart({
  //       ...product,
  //       quantity,
  //     })
  //   }
  // }

  // const handleAddToWishlist = (product: any) => {
  //     dispatch(addItemToWishlist(product._id))
  //   }
  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   const isUserLoggedIn = !!localStorage.getItem("token");

  //   if (!isUserLoggedIn) {
  //     setShowLoginModal(true);
  //     return;
  //   }

  //   if (product) {
  //     dispatch(
  //       addItemToCart({
  //         id: product._id,
  //         name: product.productName,
  //         image: product.images?.[0] || "",
  //         category: product.category?.name || "Uncategorized",
  //         price: product.actualPrice,
  //         quantity: 1,
  //       })
  //     );
  //     setAddedProduct(product);
  //     setIsPopupVisible(true);

  //     setTimeout(() => {
  //       setIsPopupVisible(false);
  //     }, 3000);
  //   } else {
  //     console.warn("Product is undefined");
  //   }
  // };

  const handleAddToCart = (product: any) => {
    const token = localStorage.getItem("token");

    const cartItem = {
      id: product._id,
      name: product.productName,
      image: product.images?.[0] || "",
      category: product.category?.name || "Uncategorized",
      price: selectedSize?.price || product.actualPrice || product.price,
      quantity,
    };

    if (!token) {
      // Get existing cart or initialize empty array
      const existingCart = JSON.parse(
        localStorage.getItem("addtocart") || "[]"
      );

      // Check if product already in cart
      const existingProductIndex = existingCart.findIndex(
        (item: any) => item.id === product._id
      );

      if (existingProductIndex !== -1) {
        // Product exists – increase quantity
        existingCart[existingProductIndex].quantity += quantity;
      } else {
        // New product – add to cart
        existingCart.push(cartItem);
      }

      // Save updated cart back to localStorage
      localStorage.setItem("addtocart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("guestCartUpdated"));
    } else {
      // User is logged in – use Redux
      dispatch(addItemToCart(cartItem));
    }

    // UI feedback
    setAddedProduct(product);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);

    // closeModal();
  };

  const handleBuyNow = () => {
    const isUserLoggedIn = !!localStorage.getItem("token");
    if (!isUserLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (product) {
      addToCart({
        id: product._id,
        name: product.productName,
        image: product.images?.[0] || "",
        category: product.category?.name || "Uncategorized",
        price: selectedSize?.price || product.actualPrice || product.price,
        quantity,
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating)
            ? "fill-yellow-400 stroke-yellow-400"
            : "stroke-gray-300"
        }`}
      />
    ));
  };

  let relatedProductsFiltered = allProducts.filter(
    (p) => p._id !== id && p.category?._id === product?.category?._id
  );
  if (relatedProductsFiltered.length < 4) {
    const otherProducts = allProducts.filter(
      (p) =>
        p._id !== id && !relatedProductsFiltered.some((rp) => rp._id === p._id)
    );
    relatedProductsFiltered = [
      ...relatedProductsFiltered,
      ...otherProducts,
    ].slice(0, 4);
  }
  //  const reviewCount = useMemo(() => {
  //   return Math.floor(Math.random() * (100 - 25 + 1)) + 25;
  // }, []);

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-2xl font-semibold text-gray-700">
        Loading product details...
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col items-center">
          <div
            className="relative w-full max-w-xl rounded-3xl overflow-hidden  border-4 border-transparent transition-all duration-300 hover:border-purple-200"
            style={{ borderColor: "rgba(157, 48, 137, 0.1)" }}
          >
            <img
              // src={mainImage || "/placeholder.svg?height=600&width=600&query=main product image"}
              src={`http://api.jajamblockprints.com${mainImage}`}
              alt={product.productName}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex mt-6 space-x-4">
            {product.images.map((img, index) => {
              const fullUrl = `http://api.jajamblockprints.com${img}`;
              return (
                <img
                  key={index}
                  src={fullUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-24 h-24 object-cover rounded-xl cursor-pointer border-3 transition-all duration-300 transform hover:scale-105 ${
                    mainImage === img
                      ? "border-purple-600 shadow-lg"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              );
            })}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-2">
          <h1
            className="text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "#1B2E4F" }}
          >
            {product?.productName}
          </h1>
          <p className="text-gray-700 text-xl mb-6 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </p>

          {/* <div className="flex items-center mb-5">
            <div className="flex mr-3">{renderStars(rating)}</div>
            <span className="text-base text-gray-600">
              ({reviewCount} Reviews)
            </span>
          </div> */}

          <div className="flex items-baseline mb-8">
            {/* Selected size price OR fallback to actual price */}
            <span
              className="text-5xl font-bold mr-4"
              style={{ color: "rgb(157 48 137)" }}
            >
              ₹{selectedSize?.price || product?.actualPrice}
            </span>

            {/* Show strikethrough price only if there's a difference */}
            {product?.price &&
              (selectedSize?.price
                ? selectedSize.price < product.price
                : product.actualPrice < product.price) && (
                <span className="text-2xl text-gray-500 line-through">
                  ₹{product?.price}
                </span>
              )}

            {/* Show discount badge */}
            {product?.discount && (
              <span
                className="ml-6 px-4 py-2 rounded-full text-lg font-semibold text-white shadow-md"
                style={{ background: "rgb(157 48 137)" }}
              >
                {product?.discount}% OFF
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-gray-800 text-lg mb-8">
            <div>
              <span className="font-semibold">Size:</span>{" "}
              {Array.isArray(product?.size) && product.size.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-3">
                  {product.size.map((s) => (
                    <button
                      key={s._id}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all
            ${
              selectedSize?._id === s._id
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-400 hover:border-black"
            }`}
                    >
                      {s.sizes}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="text-gray-700 ml-2">Standard</span>
              )}
              {selectedSize && (
                <div className="mt-3 text-green-700 font-medium text-base">
                  Price for {selectedSize.sizes}: ₹{selectedSize.price}
                </div>
              )}
            </div>

            <div>
              <span className="font-semibold">Category:</span>{" "}
              <span className="text-gray-700">
                {product?.category?.name || "Uncategorized"}
              </span>
            </div>
            <div>
              <span className="font-semibold">Material:</span>{" "}
              <span className="text-gray-700">{product?.material}</span>
            </div>
            <div>
              <span className="font-semibold">Availability:</span>{" "}
              <span
                className={`font-medium ${
                  product?.stock <= 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {product?.stock <= 0 ? "Out Of Stock" : "In stock"}
              </span>
            </div>
          </div>

          <div className="flex items-center mb-10">
            <span className="mr-6 text-gray-800 font-semibold text-lg">
              Quantity:
            </span>
            <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden shadow-sm">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-base font-semibold" // Smaller buttons
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-1 text-base font-semibold text-gray-900">
                {quantity}
              </span>{" "}
              {/* Smaller font */}
              <button
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-base font-semibold" // Smaller buttons
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {" "}
            {/* Reduced gap */}
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.stock <= 0}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-sm ${
                product?.stock <= 0 && "cursor-not-allowed opacity-50"
              } `} // Smaller buttons
              style={{ background: "rgb(157 48 137)" }}
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-xl hover:scale-[1.02] text-sm ${
                product?.stock <= 0 && "cursor-not-allowed opacity-50"
              }`} // Smaller buttons
            >
              Buy Now
            </button>
            {/* <button
              className="flex items-center justify-center gap-2 px-5 py-3 border-2 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-sm" // Smaller buttons
              style={{ borderColor: "rgb(157 48 137)", color: "rgb(157 48 137)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgb(157 48 137)"
                e.currentTarget.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "rgb(157 48 137)"
              }}
            >
              <Heart size={20} /> Add to Wishlist
            </button> */}
          </div>

          {/* Share Options */}
          <div className="flex items-center gap-4 text-gray-600 text-xl">
            <span className="font-semibold text-lg text-gray-800">Share:</span>
            <a
              href="#"
              aria-label="Share on Facebook"
              className="hover:text-purple-600 transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Share on Twitter"
              className="hover:text-purple-600 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="Share on Pinterest"
              className="hover:text-purple-600 transition-colors"
            >
              <FaPinterestP />
            </a>
            <a
              href="#"
              aria-label="Share on LinkedIn"
              className="hover:text-purple-600 transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              aria-label="Share on WhatsApp"
              className="hover:text-purple-600 transition-colors"
            >
              <FaWhatsapp />
            </a>
            <a
              href="#"
              aria-label="Share via Email"
              className="hover:text-purple-600 transition-colors"
            >
              <FaEnvelope />
            </a>
            <button
              aria-label="Copy link"
              className="hover:text-purple-600 transition-colors"
            >
              <FaRegCopy />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20 p-10 rounded-3xl border-2 border-gray-100">
        <div className="flex flex-wrap border-b-2 border-gray-200 mb-8">
          {/* Button for Description Tab */}
          <button
            onClick={() => setActiveTab("description")}
            className={`px-10 py-4 text-xl font-bold transition-all duration-300 w-full sm:w-auto ${
              activeTab === "description"
                ? "border-b-4 border-purple-600 text-purple-800"
                : "text-gray-700 hover:text-purple-600"
            }`}
            style={{
              borderColor: activeTab === "description" ? "rgb(157 48 137)" : "",
            }}
          >
            Description
          </button>

          {/* Button for Reviews Tab */}
          <div className=" flex justify-between gap-6 ">
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-10 py-4 text-xl font-bold transition-all duration-300 w-full sm:w-auto ${
                activeTab === "reviews"
                  ? "border-b-4 border-purple-600 text-purple-800"
                  : "text-gray-700 hover:text-purple-600"
              }`}
              style={{
                borderColor: activeTab === "reviews" ? "rgb(157 48 137)" : "",
              }}
            >
              Reviews
            </button>
            {activeTab === "reviews" && gettoken && (
              <button
                onClick={() => setRatingModalOpen(true)}
                className="px-10 py-4 text-xl font-bold transition-all duration-300 
    bg-white text-gray-800 
    hover:bg-gray-100 hover:border-gray-400 
    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
    rounded-lg shadow-sm hover:shadow-md"
              >
                Rate Product
              </button>
            )}
          </div>
        </div>

        <div className="py-8 text-gray-700 text-lg leading-relaxed">
          {activeTab === "description" ? (
            <div>
              <h3
                className="text-2xl font-bold mb-5"
                style={{ color: "#1B2E4F" }}
              >
                Product Overview
              </h3>
              <p className="mb-5">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </p>
              {/* <p className="mb-5">
                This exquisite piece is crafted with the finest traditional
                techniques, ensuring both authenticity and durability. Perfect
                for special occasions, it embodies the rich cultural heritage of
                our artisans.
              </p> */}
              {/* <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Handwoven with premium threads</li>
                <li>Intricate traditional patterns</li>
                <li>Comfortable and breathable fabric</li>
                <li>Ideal for festive wear and celebrations</li>
              </ul> */}
            </div>
          ) : (
            <div>
              <h3
                className="text-2xl font-bold mb-5"
                style={{ color: "#1B2E4F" }}
              >
                Customer Reviews
              </h3>
              {review?.length > 0 ? (
                <div className="space-y-8">
                  {review?.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex flex-col items-start mb-2 gap-3">
                        <span className="flex justify-center items-center gap-3 font-semibold text-gray-900 mr-3">
                          <FaRegUser />
                          {review?.user?.firstName} {review?.user?.lastName}
                        </span>
                        <div className="flex">
                          {renderStars(review?.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {review.date}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {review?.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">
                  No reviews yet. Be the first to share your experience!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1 />
        </LoginModal>
      )}
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
      {/* Related Products Section */}
      {/* <div className="mt-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight" style={{ color: "#1B2E4F" }}>
            You Might Also <span style={{ color: "rgb(157 48 137)" }}>Like</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore other handcrafted treasures from our authentic collection, curated just for you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts.map((relProd) => (
            <Link key={relProd._id} to={`/product/${relProd._id}`} className="group block">
              <div
                className="bg-white rounded-2xl shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(157, 48, 137, 0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
              >
            
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={relProd.images?.[0] || "/placeholder.svg?height=200&width=300&query=related product"}
                    alt={relProd.productName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                 
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300"
                      style={{ background: "rgb(157 48 137)" }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-1" style={{ color: "#1B2E4F" }}>
                    {relProd.productName}
                  </h3>
                  <p className="text-base text-gray-600 mb-4">{relProd.category?.name || "Traditional Wear"}</p>
                  <div className="flex items-center text-base font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-2xl font-bold" style={{ color: "rgb(157 48 137)" }}>
                      ₹{relProd.actualPrice}
                    </span>
                    {relProd.price && relProd.price !== relProd.actualPrice && (
                      <span className="ml-3 text-base text-gray-400 line-through">₹{relProd.price}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

    
      </div> */}
      <Arrivals
        addToCart={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      {isRatingModalOpen && (
        <RatingModal
          isOpen={isRatingModalOpen}
          onClose={() => setRatingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
