// import { useEffect, useState } from "react";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaEdit,
//   FaSave,
//   FaTimes,
//   FaUserCircle,
//   FaBox,
// } from "react-icons/fa";
// import { OrderPage } from "../userOrder/userOrder";

// export const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'orders'
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     address: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const baseUrl = import.meta.env.VITE_API_BASE_URL;

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Special handling for name fields (letters only)
//     if (name === "firstName" || name === "lastName") {
//       if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
//         setProfile((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       }
//       return;
//     }

//     // Special handling for mobile (numbers only)
//     if (name === "mobile") {
//       if (/^[0-9]*$/.test(value) || value === "") {
//         setProfile((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       }
//       return;
//     }

//     // Default handling for other fields
//     setProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user types
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/auth/userInfo`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await response.json();
//         setProfile(
//           data?.user || {
//             firstName: "",
//             lastName: "",
//             email: "",
//             mobile: "",
//             address: "",
//           }
//         );
//       } catch (err) {
//         console.error("Error fetching user info:", err);
//       }
//     };
//     fetchProfile();
//   }, [baseUrl]);

//   const handleMobileChange = (e) => {
//     const { value } = e.target;
//     if (!/^\d*$/.test(value)) return;
//     const trimmedValue = value.slice(0, 10);
//     setProfile((prev) => ({
//       ...prev,
//       mobile: trimmedValue,
//     }));
//     if (trimmedValue.length > 0) {
//       if (!/^[6-9]/.test(trimmedValue)) {
//         setErrors((prev) => ({
//           ...prev,
//           mobile: "Mobile must start with 6, 7, 8, or 9",
//         }));
//       } else if (trimmedValue.length < 10) {
//         setErrors((prev) => ({
//           ...prev,
//           mobile: "Mobile must be 10 digits",
//         }));
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           mobile: "",
//         }));
//       }
//     } else {
//       setErrors((prev) => ({
//         ...prev,
//         mobile: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!profile.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(profile.firstName)) {
//       newErrors.firstName = "Only letters are allowed";
//     }

//     if (!profile.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(profile.lastName)) {
//       newErrors.lastName = "Only letters are allowed";
//     }

//     if (!profile.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!profile.mobile) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^[6-9]\d{9}$/.test(profile.mobile)) {
//       newErrors.mobile =
//         "Invalid mobile number (must start with 6-9 and be 10 digits)";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${baseUrl}/auth/update`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           firstName: profile.firstName,
//           lastName: profile.lastName,
//           email: profile.email,
//           mobile: profile.mobile,
//           address: profile.address,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.msg || "Failed to update profile");
//       }

//       setSuccessMessage("Profile updated successfully!");
//       setIsEditing(false);
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Update error:", error);
//       setErrors({
//         submit: error.message || "Failed to update profile. Please try again.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setErrors({});
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Profile Header */}
//         <div className="text-center mb-12">
//           <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
//             <FaUserCircle className="text-6xl text-gray-400" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Welcome, {profile.firstName} {profile.lastName}
//           </h1>
//           <p className="mt-2 text-lg text-gray-600">
//             Manage your account information and orders
//           </p>
//         </div>

//         {/* Tabs Navigation */}
//         <div className="flex border-b border-gray-200 mb-8">
//           <button
//             onClick={() => setActiveTab("profile")}
//             className={`py-4 px-6 font-medium text-md flex items-center space-x-2 ${
//               activeTab === "profile"
//                 ? "border-b-2 border-[#971D89] text-[#971D89]"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <FaUser className="h-6 w-6" />
//             <span>Profile</span>
//           </button>
//           <button
//             onClick={() => setActiveTab("orders")}
//             className={`py-4 px-6 font-medium text-md flex items-center space-x-2 ${
//               activeTab === "orders"
//                 ? "border-b-2 border-[#971D89] text-[#971D89]"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <FaBox className="h-6 w-6" />
//             <span>Orders</span>
//           </button>
//         </div>
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {activeTab === "profile" ? (
//             <div className="p-6">
//               {successMessage && (
//                 <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6">
//                   <p>{successMessage}</p>
//                 </div>
//               )}

//               {errors.submit && (
//                 <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//                   <p>{errors.submit}</p>
//                 </div>
//               )}

//               {isEditing ? (
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={profile.firstName}
//                         onChange={handleChange}
//                         className={`w-full rounded-lg border ${
//                           errors.firstName
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
//                       />
//                       {errors.firstName && (
//                         <p className="mt-1 text-xs text-red-600">
//                           {errors.firstName}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={profile.lastName}
//                         onChange={handleChange}
//                         className={`w-full rounded-lg border ${
//                           errors.lastName ? "border-red-500" : "border-gray-300"
//                         } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
//                       />
//                       {errors.lastName && (
//                         <p className="mt-1 text-xs text-red-600">
//                           {errors.lastName}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <FaEnvelope className="text-gray-400" />
//                         </div>
//                         <input
//                           type="email"
//                           name="email"
//                           value={profile.email}
//                           onChange={handleChange}
//                           className={`pl-10 w-full rounded-lg border ${
//                             errors.email ? "border-red-500" : "border-gray-300"
//                           } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
//                         />
//                       </div>
//                       {errors.email && (
//                         <p className="mt-1 text-xs text-red-600">
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Mobile
//                         </label>
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <FaPhone className="text-gray-400" />
//                           </div>
//                           <input
//                             type="tel"
//                             name="mobile"
//                             value={profile.mobile}
//                             onChange={handleMobileChange}
//                             maxLength="10"
//                             inputMode="numeric"
//                             className={`pl-10 w-full rounded-lg border ${
//                               errors.mobile
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
//                             placeholder="e.g. 9876543210"
//                           />
//                         </div>
//                         {errors.mobile && (
//                           <p className="mt-1 text-xs text-red-600 animate-pulse">
//                             {errors.mobile}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Address
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
//                         <FaMapMarkerAlt className="text-gray-400" />
//                       </div>
//                       <textarea
//                         name="address"
//                         value={profile.address}
//                         onChange={handleChange}
//                         rows="3"
//                         className={`pl-10 w-full rounded-lg border ${
//                           errors.address ? "border-red-500" : "border-gray-300"
//                         } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
//                       />
//                     </div>
//                     {errors.address && (
//                       <p className="mt-1 text-xs text-red-600">
//                         {errors.address}
//                       </p>
//                     )}
//                   </div>

//                   <div className="flex justify-end space-x-3 pt-4">
//                     <button
//                       type="button"
//                       onClick={handleCancel}
//                       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={isLoading}
//                       className="px-4 py-2 bg-[#971D89] text-white rounded-lg hover:bg-[#7e176f] transition disabled:opacity-70"
//                     >
//                       {isLoading ? "Saving..." : "Save Changes"}
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex items-start space-x-4 border border-gray-300 p-3 rounded-md">
//                       <div className="flex-shrink-0">
//                         <FaUser className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <div className="">
//                         <p className="text-sm font-medium text-gray-500">
//                           Name
//                         </p>
//                         <p className="text-gray-900">
//                           {profile.firstName} {profile.lastName}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-4 border border-gray-300 p-3 rounded-md">
//                       <div className="flex-shrink-0">
//                         <FaEnvelope className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-500">
//                           Email
//                         </p>
//                         <p className="text-gray-900">{profile.email}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-4 border border-gray-300 p-3 rounded-md">
//                       <div className="flex-shrink-0">
//                         <FaPhone className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-500">
//                           Mobile
//                         </p>
//                         <p className="text-gray-900">{profile.mobile}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start space-x-4 border border-gray-300 p-3 rounded-md">
//                       <div className="flex-shrink-0">
//                         <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-500">
//                           Address
//                         </p>
//                         <p className="text-gray-900">
//                           {profile.address || "Not provided"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="pt-4">
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="px-4 py-2 bg-[#971D89] text-white rounded-lg hover:bg-[#7e176f] transition flex items-center justify-center space-x-2"
//                     >
//                       <FaEdit className="h-4 w-4" />
//                       <span>Edit Profile</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="p-6">
//               <OrderPage />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };




import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaUserCircle,
  FaBox,
  FaCreditCard,
  FaHistory,
} from "react-icons/fa";
import { OrderPage } from "../userOrder/userOrder";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile', 'orders', or 'payments'
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for name fields (letters only)
    if (name === "firstName" || name === "lastName") {
      if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
        setProfile((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      return;
    }

    // Special handling for mobile (numbers only)
    if (name === "mobile") {
      if (/^[0-9]*$/.test(value) || value === "") {
        setProfile((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      return;
    }

    // Default handling for other fields
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/userInfo`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProfile(
          data?.user || {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            address: "",
          }
        );
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchProfile();
  }, [baseUrl]);

  // Fetch payment history when payments tab is active
  useEffect(() => {
    if (activeTab === "payments") {
      fetchPaymentHistory();
    }
  }, [activeTab]);

  const fetchPaymentHistory = async () => {
    setIsLoadingPayments(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/zaakpay/history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPaymentHistory(data.history || []);
      } else {
        console.error("Failed to fetch payment history");
      }
    } catch (error) {
      console.error("Error fetching payment history:", error);
    } finally {
      setIsLoadingPayments(false);
    }
  };

  const handleMobileChange = (e) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    const trimmedValue = value.slice(0, 10);
    setProfile((prev) => ({
      ...prev,
      mobile: trimmedValue,
    }));
    if (trimmedValue.length > 0) {
      if (!/^[6-9]/.test(trimmedValue)) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile must start with 6, 7, 8, or 9",
        }));
      } else if (trimmedValue.length < 10) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile must be 10 digits",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          mobile: "",
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        mobile: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(profile.firstName)) {
      newErrors.firstName = "Only letters are allowed";
    }

    if (!profile.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(profile.lastName)) {
      newErrors.lastName = "Only letters are allowed";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!profile.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(profile.mobile)) {
      newErrors.mobile =
        "Invalid mobile number (must start with 6-9 and be 10 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/auth/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          mobile: profile.mobile,
          address: profile.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to update profile");
      }

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setErrors({
        submit: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === "success") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else if (status === "failed") {
      return `${baseClasses} bg-red-100 text-red-800`;
    } else {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
            <FaUserCircle className="text-6xl text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {profile.firstName} {profile.lastName}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your account information and orders
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-4 px-6 font-medium text-md flex items-center space-x-2 ${
              activeTab === "profile"
                ? "border-b-2 border-[#971D89] text-[#971D89]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaUser className="h-6 w-6" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-4 px-6 font-medium text-md flex items-center space-x-2 ${
              activeTab === "orders"
                ? "border-b-2 border-[#971D89] text-[#971D89]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaBox className="h-6 w-6" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`py-4 px-6 font-medium text-md flex items-center space-x-2 ${
              activeTab === "payments"
                ? "border-b-2 border-[#971D89] text-[#971D89]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaCreditCard className="h-6 w-6" />
            <span>Payment History</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {activeTab === "profile" ? (
            <div className="p-6">
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                  <p>{successMessage}</p>
                </div>
              )}

              {errors.submit && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                  <p>{errors.submit}</p>
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleChange}
                          className={`pl-10 w-full rounded-lg border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="mobile"
                            value={profile.mobile}
                            onChange={handleMobileChange}
                            maxLength="10"
                            inputMode="numeric"
                            className={`pl-10 w-full rounded-lg border ${
                              errors.mobile
                                ? "border-red-500"
                                : "border-gray-300"
                            } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
                            placeholder="e.g. 9876543210"
                          />
                        </div>
                        {errors.mobile && (
                          <p className="mt-1 text-xs text-red-600 animate-pulse">
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <textarea
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        rows="3"
                        className={`pl-10 w-full rounded-lg border ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#971D89]`}
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-[#971D89] text-white rounded-lg hover:bg-[#7e176f] transition disabled:opacity-70"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4 border border-gray-300 p-3 rounded-md">
                      <div className="flex-shrink-0">
                        <FaUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="">
                        <p className="text-sm font-medium text-gray-500">
                          Name
                        </p>
                        <p className="text-gray-900">
                          {profile.firstName} {profile.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 border border-gray-300 p-3 rounded-md">
                      <div className="flex-shrink-0">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email
                        </p>
                        <p className="text-gray-900">{profile.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 border border-gray-300 p-3 rounded-md">
                      <div className="flex-shrink-0">
                        <FaPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Mobile
                        </p>
                        <p className="text-gray-900">{profile.mobile}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 border border-gray-300 p-3 rounded-md">
                      <div className="flex-shrink-0">
                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Address
                        </p>
                        <p className="text-gray-900">
                          {profile.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-[#971D89] text-white rounded-lg hover:bg-[#7e176f] transition flex items-center justify-center space-x-2"
                    >
                      <FaEdit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "orders" ? (
            <div className="p-6">
              <OrderPage />
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
                <p className="text-gray-600 mt-1">View your past payment transactions</p>
              </div>

              {isLoadingPayments ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#971D89]"></div>
                </div>
              ) : paymentHistory.length === 0 ? (
                <div className="text-center py-12">
                  <FaHistory className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No payment history</h3>
                  <p className="text-gray-500">You haven't made any payments yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Order ID: {payment.orderId}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(payment.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={getStatusBadge(payment.status)}>
                            {payment.status.toUpperCase()}
                          </span>
                          <p className="text-lg font-bold text-gray-900 mt-1">
                            ₹{payment.amount}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">Transaction ID:</span>{" "}
                            {payment.transactionId || "N/A"}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Gateway:</span>{" "}
                            {payment.gateway || "Zaakpay"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium">Payment Mode:</span>{" "}
                            {payment.rawResponse?.paymentMode || "N/A"}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Response:</span>{" "}
                            {payment.rawResponse?.responseDescription || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};