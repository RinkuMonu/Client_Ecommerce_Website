
// "use client";
// import type React from "react";
// import { useEffect, useState } from "react";
// import {
//   ChevronLeft,
//   Wallet,
//   Check,
//   CreditCard,
//   Clock,
//   Shield,
// } from "lucide-react";
// import logo from "../assest/logo.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import LoginModal from "../components/loginModal/LoginModal";
// import Login1 from "../pages/Login1";
// import toast, { Toaster } from "react-hot-toast";

// interface Address {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   isDefault?: boolean;
// }

// interface OrderItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface ShippingMethod {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
// }

// interface CouponCode {
//   code: string;
//   discount: string;
//   description: string;
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   phone?: string;
//   pinCode?: string;
//   address?: string;
// }

// const addresses: Address[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "1234567890",
//     address: "123 Main St",
//     city: "New York",
//     state: "NY",
//     isDefault: true,
//   },
// ];

// const shippingMethods: ShippingMethod[] = [
//   { id: "1", name: "Free Delivery", description: "Free shipping", price: 0 },
//   { id: "2", name: "Local Pickup", description: "Free shipping", price: 0 },
//   { id: "3", name: "Flat Rate", description: "Fixed rate shipping", price: 20 },
// ];

// function AddressShipping({ cartItems }) {
//   console.log(cartItems, "cart Item");
//   const [isNewAddress, setIsNewAddress] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState<string>("");
//   const [selectedShipping, setSelectedShipping] = useState<string>("1");
//   const [selectedPayment, setSelectedPayment] = useState<string>("");
//   const [showCouponInput, setShowCouponInput] = useState(false);
//   const [isloading, setIsLoading] = useState(false);
//   const [reference, setReference] = useState("");
//   const navigate = useNavigate();
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [startTimer, setStartTimer] = useState(false);
//   const [pinCode, setPinCode] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [user, setUser] = useState();
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [couponStatus, setCouponStatus] = useState("");

//   const baseUrl = import.meta.env.VITE_API_BASE_URL;
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   useEffect(() => {
//     const loadUser = () => {
//       try {
//         const storedUser = localStorage.getItem("userData");
//         setUser(storedUser ? JSON.parse(storedUser) : null);
//       } catch (error) {
//         console.error("Failed to parse user from localStorage:", error);
//       }
//     };
//     loadUser();
//   }, []);

//   const [userdata, setUserData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     state: "",
//     city: "",
//     address: "",
//   });

//   const [coupons, setCoupons] = useState([]);

//   console.log(coupons);

//   const fetchCoupons = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/coupons`);
//       const data = await response.json();

//       console.log("dsfdsfdsgfdsf", data.coupons);

//       if (Array.isArray(data?.coupons)) {
//         setCoupons(data?.coupons);
//       } else {
//         console.error("Data is not an array:", data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching coupons:", error);
//     }
//   };
  
//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   const applicableCoupons = coupons?.filter((c) =>
//     cartItems.some((item) => c.applicableProducts.includes(item.id))
//   );
//   console.log(applicableCoupons);

//   const subtotal = cartItems?.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleApplyCoupon = async (coupon) => {
//     try {
//       const applicableItem = cartItems.find((item) =>
//         coupon?.applicableProducts.includes(item?.id)
//       );
//       console.log("applicableItem", applicableItem);

//       const { data } = await axios.post(`${baseUrl}/coupons/apply`, {
//         code: coupon?.code,
//         userId: user?._id,
//         productId: applicableItem?.id,
//         subtotal: subtotal,
//       });
//       console.log(data);

//       if (data?.success) {
//         setCouponStatus(data?.message);
//         setAppliedCoupon(coupon);
//         if (data.discount) {
//           if (data.discount.type === "fixed") {
//             setDiscount(data.discount.value);
//           } else if (data.discount.type === "percentage") {
//             setDiscount((subtotal * data.discount.value) / 100);
//           }
//         }
//       } else {
//         setCouponStatus(data?.message);
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message);
//       const errorMsg =
//         err?.response?.data?.message || "Failed to apply coupon ❌";
//       console.error("Coupon Error:", err.response);
//       setCouponStatus(errorMsg);
//     }
//   };

//   const shipping =
//     shippingMethods.find((m) => m.id === selectedShipping)?.price || 0;
//   const total = subtotal - discount + shipping;

//   // Validation functions
//   const validateField = (fieldName: string, value: string) => {
//     let error = "";

//     switch (fieldName) {
//       case "name":
//         if (!value.trim()) error = "Full name is required";
//         else if (value.length < 3) error = "Name must be at least 3 characters";
//         break;

//       case "email":
//         if (!value.trim()) error = "Email is required";
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           error = "Please enter a valid email";
//         break;

//       case "phone":
//         if (!value.trim()) error = "Phone number is required";
//         else if (!/^\d{10}$/.test(value)) error = "Phone must be 10 digits";
//         break;

//       case "pinCode":
//         if (!value.trim()) error = "PIN code is required";
//         else if (!/^\d{6}$/.test(value)) error = "PIN code must be 6 digits";
//         break;

//       case "address":
//         if (!value.trim()) error = "Address is required";
//         else if (value.length < 10)
//           error = "Address must be at least 10 characters";
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [fieldName]: error }));
//     return !error;
//   };

//   const validateForm = () => {
//     const fieldsToValidate = isNewAddress
//       ? ["name", "email", "phone", "pinCode", "address"]
//       : ["email", "phone"];

//     const validationResults = fieldsToValidate.map((field) => {
//       const value = field === "pinCode" ? pinCode : userdata[field];
//       return validateField(field, value);
//     });

//     return validationResults.every((valid) => valid);
//   };

//   const handleBlur = (fieldName: string) => {
//     setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
//     const value = fieldName === "pinCode" ? pinCode : userdata[fieldName];
//     validateField(fieldName, value);
//   };

//   const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setIsNewAddress(value === "new");
//     setSelectedAddress(value);
//     if (value !== "new") {
//       setErrors({});
//     }
//   };

//   // ✅ ZAAKPAY PAYMENT INTEGRATION
//   const handlePayment = async () => {
//     const isUserLoggedIn = !!localStorage.getItem("token");

//     if (!isUserLoggedIn) {
//       navigate(location.pathname, {
//         state: { from: "/address" },
//       });
//       setShowLoginModal(true);
//       return;
//     }

//     if (!validateForm()) {
//       const allFields = isNewAddress
//         ? ["name", "email", "phone", "pinCode", "address"]
//         : ["email", "phone"];
//       setTouchedFields(
//         allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
//       );
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem("token");
      
//       const paymentData = {
//         amount: total.toString(),
//         email: userdata.email || user?.email,
//       };

//       console.log("Sending payment request:", paymentData);

//       const response = await axios.post(
//         `${baseUrl}/zaakpay/payin`,
//         paymentData,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("Zaakpay response:", response.data);

//       if (response.data.success) {
//         // ✅ Create a hidden form and auto-submit to Zaakpay
//         const form = document.createElement('form');
//         form.method = 'POST';
//         form.action = response.data.paymentUrl;
        
//         // ✅ Add all parameters as hidden inputs
//         const params = new URLSearchParams(response.data.requestBody);
//         for (const [key, value] of params) {
//           const input = document.createElement('input');
//           input.type = 'hidden';
//           input.name = key;
//           input.value = value;
//           form.appendChild(input);
//         }
        
//         document.body.appendChild(form);
//         form.submit();
        
//         // Clean up
//         setTimeout(() => {
//           document.body.removeChild(form);
//         }, 1000);
        
//       } else {
//         throw new Error(response.data.message || "Payment initiation failed");
//       }

//     } catch (error) {
//       console.error("Zaakpay Payment Error:", error);
//       toast.error(error.response?.data?.message || "Payment initiation failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleonChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));

//     if (touchedFields[name]) {
//       validateField(name, value);
//     }
//   };

//   const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value.replace(/\D/g, "").slice(0, 6);
//     setPinCode(val);

//     if (touchedFields.pinCode) {
//       validateField("pinCode", val);
//     }
//   };

//   useEffect(() => {
//     if (pinCode.length === 6) {
//       fetchLocation(pinCode);
//     }
//   }, [pinCode]);

//   const fetchLocation = async (pin: string) => {
//     try {
//       const response = await axios.get(
//         `https://api.postalpincode.in/pincode/${pin}`
//       );
//       console.log("API Response:", response.data);
//       if (response.data[0].Status === "Success") {
//         const location = response.data[0].PostOffice[0];
//         setState(location.State);
//         setCity(location.District);
//         setUserData((prev) => ({
//           ...prev,
//           state: location.State,
//           city: location.District,
//         }));
//       } else {
//         setState("");
//         setCity("");
//         setUserData((prev) => ({
//           ...prev,
//           state: "",
//           city: "",
//         }));
//         console.warn("Invalid PIN code");
//       }
//     } catch (error) {
//       console.error("Error fetching location:", error);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const min = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const sec = (seconds % 60).toString().padStart(2, "0");
//     return `${min}:${sec}`;
//   };

//   return (
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             background: "#6b1c6b",
//             color: "#fff",
//             borderRadius: "5px",
//             padding: "12px 16px",
//           },
//         }}
//         containerStyle={{
//           top: 20,
//           right: 20,
//         }}
//         gutter={8}
//         reverseOrder={false}
//       />
//       <div className="min-h-screen">
//         <div className="container mx-auto px-4 py-12">
//           {/* Header Section */}
//           <div className="text-center mb-10 pb-8 border-b border-gray-200">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
//               Checkout
//             </h1>
//             <p className="text-gray-600">Complete your order details</p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left Column - Order Details */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//                 {/* Logo */}
//                 <div className="mb-6">
//                   <img
//                     src={logo || "/placeholder.svg"}
//                     alt="logo"
//                     className="w-32 h-auto"
//                   />
//                 </div>

//                 {/* Shipping Information */}
//                 <div className="mb-8">
//                   <h2 className="text-xl font-bold mb-4 text-gray-900">
//                     Shipping Information
//                   </h2>
//                   <div className="space-y-4">
//                     {/* Address Selection */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Select Address
//                       </label>
//                       <select
//                         className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                         value={selectedAddress}
//                         onChange={handleAddressChange}
//                         style={{ focusRingColor: "rgb(157 48 137)" }}
//                       >
//                         <option value="">Select Address</option>
//                         <option value="new">Add new address...</option>
//                       </select>
//                     </div>

//                     {/* New Address Form */}
//                     {isNewAddress && (
//                       <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
//                         {/* Error summary */}
//                         {Object.values(errors).some((error) => error) && (
//                           <div className="bg-red-50 border-l-4 border-red-500 p-4">
//                             <div className="flex">
//                               <div className="flex-shrink-0">
//                                 <svg
//                                   className="h-5 w-5 text-red-500"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   viewBox="0 0 20 20"
//                                   fill="currentColor"
//                                 >
//                                   <path
//                                     fillRule="evenodd"
//                                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                                     clipRule="evenodd"
//                                   />
//                                 </svg>
//                               </div>
//                               <div className="ml-3">
//                                 <h3 className="text-sm font-medium text-red-800">
//                                   Please fix the following errors:
//                                 </h3>
//                                 <div className="mt-2 text-sm text-red-700">
//                                   <ul className="list-disc pl-5 space-y-1">
//                                     {errors.name && <li>{errors.name}</li>}
//                                     {errors.email && <li>{errors.email}</li>}
//                                     {errors.phone && <li>{errors.phone}</li>}
//                                     {errors.pinCode && (
//                                       <li>{errors.pinCode}</li>
//                                     )}
//                                     {errors.address && (
//                                       <li>{errors.address}</li>
//                                     )}
//                                   </ul>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Full Name *
//                             </label>
//                             <input
//                               type="text"
//                               name="name"
//                               className={`w-full rounded-lg border ${
//                                 errors.name
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
//                               value={userdata.name}
//                               onChange={handleonChange}
//                               onBlur={() => handleBlur("name")}
//                               placeholder="Enter your name"
//                             />
//                             {errors.name && (
//                               <p className="mt-1 text-sm text-red-600">
//                                 {errors.name}
//                               </p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Phone *
//                             </label>
//                             <input
//                               type="tel"
//                               name="phone"
//                               className={`w-full rounded-lg border ${
//                                 errors.phone
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
//                               value={userdata.phone}
//                               onChange={(e) => {
//                                 const val = e.target.value
//                                   .replace(/\D/g, "")
//                                   .slice(0, 10);
//                                 handleonChange({
//                                   target: { name: "phone", value: val },
//                                 });
//                                 if (touchedFields.phone)
//                                   validateField("phone", val);
//                               }}
//                               onBlur={() => handleBlur("phone")}
//                               placeholder="Enter phone number"
//                             />
//                             {errors.phone && (
//                               <p className="mt-1 text-sm text-red-600">
//                                 {errors.phone}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Email *
//                           </label>
//                           <input
//                             type="email"
//                             name="email"
//                             className={`w-full rounded-lg border ${
//                               errors.email
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
//                             value={userdata.email}
//                             onChange={handleonChange}
//                             onBlur={() => handleBlur("email")}
//                             placeholder="Enter email address"
//                           />
//                           {errors.email && (
//                             <p className="mt-1 text-sm text-red-600">
//                               {errors.email}
//                             </p>
//                           )}
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               PIN Code *
//                             </label>
//                             <input
//                               type="text"
//                               className={`w-full rounded-lg border ${
//                                 errors.pinCode
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
//                               value={pinCode}
//                               onChange={handlePinCodeChange}
//                               onBlur={() => handleBlur("pinCode")}
//                               placeholder="Enter PIN code"
//                             />
//                             {errors.pinCode && (
//                               <p className="mt-1 text-sm text-red-600">
//                                 {errors.pinCode}
//                               </p>
//                             )}
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               State
//                             </label>
//                             <input
//                               type="text"
//                               className="w-full rounded-lg border border-gray-300 px-3 py-2.5 bg-gray-100"
//                               value={state}
//                               readOnly
//                               placeholder="Auto-filled"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               City
//                             </label>
//                             <input
//                               type="text"
//                               className="w-full rounded-lg border border-gray-300 px-3 py-2.5 bg-gray-100"
//                               value={city}
//                               readOnly
//                               placeholder="Auto-filled"
//                             />
//                           </div>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Address *
//                           </label>
//                           <textarea
//                             name="address"
//                             className={`w-full rounded-lg border ${
//                               errors.address
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
//                             rows={3}
//                             value={userdata.address}
//                             onChange={handleonChange}
//                             onBlur={() => handleBlur("address")}
//                             placeholder="Enter complete address (House no, Building, Street, Area)"
//                           />
//                           {errors.address && (
//                             <p className="mt-1 text-sm text-red-600">
//                               {errors.address}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* Selected Address Display */}
//                     {selectedAddress && selectedAddress !== "new" && (
//                       <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
//                         {addresses
//                           .filter((addr) => addr.id === selectedAddress)
//                           .map((address) => (
//                             <div key={address.id}>
//                               <h3 className="font-semibold text-gray-900">
//                                 {address.name}
//                               </h3>
//                               <p className="text-gray-600 mt-1">
//                                 {address.address}
//                               </p>
//                               <p className="text-gray-600">
//                                 <span className="font-medium">Phone:</span>{" "}
//                                 {address.phone}
//                               </p>
//                               <p className="text-gray-600">
//                                 <span className="font-medium">Email:</span>{" "}
//                                 {address.email}
//                               </p>
//                             </div>
//                           ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

             

//                 {/* Payment Method */}
//                 <div className="mb-8">
//                   <h2 className="text-xl font-bold mb-4 text-gray-900">
//                     Payment Method
//                   </h2>
//                   <div className="space-y-3">
//                     <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//                       <input
//                         type="radio"
//                         name="payment"
//                         value="zaakpay"
//                         checked={selectedPayment === "zaakpay"}
//                         onChange={(e) => setSelectedPayment(e.target.value)}
//                         className="h-4 w-4 text-purple-600 focus:ring-purple-500"
//                         style={{ accentColor: "rgb(157 48 137)" }}
//                       />
//                       <div className="ml-3">
//                         <span className="block font-medium text-gray-900">
//                           Zaakpay Payment Gateway
//                         </span>
//                         <span className="text-gray-500 text-sm">
//                           Secure payment via Zaakpay
//                         </span>
//                       </div>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Order Notes */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Order Notes (Optional)
//                   </label>
//                   <textarea
//                     className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                     rows={3}
//                     placeholder="Notes about your order, e.g. special notes for delivery"
//                   />
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//                   <Link
//                     to="/cart"
//                     className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                     Back to Cart
//                   </Link>
//                   {total === 0 ? (
//                     <p className="text-gray-500">
//                       Your Cart Is Empty - Please Add Something
//                     </p>
//                   ) : (
//                     <button
//                       className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
//                       style={{ background: "rgb(157 48 137)" }}
//                       onClick={handlePayment}
//                       disabled={
//                         isloading ||
//                         (isNewAddress &&
//                           Object.values(errors).some((error) => error)) ||
//                         selectedPayment !== "zaakpay"
//                       }
//                     >
//                       {isloading ? (
//                         <DotLottieReact
//                           src="https://lottie.host/faaf7fb5-6078-4f3e-9f15-05b0964cdb4f/XCcsBA5RNq.lottie"
//                           loop
//                           autoplay
//                           style={{ width: 24, height: 24 }}
//                         />
//                       ) : (
//                         <>
//                           <CreditCard className="w-4 h-4" />
//                           Pay with Zaakpay
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
//                 <h2 className="text-xl font-bold mb-4 text-gray-900">
//                   Order Summary
//                 </h2>

//                 {/* Order Items */}
//                 <div className="space-y-4 mb-6">
//                   {cartItems.map((item) => (
//                     <div key={item.id} className="flex gap-3">
//                       <img
//                         src={`http://api.jajamblockprints.com/${item?.image}`}
//                         alt={item?.name}
//                         className="w-16 h-16 object-cover rounded-lg"
//                       />
//                       <div className="flex-1">
//                         <h4 className="font-medium text-gray-900 text-sm">
//                           {item?.name}
//                         </h4>
//                         <p className="text-gray-500 text-sm">
//                           Qty: {item?.quantity}
//                         </p>
//                         <p className="font-medium text-gray-900">
//                           ₹{(item.price * item.quantity).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Price Summary */}
//                 <div className="border-t border-gray-200 pt-4 space-y-2">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal</span>
//                     <span>₹{subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Shipping</span>
//                     <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
//                   </div>
//                   {discount > 0 && (
//                     <div className=" text-green-600 mb-2">
//                       <div className="flex justify-between text-green-600">
//                         <span>Discount ({appliedCoupon?.code})</span>
//                         <span>-₹{discount.toLocaleString()}</span>
//                       </div>
//                       {couponStatus && (
//                         <div>
//                           <span className="text-sm">{couponStatus}</span>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                   <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
//                     <span>Total</span>
//                     <span>₹{total.toLocaleString()}</span>
//                   </div>
//                 </div>

//                 {/* Coupon Section */}
//                 <div className="mt-6">
//                   <div className="flex items-center gap-2 mb-3">
//                     <Wallet className="w-4 h-4 text-gray-500" />
//                     <span className="font-medium text-gray-900">
//                       Available Coupons
//                     </span>
//                   </div>
//                   <div className="space-y-2">
//                     {applicableCoupons.map((c) => (
//                       <div
//                         key={c._id}
//                         className="flex justify-between items-center border-b pb-2"
//                       >
//                         <p className="text-sm text-gray-700">
//                           <span className="font-bold">{c.code}</span> -{" "}
//                           {c.discountValue}
//                           {c.discountType === "percentage" ? "%" : "₹"} OFF
//                         </p>
//                         <button
//                           onClick={() => handleApplyCoupon(c)}
//                           className="text-xs bg-[#384D89] text-white px-3 py-1 rounded-lg hover:bg-[#2A4172] transition"
//                         >
//                           Apply
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showLoginModal && (
//         <LoginModal
//           isOpen={showLoginModal}
//           onClose={() => setShowLoginModal(false)}
//         >
//           <Login1 />
//         </LoginModal>
//       )}
//     </>
//   );
// }

// export default AddressShipping;





"use client";
import type React from "react";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Wallet,
  Check,
  CreditCard,
  Clock,
  Shield,
} from "lucide-react";
import logo from "../assest/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoginModal from "../components/loginModal/LoginModal";
import Login1 from "../pages/Login1";
import toast, { Toaster } from "react-hot-toast";

interface Address {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface CouponCode {
  code: string;
  discount: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  address?: string;
}

const addresses: Address[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    isDefault: true,
  },
];

const shippingMethods: ShippingMethod[] = [
  { id: "1", name: "Free Delivery", description: "Free shipping", price: 0 },
  { id: "2", name: "Local Pickup", description: "Free shipping", price: 0 },
  { id: "3", name: "Flat Rate", description: "Fixed rate shipping", price: 20 },
];

function AddressShipping({ cartItems }) {
  console.log(cartItems, "cart Item");
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedShipping, setSelectedShipping] = useState<string>("1");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [reference, setReference] = useState("");
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [user, setUser] = useState();
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("userData");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    };
    loadUser();
  }, []);

  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  });

  const [coupons, setCoupons] = useState([]);

  console.log(coupons);

  const fetchCoupons = async () => {
    try {
      const response = await fetch(`${baseUrl}/coupons`);
      const data = await response.json();

      console.log("dsfdsfdsgfdsf", data.coupons);

      if (Array.isArray(data?.coupons)) {
        setCoupons(data?.coupons);
      } else {
        console.error("Data is not an array:", data.data);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };
  
  useEffect(() => {
    fetchCoupons();
  }, []);

  const applicableCoupons = coupons?.filter((c) =>
    cartItems.some((item) => c.applicableProducts.includes(item.id))
  );
  console.log(applicableCoupons);

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleApplyCoupon = async (coupon) => {
    try {
      const applicableItem = cartItems.find((item) =>
        coupon?.applicableProducts.includes(item?.id)
      );
      console.log("applicableItem", applicableItem);

      const { data } = await axios.post(`${baseUrl}/coupons/apply`, {
        code: coupon?.code,
        userId: user?._id,
        productId: applicableItem?.id,
        subtotal: subtotal,
      });
      console.log(data);

      if (data?.success) {
        setCouponStatus(data?.message);
        setAppliedCoupon(coupon);
        if (data.discount) {
          if (data.discount.type === "fixed") {
            setDiscount(data.discount.value);
          } else if (data.discount.type === "percentage") {
            setDiscount((subtotal * data.discount.value) / 100);
          }
        }
      } else {
        setCouponStatus(data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      const errorMsg =
        err?.response?.data?.message || "Failed to apply coupon ❌";
      console.error("Coupon Error:", err.response);
      setCouponStatus(errorMsg);
    }
  };

  const shipping =
    shippingMethods.find((m) => m.id === selectedShipping)?.price || 0;
  const total = subtotal - discount + shipping;

  // Validation functions
  const validateField = (fieldName: string, value: string) => {
    let error = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 3) error = "Name must be at least 3 characters";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Please enter a valid email";
        break;

      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value)) error = "Phone must be 10 digits";
        break;

      case "pinCode":
        if (!value.trim()) error = "PIN code is required";
        else if (!/^\d{6}$/.test(value)) error = "PIN code must be 6 digits";
        break;

      case "address":
        if (!value.trim()) error = "Address is required";
        else if (value.length < 10)
          error = "Address must be at least 10 characters";
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const validateForm = () => {
    const fieldsToValidate = isNewAddress
      ? ["name", "email", "phone", "pinCode", "address"]
      : ["email", "phone"];

    const validationResults = fieldsToValidate.map((field) => {
      const value = field === "pinCode" ? pinCode : userdata[field];
      return validateField(field, value);
    });

    return validationResults.every((valid) => valid);
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    const value = fieldName === "pinCode" ? pinCode : userdata[fieldName];
    validateField(fieldName, value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIsNewAddress(value === "new");
    setSelectedAddress(value);
    if (value !== "new") {
      setErrors({});
    }
  };

  // ✅ CREATE ORDER FIRST, THEN INITIATE PAYMENT
  const handlePayment = async () => {
    const isUserLoggedIn = !!localStorage.getItem("token");

    if (!isUserLoggedIn) {
      navigate(location.pathname, {
        state: { from: "/address" },
      });
      setShowLoginModal(true);
      return;
    }

    if (!validateForm()) {
      const allFields = isNewAddress
        ? ["name", "email", "phone", "pinCode", "address"]
        : ["email", "phone"];
      setTouchedFields(
        allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      );
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // ✅ STEP 1: CREATE ORDER FIRST
      const orderData = {
        products: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        shippingAddress: {
          address: userdata.address,
          country: "India",
          pinCode: pinCode,
          state: state
        },
        type: "cart"
      };

      console.log("Creating order:", orderData);

      // Create order first
      const orderResponse = await axios.post(
        `${baseUrl}/order/order`,
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Order created:", orderResponse.data);

      if (!orderResponse.data.order?._id) {
        throw new Error("Order creation failed - no order ID returned");
      }

      const orderId = orderResponse.data.order._id;
      const orderAmount = orderResponse.data.order.totalAmount;

      // ✅ STEP 2: INITIATE ZAAKPAY PAYMENT WITH ORDER ID
      const paymentData = {
        amount: "1",
        email: userdata.email || user?.email,
        orderId: orderId
      };

      console.log("Initiating Zaakpay payment:", paymentData);

      const paymentResponse = await axios.post(
        `${baseUrl}/zaakpay/payin`,
        paymentData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Zaakpay response:", paymentResponse.data);

      if (paymentResponse.data.success) {
        // ✅ Create a hidden form and auto-submit to Zaakpay
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentResponse.data.paymentUrl;
        
        // ✅ Add all parameters as hidden inputs
        const params = new URLSearchParams(paymentResponse.data.requestBody);
        for (const [key, value] of params) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }
        
        document.body.appendChild(form);
        form.submit();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(form);
        }, 1000);
        
      } else {
        throw new Error(paymentResponse.data.message || "Payment initiation failed");
      }

    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleonChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (touchedFields[name]) {
      validateField(name, value);
    }
  };

  const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPinCode(val);

    if (touchedFields.pinCode) {
      validateField("pinCode", val);
    }
  };

  useEffect(() => {
    if (pinCode.length === 6) {
      fetchLocation(pinCode);
    }
  }, [pinCode]);

  const fetchLocation = async (pin: string) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pin}`
      );
      console.log("API Response:", response.data);
      if (response.data[0].Status === "Success") {
        const location = response.data[0].PostOffice[0];
        setState(location.State);
        setCity(location.District);
        setUserData((prev) => ({
          ...prev,
          state: location.State,
          city: location.District,
        }));
      } else {
        setState("");
        setCity("");
        setUserData((prev) => ({
          ...prev,
          state: "",
          city: "",
        }));
        console.warn("Invalid PIN code");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#6b1c6b",
            color: "#fff",
            borderRadius: "5px",
            padding: "12px 16px",
          },
        }}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        gutter={8}
        reverseOrder={false}
      />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-10 pb-8 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Checkout
            </h1>
            <p className="text-gray-600">Complete your order details</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                {/* Logo */}
                <div className="mb-6">
                  <img
                    src={logo || "/placeholder.svg"}
                    alt="logo"
                    className="w-32 h-auto"
                  />
                </div>

                {/* Shipping Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">
                    Shipping Information
                  </h2>
                  <div className="space-y-4">
                    {/* Address Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Address
                      </label>
                      <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        value={selectedAddress}
                        onChange={handleAddressChange}
                        style={{ focusRingColor: "rgb(157 48 137)" }}
                      >
                        <option value="">Select Address</option>
                        <option value="new">Add new address...</option>
                      </select>
                    </div>

                    {/* New Address Form */}
                    {isNewAddress && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        {/* Error summary */}
                        {Object.values(errors).some((error) => error) && (
                          <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg
                                  className="h-5 w-5 text-red-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                  Please fix the following errors:
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                  <ul className="list-disc pl-5 space-y-1">
                                    {errors.name && <li>{errors.name}</li>}
                                    {errors.email && <li>{errors.email}</li>}
                                    {errors.phone && <li>{errors.phone}</li>}
                                    {errors.pinCode && (
                                      <li>{errors.pinCode}</li>
                                    )}
                                    {errors.address && (
                                      <li>{errors.address}</li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              className={`w-full rounded-lg border ${
                                errors.name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                              value={userdata.name}
                              onChange={handleonChange}
                              onBlur={() => handleBlur("name")}
                              placeholder="Enter your name"
                            />
                            {errors.name && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              className={`w-full rounded-lg border ${
                                errors.phone
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                              value={userdata.phone}
                              onChange={(e) => {
                                const val = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 10);
                                handleonChange({
                                  target: { name: "phone", value: val },
                                });
                                if (touchedFields.phone)
                                  validateField("phone", val);
                              }}
                              onBlur={() => handleBlur("phone")}
                              placeholder="Enter phone number"
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            className={`w-full rounded-lg border ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                            value={userdata.email}
                            onChange={handleonChange}
                            onBlur={() => handleBlur("email")}
                            placeholder="Enter email address"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              PIN Code *
                            </label>
                            <input
                              type="text"
                              className={`w-full rounded-lg border ${
                                errors.pinCode
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                              value={pinCode}
                              onChange={handlePinCodeChange}
                              onBlur={() => handleBlur("pinCode")}
                              placeholder="Enter PIN code"
                            />
                            {errors.pinCode && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.pinCode}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 bg-gray-100"
                              value={state}
                              readOnly
                              placeholder="Auto-filled"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 bg-gray-100"
                              value={city}
                              readOnly
                              placeholder="Auto-filled"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address *
                          </label>
                          <textarea
                            name="address"
                            className={`w-full rounded-lg border ${
                              errors.address
                                ? "border-red-500"
                                : "border-gray-300"
                            } px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                            rows={3}
                            value={userdata.address}
                            onChange={handleonChange}
                            onBlur={() => handleBlur("address")}
                            placeholder="Enter complete address (House no, Building, Street, Area)"
                          />
                          {errors.address && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.address}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Selected Address Display */}
                    {selectedAddress && selectedAddress !== "new" && (
                      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        {addresses
                          .filter((addr) => addr.id === selectedAddress)
                          .map((address) => (
                            <div key={address.id}>
                              <h3 className="font-semibold text-gray-900">
                                {address.name}
                              </h3>
                              <p className="text-gray-600 mt-1">
                                {address.address}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Phone:</span>{" "}
                                {address.phone}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Email:</span>{" "}
                                {address.email}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">
                    Shipping Method
                  </h2>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                          style={{ accentColor: "rgb(157 48 137)" }}
                        />
                        <div className="ml-3">
                          <span className="block font-medium text-gray-900">
                            {method.name}
                            {method.price > 0 && ` - ₹${method.price}`}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {method.description}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="zaakpay"
                        checked={selectedPayment === "zaakpay"}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                        style={{ accentColor: "rgb(157 48 137)" }}
                      />
                      <div className="ml-3">
                        <span className="block font-medium text-gray-900">
                          Zaakpay Payment Gateway
                        </span>
                        <span className="text-gray-500 text-sm">
                          Secure payment via Zaakpay
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    rows={3}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Cart
                  </Link>
                  {total === 0 ? (
                    <p className="text-gray-500">
                      Your Cart Is Empty - Please Add Something
                    </p>
                  ) : (
                    <button
                      className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                      style={{ background: "rgb(157 48 137)" }}
                      onClick={handlePayment}
                      disabled={
                        isloading ||
                        (isNewAddress &&
                          Object.values(errors).some((error) => error)) ||
                        selectedPayment !== "zaakpay"
                      }
                    >
                      {isloading ? (
                        <DotLottieReact
                          src="https://lottie.host/faaf7fb5-6078-4f3e-9f15-05b0964cdb4f/XCcsBA5RNq.lottie"
                          loop
                          autoplay
                          style={{ width: 24, height: 24 }}
                        />
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Place Order
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={`http://api.jajamblockprints.com/${item?.image}`}
                        alt={item?.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {item?.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          Qty: {item?.quantity}
                        </p>
                        <p className="font-medium text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className=" text-green-600 mb-2">
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span>-₹{discount.toLocaleString()}</span>
                      </div>
                      {couponStatus && (
                        <div>
                          <span className="text-sm">{couponStatus}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Wallet className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      Available Coupons
                    </span>
                  </div>
                  <div className="space-y-2">
                    {applicableCoupons.map((c) => (
                      <div
                        key={c._id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <p className="text-sm text-gray-700">
                          <span className="font-bold">{c.code}</span> -{" "}
                          {c.discountValue}
                          {c.discountType === "percentage" ? "%" : "₹"} OFF
                        </p>
                        <button
                          onClick={() => handleApplyCoupon(c)}
                          className="text-xs bg-[#384D89] text-white px-3 py-1 rounded-lg hover:bg-[#2A4172] transition"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </>
  );
}

export default AddressShipping;