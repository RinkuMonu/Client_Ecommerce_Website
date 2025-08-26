"use client";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assest/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWishlist, clearWishlist } from "../../reduxslice/WishlistSlice";
import { FaHeart, FaUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

interface NavbarProps {
  onCartClick: () => void;
  cartItemCount: number;
}

interface UserData {
  firstName: string;
  lastName?: string;
  email: string;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartItemCount }) => {
  const dispatch = useDispatch();
  const wishlistCount = useSelector(
    (state: any) => state.wishlist.items.length
  );
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // For guest users: get items from localStorage, fallback to empty array
  const cartItemsFromLocalStorage = JSON.parse(
    localStorage.getItem("addtocart") || "[]"
  );

  // If logged in, use Redux or server count (assumed as `cartItemCount`); else, use local cart length
  const totalCart = isLoggedIn
    ? cartItemCount
    : cartItemsFromLocalStorage.length;

  // State management
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [subCateName, setSubCateName] = useState([]);
  const [user, setUser] = useState<UserData | null>(null);
  // console.log("cateeee", categories);

  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Constants
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const primaryColor = "rgb(157 48 137)";
  const textColor = "#1B2E4F";

  // Memoized styles
  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor}, #2A4172)`,
  };
  const buttonHoverStyle = {
    background: `linear-gradient(90deg, rgba(56, 77, 137, 0.1), rgba(161, 60, 120, 0.1))`,
    color: primaryColor,
  };

  // Event handlers
  const handleLogout = useCallback(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    dispatch(clearWishlist());
    navigate("/login");
    window.location.reload();
    setUserMenuOpen(false);
  }, [dispatch, navigate]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery) {
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
        setSearchOpen(false);
      }
    },
    [searchQuery, navigate]
  );

  const handleCategorySelect = useCallback(
    (category: string) => {
      navigate(`/category/${slugify(category.toLowerCase())}`);
      setSearchQuery("");
      setMoreMenuOpen(false);
      setMenuOpen(false);
    },
    [navigate]
  );

  // Data fetching
  const [groupedCategories, setGroupedCategories] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`);
        const data = await res.json();
        console.log(data);

        setCategories(data?.website?.categories)
        // Group items by subcategory
        const grouped = {};
        if (Array.isArray(data?.website?.categories)) {
          data?.website?.categories.forEach((item) => {
            const sub = item?.subcategory;
            if (!grouped[sub]) grouped[sub] = [];
            grouped[sub].push(item);
          });
        }

        setGroupedCategories(grouped);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [baseUrl, referenceWebsite]);

  function slugify(text) {
    if (typeof text !== "string") return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // spaces → hyphens
      .replace(/[^\w-]+/g, "") // remove special chars
      .replace(/--+/g, "-"); // collapse multiple hyphens
  }
  // User and scroll effects
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("userData");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        setUser(null);
      }
    };

    loadUser();
    const handleScroll = () => setIsSticky(window.scrollY > 100);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", loadUser);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // Wishlist and click outside effects
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchQuery("");
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Render functions for reusable components
  const renderSearchResults = () => (
    <div
      className="absolute z-20 mt-3 w-full bg-gradient-to-b from-slate-50 to-blue-50 shadow-2xl rounded-2xl overflow-hidden border-3 max-h-60 overflow-y-auto"
      style={{ borderColor: primaryColor }}
    >
      {categories
        .filter((cat) => cat?.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((cat, index) => (
          <div
            key={index}
            className="px-4 xl:px-6 py-3 xl:py-4 cursor-pointer transition-all duration-200 flex items-center justify-between border-b last:border-b-0 hover:shadow-md"
            style={{
              borderColor: primaryColor,
              background:
                index % 2 === 0 ? "transparent" : "rgba(56, 77, 137, 0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(90deg, rgba(56, 77, 137, 0.1), rgba(161, 60, 120, 0.1))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                index % 2 === 0 ? "transparent" : "rgba(56, 77, 137, 0.05)";
            }}
            onClick={() => handleCategorySelect(cat?.name)}
          >
            <span
              className="font-bold text-sm xl:text-base"
              style={{ color: textColor }}
            >
              {cat?.name}
            </span>
            <div className="flex items-center">
              <span
                className="text-xs text-white px-2 xl:px-3 py-1 rounded-full font-semibold"
                style={{
                  background: "linear-gradient(135deg, #A13C78, #872D67)",
                }}
              >
                Category
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 xl:h-5 xl:w-5 ml-2 xl:ml-3"
                style={{ color: primaryColor }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
    </div>
  );

  const renderUserMenu = () => (
    <div
      className="absolute right-0 mt-3 w-56 xl:w-64 bg-gradient-to-b from-slate-50 to-blue-50 shadow-2xl rounded-2xl overflow-hidden z-30 border-3"
      style={{ borderColor: primaryColor }}
    >
      {user ? (
        <>
          <div
            className="px-4 xl:px-6 py-3 xl:py-4 border-b-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(56, 77, 137, 0.1), rgba(161, 60, 120, 0.1))",
              borderColor: primaryColor,
            }}
          >
            <button onClick={() => setUserMenuOpen(false)}>
              <Link
                to={"/profile"}
                className="flex justify-start items-center gap-3"
              >
                <div>
                  <FaUser color="#C35DAE" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-sm font-bold" style={{ color: textColor }}>
                    {user?.firstName} {user?.lastName || ""}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: primaryColor }}
                  >
                    {user?.email}
                  </p>
                </div>
              </Link>
            </button>
          </div>
          <div className="py-2">
            <Link
              to="/wishlist"
              className="block px-4 xl:px-6 py-3 text-sm font-semibold transition-all hover:shadow-md flex justify-start items-center gap-3"
              style={{ color: textColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = buttonHoverStyle.background;
                e.currentTarget.style.color = primaryColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = textColor;
              }}
              onClick={() => setUserMenuOpen(false)}
            >
              <FaHeart color="#C35DAE" />
              Your Wishlist
            </Link>
          </div>
          <div
            className="py-2 border-t-2"
            style={{ borderColor: primaryColor }}
          >
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 xl:px-6 py-3 text-sm font-semibold transition-all hover:shadow-md flex justify-start items-center gap-3"
              style={{ color: textColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, rgba(193, 70, 127, 0.1), rgba(135, 45, 103, 0.1))";
                e.currentTarget.style.color = "#872D67";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = textColor;
              }}
            >
              <CiLogin color="#C35DAE" size={20} />
              Sign out
            </button>
          </div>
        </>
      ) : (
        <div className="py-2">
          <Link
            to="/login"
            className="block px-4 xl:px-6 py-3 xl:py-4 text-center text-white font-bold transition-all hover:shadow-lg"
            style={gradientStyle}
            onClick={() => setUserMenuOpen(false)}
          >
            Login / Register
          </Link>
          <div className="p-4 xl:p-6">
            <p
              className="text-xs text-center font-medium"
              style={{ color: primaryColor }}
            >
              Join our heritage family for exclusive collections and faster
              checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderMobileMenu = () => (
    <div className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-60 transition-opacity">
      <div
        className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-gradient-to-b from-slate-50 to-blue-50 shadow-2xl z-50 transform transition-transform duration-300 border-l-4"
        style={{ borderColor: primaryColor }}
      >
        <div className="flex flex-col h-full relative">
          <div
            className="p-4 sm:p-6 relative overflow-hidden"
            style={gradientStyle}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-blue-200 focus:outline-none z-40"
              aria-label="Close menu"
            >
              <X size={24} className="sm:w-7 sm:h-7" />
            </button>
            {user ? (
              <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
                <Link
                  to={"/profile"}
                  className="flex items-center space-x-3 sm:space-x-4 relative z-10"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white bg-opacity-20 text-white rounded-full border-2 border-white border-opacity-30">
                    <User size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-base sm:text-lg">
                      {user.firstName}
                    </p>
                    <p className="text-xs text-blue-100">Welcome back!</p>
                  </div>
                </Link>
              </div>
            ) : (
              <div
                className="space-y-3 sm:space-y-4 relative z-10"
                style={{ width: "fit-content" }}
              >
                <p
                  className="text-white font-bold text-base sm:text-lg"
                  style={{ width: "fit-content" }}
                >
                  Welcome to Heritage Store!
                </p>
                <div className="flex space-x-2 sm:space-x-3">
                  <Link
                    to="/login"
                    className="flex-1 bg-white bg-opacity-20 text-white text-center py-2 sm:py-3 rounded-lg font-bold border-2 border-white border-opacity-30 hover:bg-opacity-30 transition-all text-sm sm:text-base"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 bg-white text-center py-2 sm:py-3 rounded-lg font-bold hover:bg-blue-50 transition-all text-sm sm:text-base"
                    style={{ color: primaryColor }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="py-4">
              <h3
                className="px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2"
                style={{ color: textColor, borderColor: primaryColor }}
              >
                Heritage Categories
              </h3>
              <div className="flex flex-col space-x-1">
                {Object.entries(groupedCategories).map(
                  ([subcategory, items]) => (
                    <div key={subcategory} className="relative group">
                      <div
                        // to={`/category/${slugify(subcategory)}`}
                        className="relative px-3 py-2 text-sm font-bold transition-all duration-300"
                        style={{ color: textColor }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = textColor;
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(157, 48, 137, 0.4)";
                          e.currentTarget.style.borderColor = primaryColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = textColor;
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, rgb(255 255 255 / 5%), rgb(255 201 233 / 5%))";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <span className="relative z-10 text-[12px]">
                          {subcategory.toUpperCase()}
                        </span>
                      </div>

                      {/* Hover Tooltip */}
                      <div className="absolute top-full mt-1 left-0 w-50 bg-[#FFF3FD] border border-gray-100 text-gray-800 rounded-lg shadow-xl hidden scale-95 group-hover:flex group-hover:scale-100 transform origin-top transition-all duration-200 ease-out z-50">
                        <ul className="py-1">
                          {items.map((item) => (
                            <li key={item._id}>
                              <Link
                                to={`/category/${slugify(item?.name)}`}
                                className="flex items-center px-4 py-2.5 text-sm group/link transition-colors duration-200"
                                onClick={() => setMenuOpen(false)}
                              >
                                <span className="relative truncate">  
                                  {item?.name}
                                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-500 transition-all duration-300 group-hover/link:w-full"></span> 
                                </span>
                                {item?.icon && (
                                  <span className="ml-2 text-gray-400 group-hover/link:text-purple-400 transition-colors">
                                    <item.icon className="w-4 h-4" />
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                )}
                {/* More Categories Dropdown */}
                {categories.length > 6 && (
                  <div className="relative" ref={moreMenuRef}>
                    <button
                      onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                      className="relative px-4 py-2 text-sm bg-[#c561b1] font-bold transition-all duration-300 rounded-full flex items-center space-x-2 group"
                      style={{ color: "#fff" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.borderColor = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        if (!moreMenuOpen) {
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      <span>More Categories</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${moreMenuOpen ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {moreMenuOpen && (
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 z-50"
                        style={{
                          background:
                            "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                          border: "1px solid rgb(157 48 137)",
                          borderRadius: "10px",
                          boxShadow: "0 20px 40px rgba(157, 48, 137, 0.2)",
                        }}
                      >
                        <div className="px-6 py-4 border-b-2">
                          <h3 className="text-sm font-bold text-center relative z-10">
                            ✦ Explore More Collections ✦
                          </h3>
                        </div>

                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-2">
                            {categories.slice(6).map((item, index) => (
                              <Link
                                key={index}
                                to={`/category/${slugify(item?.name)}`}
                                className="relative group px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg border"
                                style={{
                                  color: textColor,
                                  background: "rgba(157, 48, 137, 0.05)",
                                  borderColor: "rgba(157, 48, 137, 0.1)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = "white";
                                  e.currentTarget.style.background =
                                    "linear-gradient(135deg, rgb(157, 48, 137), rgb(135, 45, 103))";
                                  e.currentTarget.style.transform =
                                    "translateX(4px)";
                                  e.currentTarget.style.boxShadow =
                                    "0 4px 15px rgba(157, 48, 137, 0.3)";
                                  e.currentTarget.style.borderColor =
                                    primaryColor;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = textColor;
                                  e.currentTarget.style.background =
                                    "rgba(157, 48, 137, 0.05)";
                                  e.currentTarget.style.transform =
                                    "translateX(0)";
                                  e.currentTarget.style.boxShadow = "none";
                                  e.currentTarget.style.borderColor =
                                    "rgba(157, 48, 137, 0.1)";
                                }}
                                onClick={() => handleCategorySelect(item?.name)}
                              >
                                <div className="flex items-center justify-between text-xs">
                                  <span>{item?.name}</span>
                                  <svg
                                    className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div
              className="py-4 border-t-2"
              style={{ borderColor: primaryColor }}
            >
              <h3
                className="px-4 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider"
                style={{ color: textColor }}
              >
                Your Account
              </h3>
              <div className="space-y-1 mt-2">
                <Link
                  to="/wishlist"
                  className="block px-4 sm:px-6 py-3 sm:py-4 font-semibold transition-all border-l-4 border-transparent text-sm sm:text-base"
                  style={{ color: textColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      buttonHoverStyle.background;
                    e.currentTarget.style.color = primaryColor;
                    e.currentTarget.style.borderColor = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = textColor;
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  Your Wishlist
                  {wishlistCount > 0 && (
                    <span
                      className="ml-2 sm:ml-3 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-bold"
                      style={{
                        background: "linear-gradient(135deg, #A13C78, #872D67)",
                      }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
            {user && (
              <div
                className="p-4 sm:p-6 border-t-2"
                style={{ borderColor: primaryColor }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold transition-all border-2 text-sm sm:text-base"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56, 77, 137, 0.1), rgba(161, 60, 120, 0.1))",
                    color: textColor,
                    borderColor: primaryColor,
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Top announcement bar */}
      <div
        className="relative overflow-hidden text-white text-xs sm:text-sm text-center py-2 sm:py-3 px-4"
        style={{
          background:
            "linear-gradient(135deg, rgb(108 30 108) 0%, rgb(167 86 135) 50%, rgb(143 0 138) 100%)",
        }}
      >
        <div className="relative z-10 font-semibold tracking-wide">
          <span className="hidden sm:inline">
            ✨ Authentic Heritage Collection | Free Shipping Above ₹999 |
            Handcrafted Excellence ✨
          </span>
          <span className="sm:hidden">✨ Free Shipping Above ₹999 ✨</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="relative transition-all duration-300 bg-white py-3 sm:py-4">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, rgb(157 48 137) 0%, #A13C78 25%, #872D67 50%, #681853 75%, rgb(157 48 137) 100%)",
          }}
        ></div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center relative group">
              <div className="relative" style={{ borderColor: primaryColor }}>
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Logo"
                  className="transition-all duration-300 w-24 sm:w-32 md:w-36 rounded-lg"
                />
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-6 xl:mx-10">
              <div className="relative w-full" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full pl-4 xl:pl-6 pr-12 xl:pr-14 py-3 xl:py-4 text-sm rounded-full border-3 bg-gradient-to-r from-slate-50 to-blue-50 focus:outline-none focus:ring-3 transition-all shadow-inner font-medium"
                      style={{
                        borderColor: primaryColor,
                        color: "rgb(139 59 122)",
                      }}
                      placeholder="Search for traditional treasures..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full p-2 xl:p-3 transition-all shadow-lg border-2 border-white"
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(149 21 137), rgb(220 133 195))",
                      }}
                    >
                      <Search size={16} className="xl:w-[18px] xl:h-[18px]" />
                    </button>
                  </div>
                  {searchQuery && renderSearchResults()}
                </form>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 xl:space-x-3 transition-all group"
                  style={{ color: textColor }}
                >
                  <div
                    className="w-9 h-9 xl:w-11 xl:h-11 flex items-center justify-center rounded-full border-3 group-hover:shadow-lg transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(56, 77, 137, 0.1), rgba(161, 60, 120, 0.1))",
                      borderColor: primaryColor,
                    }}
                  >
                    <User
                      size={18}
                      className="xl:w-5 xl:h-5"
                      style={{ color: primaryColor }}
                    />
                  </div>
                  {user ? (
                    <span className="text-xs xl:text-sm font-bold hidden xl:block">
                      {user.firstName}
                    </span>
                  ) : (
                    <span className="text-xs xl:text-sm font-bold hidden xl:block">
                      Account
                    </span>
                  )}
                </button>
                {userMenuOpen && renderUserMenu()}
              </div>

              <button
                onClick={() => navigate("/wishlist")}
                className="relative p-2 xl:p-3 transition-all group rounded-full"
                style={{ color: textColor }}
              >
                <div
                  className="absolute inset-0 rounded-full border-2 group-hover:shadow-lg transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56, 77, 137, 0.1), rgba(161, 60, 120, 0.1))",
                    borderColor: primaryColor,
                  }}
                ></div>
                <Heart size={20} className="relative z-10 xl:w-6 xl:h-6" />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 xl:w-6 xl:h-6 flex items-center justify-center border-2 border-white shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #A13C78, #872D67)",
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onCartClick}
                className="relative p-2 xl:p-3 transition-all group rounded-full"
                style={{ color: textColor }}
              >
                <div
                  className="absolute inset-0 rounded-full border-2 group-hover:shadow-lg transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56, 77, 137, 0.1), rgba(161, 60, 120, 0.1))",
                    borderColor: primaryColor,
                  }}
                ></div>
                <ShoppingCart
                  size={20}
                  className="relative z-10 xl:w-6 xl:h-6"
                />
                {totalCart > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 xl:w-6 xl:h-6 flex items-center justify-center border-2 border-white shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #A13C78, #872D67)",
                    }}
                  >
                    {totalCart}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 transition-colors"
                style={{ color: textColor }}
              >
                <Search size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={onCartClick}
                className="relative p-2 transition-colors"
                style={{ color: textColor }}
              >
                <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
                {totalCart > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #A13C78, #872D67)",
                    }}
                  >
                    {totalCart}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 transition-colors"
                style={{ color: textColor }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <X size={22} className="sm:w-7 sm:h-7" />
                ) : (
                  <Menu size={22} className="sm:w-7 sm:h-7" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <div className="lg:hidden mt-4 transition-all duration-300">
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <input
                      type="search"
                      id="mobile-search"
                      className="block w-full pl-4 pr-12 py-3 text-sm rounded-full border-3 bg-gradient-to-r from-slate-50 to-blue-50 focus:outline-none focus:ring-3 font-medium"
                      style={{
                        borderColor: primaryColor,
                        color: textColor,
                      }}
                      placeholder="Search traditional items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full p-2 transition-all"
                      style={gradientStyle}
                    >
                      <Search size={16} />
                    </button>
                  </div>
                  {searchQuery && renderSearchResults()}
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Bottom decorative border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, #681853 0%, #872D67 25%, #A13C78 50%, #C1467F 75%, #681853 100%)",
          }}
        ></div>
      </nav>

      {/* Category Navigation */}
      <div
        className={`hidden xl:block border-t-2 transition-all duration-300 ${isSticky ? "sticky top-0 z-50 shadow-lg" : "reltive"
          }`}
        style={{
          background:
            "linear-gradient(135deg, rgb(255 246 254), rgb(255 210 237 / 97%))",
          borderColor: primaryColor,
        }}
      >
        <div className="container mx-auto px-4 relative z-10 ">
          <div className="flex items-center justify-center py-3 gap-10">
            {/* Traditional ornamental left divider */}
            <div className="flex items-center space-x-2">
              <div
                className="w-12 h-0.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgb(157 48 137), transparent)",
                }}
              ></div>
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: primaryColor,
                  background: "rgba(157, 48, 137, 0.1)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: primaryColor }}
                ></div>
              </div>
            </div>

            {/* Home Link */}
            <Link
              to="/"
              className="text-[13px] font-semibold transition-all duration-300 hover:text-[#872D67] text-[#1B2E4F]"
            >
              Home
            </Link>

            {/* Main Categories  */}
            <div className="flex items-center space-x-1">
              {Object.entries(groupedCategories).map(([subcategory, items]) => (
                <div key={subcategory} className="relative group">
                  <div
                    // to={`/category/${slugify(subcategory)}`}
                    className="relative px-3 py-2 text-sm font-bold transition-all duration-300"
                    style={{ color: textColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = textColor;
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(157, 48, 137, 0.4)";
                      e.currentTarget.style.borderColor = primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = textColor;
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgb(255 255 255 / 5%), rgb(255 201 233 / 5%))";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span className="relative z-10 text-[12px]">
                      {subcategory.toUpperCase()}
                    </span>
                  </div>

                  {/* Hover Tooltip */}
                  <div className="absolute top-full left-0 w-50 bg-[#FFF3FD] border border-gray-100 text-gray-800 rounded-lg shadow-xl hidden  scale-95 group-hover:flex group-hover:scale-100 transform origin-top transition-all duration-200 ease-out z-50">
                    <ul className="py-1">
                      {items.map((item) => (
                        <li key={item._id}>
                          <Link
                            to={`/category/${slugify(item?.name)}`}
                            className="flex items-center px-4 py-2.5 text-sm group/link transition-colors duration-200"
                          >
                            <span className="relative truncate">
                              {item?.name}
                              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-500 transition-all duration-300 group-hover/link:w-full"></span>
                            </span>
                            {item?.icon && (
                              <span className="ml-2 text-gray-400 group-hover/link:text-purple-400 transition-colors">
                                <item.icon className="w-4 h-4" />
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              {/* More Categories Dropdown */}
              {categories?.length > 6 && (
                <div className="relative" ref={moreMenuRef}>
                  <button
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    className="relative px-4 py-2 text-sm bg-[#c561b1] font-bold transition-all duration-300 rounded-full flex items-center space-x-2 group"
                    style={{ color: "#fff" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.borderColor = primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      if (!moreMenuOpen) {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    <span>More Categories</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${moreMenuOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {moreMenuOpen && (
                    <div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 z-50"
                      style={{
                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                        border: "1px solid rgb(157 48 137)",
                        borderRadius: "10px",
                        boxShadow: "0 20px 40px rgba(157, 48, 137, 0.2)",
                      }}
                    >
                      <div className="px-6 py-4 border-b-2">
                        <h3 className="text-sm font-bold text-center relative z-10">
                          ✦ Explore More Collections ✦
                        </h3>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-2">
                          {categories.slice(6).map((item, index) => (
                            <Link
                              key={index}
                              to={`/category/${slugify(item?.name)}`}
                              className="relative group px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-lg border"
                              style={{
                                color: textColor,
                                background: "rgba(157, 48, 137, 0.05)",
                                borderColor: "rgba(157, 48, 137, 0.1)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.background =
                                  "linear-gradient(135deg, rgb(157, 48, 137), rgb(135, 45, 103))";
                                e.currentTarget.style.transform =
                                  "translateX(4px)";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 15px rgba(157, 48, 137, 0.3)";
                                e.currentTarget.style.borderColor =
                                  primaryColor;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = textColor;
                                e.currentTarget.style.background =
                                  "rgba(157, 48, 137, 0.05)";
                                e.currentTarget.style.transform =
                                  "translateX(0)";
                                e.currentTarget.style.boxShadow = "none";
                                e.currentTarget.style.borderColor =
                                  "rgba(157, 48, 137, 0.1)";
                              }}
                              onClick={() => handleCategorySelect(item?.name)}
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span>{item?.name}</span>
                                <svg
                                  className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Traditional ornamental right divider */}
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: primaryColor,
                  background: "rgba(157, 48, 137, 0.1)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: primaryColor }}
                ></div>
              </div>
              <div
                className="w-12 h-0.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgb(157 48 137), transparent)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && renderMobileMenu()}
    </>
  );
};

export default memo(Navbar);
