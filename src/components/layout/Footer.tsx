// "use client";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Youtube,
//   Mail,
//   Phone,
//   MapPin,
//   Heart,
//   Workflow,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import footerLogo from "../../assest/footerLogo.jpg";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Footer() {
//   const [categories, setCategories] = useState<string[]>([]);
//   const baseUrl = import.meta.env.VITE_API_BASE_URL;
//   const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`${baseUrl}/website/${referenceWebsite}`);
//         const data = await res.json();
//         if (Array.isArray(data.website?.categories)) {
//           setCategories(data.website.categories.map((cat: any) => cat.name));
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };
//     fetchCategories();
//   }, [baseUrl, referenceWebsite]);



// const handleSubscribe = async () => {
//   if (!email) {
//     setMessage("Please enter your email");
//     return;
//   }

//   setLoading(true);
//   setMessage("");

//   try {
//     const { data } = await axios.post(`${baseUrl}/newsletter/subscribe`, { email }, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNhMzM3Njg5M2FjOWY3MTllYTVjNGQiLCJlbWFpbCI6ImRldmVsb3BlckA3dW5pcXVlLmluIiwidXNlcm5hbWUiOiJhZG1pbiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc1NTU5OTE5MCwiZXhwIjoxNzU1NjAyNzkwfQ.pFKqDtkko3EQxbUQEA99XXeEACN1bdsCxuSYCpye4cI",
//       },
//     });

//     setMessage("✅ Subscribed successfully!");
//   } catch (error) {
//     console.error("Subscription error:", error);

//     if (error.response) {
//       setMessage(`❌ Error: ${error.response.data.message || "Failed to subscribe"}`);
//     } else {
//       setMessage("❌ Something went wrong!");
//     }
//   } finally {
//     setLoading(false);
//   }
// };


//   function slugify(text) {
//     return text
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, "-") // Replace spaces with hyphens
//       .replace(/[^\w-]+/g, "") // Remove special characters
//       .replace(/--+/g, "-"); // Remove duplicate hyphens
//   }

//   return (
//     <footer className="relative overflow-hidden">
//       {/* Decorative background pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="h-full w-full"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23A13C78' fillOpacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20-20c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       {/* Main footer content */}
//       <div
//         className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-t-4"
//         style={{ borderColor: "rgb(157 48 137)" }}
//       >
//         {/* Decorative top border pattern */}
//         <div
//           className="w-full h-2"
//           style={{
//             background:
//               "linear-gradient(90deg, rgb(157 48 137) 0%, #A13C78 25%, #872D67 50%, #681853 75%, rgb(157 48 137) 100%)",
//           }}
//         ></div>

//         <div className="container mx-auto px-4 py-2 mt-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-8">
//             {/* Brand Section - Enhanced */}
//             <div className="lg:col-span-1 space-y-8">
//               <Link to="/" className="inline-block group">
//                 <div className="relative">
//                   <img
//                     src={footerLogo || "/placeholder.svg"}
//                     alt="Company Logo"
//                     className="w-56 rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//               </Link>

//               <div className="space-y-6">
//                 <p className="text-gray-700 text-lg leading-relaxed max-w-sm">
//                   Where tradition gracefully meets modern style, bringing you
//                   handcrafted elegance inspired by the rich art of block
//                   printing. With every piece,{" "}
//                   <Link
//                     to={"/about-us"}
//                     className="text-purple-900 hover:underline"
//                   >
//                     Jajam Block Print{" "}
//                   </Link>{" "}
//                   celebrates culture, craftsmanship, and contemporary fashion in
//                   harmony.
//                   {/* <span
//                     className="font-semibold"
//                     style={{ color: "rgb(157 48 137)" }}
//                   >
//                     authentic traditional wear
//                   </span> */}
//                   {/* and modern fashion solutions. */}
//                 </p>

//                 {/* Enhanced social media */}
//                 <div className="space-y-4">
//                   <h4
//                     className="text-lg font-bold"
//                     style={{ color: "#1B2E4F" }}
//                   >
//                     Follow Our Journey
//                   </h4>
//                   <div className="flex space-x-4">
//                     {[
//                       {
//                         icon: <Facebook className="h-5 w-5" />,
//                         label: "Facebook",
//                         color: "#1877F2",
//                         link: "#",
//                       },
//                       {
//                         icon: <Twitter className="h-5 w-5" />,
//                         label: "Twitter",
//                         color: "#1DA1F2",
//                         link: "#",
//                       },
//                       {
//                         icon: <Instagram className="h-5 w-5" />,
//                         label: "Instagram",
//                         color: "#E4405F",
//                         link: "https://www.instagram.com/jajamblockprints/",
//                       },
//                       {
//                         icon: <Youtube className="h-5 w-5" />,
//                         label: "YouTube",
//                         color: "#FF0000",
//                         link: "#",
//                       },
//                     ].map((social, index) => (
//                       <a
//                         key={index}
//                         href={social.link || "#"}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="group relative h-12 w-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 hover:shadow-xl"
//                         style={{
//                           borderColor: "rgba(157, 48, 137, 0.3)",
//                           color: "rgb(157 48 137)",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.background = social.color;
//                           e.currentTarget.style.color = "white";
//                           e.currentTarget.style.borderColor = social.color;
//                           e.currentTarget.style.transform =
//                             "translateY(-8px) scale(1.1)";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.background = "transparent";
//                           e.currentTarget.style.color = "rgb(157 48 137)";
//                           e.currentTarget.style.borderColor =
//                             "rgba(157, 48, 137, 0.3)";
//                           e.currentTarget.style.transform =
//                             "translateY(0) scale(1)";
//                         }}
//                         aria-label={social.label}
//                       >
//                         {social.icon}
//                         {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           {social.label}
//                         </div> */}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="">
//                   <h3 className="text-xl font-bold my-4 ">
//                     Subscribe to our Newsletter
//                   </h3>
//                   <div className="flex justify-left items-center gap-2">
//                     <input
//                       type="email"
//                       placeholder="Enter your email"
//                       className="border px-4 py-2 rounded-lg w-64"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <button
//                       onClick={handleSubscribe}
//                       disabled={loading}
//                       className="text-black px-4 py-2 rounded-lg"
//                       style={{ backgroundColor: "#ffdcf1" }}
//                     >
//                       {loading ? "Subscribing..." : "Subscribe"}
//                     </button>
//                   </div>
//                   {message && (
//                     <p className="mt-2 text-sm text-gray-700">{message}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Shop Categories - Enhanced */}
//             {/* Shop Categories - Enhanced */}
//             <div className="space-y-8">
//               <div>
//                 <h3
//                   className="text-3xl font-bold mb-2"
//                   style={{ color: "#1B2E4F" }}
//                 >
//                   Shop Categories
//                 </h3>
//                 <div className="flex items-center space-x-2 mb-6">
//                   <div
//                     className="w-16 h-1 rounded-full"
//                     style={{ background: "rgb(157 48 137)" }}
//                   ></div>
//                   <div
//                     className="w-2 h-2 rounded-full"
//                     style={{ background: "rgb(157 48 137)" }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="space-y-0">
//                 {categories.slice(0, 10).map((item, index) => (
//                   <Link
//                     key={item}
//                     to={`/category/${slugify(item)}`}
//                     className="group flex items-center p-1  duration-300 "
//                     // style={{
//                     //   background: "rgba(157, 48, 137, 0.05)",
//                     // }}
//                     // onMouseEnter={(e) => {
//                     //   e.currentTarget.style.background =
//                     //     "rgba(157, 48, 137, 0.1)";
//                     //   e.currentTarget.style.transform = "translateX(8px)";
//                     // }}
//                     // onMouseLeave={(e) => {
//                     //   e.currentTarget.style.background =
//                     //     "rgba(157, 48, 137, 0.05)";
//                     //   e.currentTarget.style.transform = "translateX(0)";
//                     // }}
//                   >
//                     <div
//                       className="w-2 h-2 rounded-full mr-4 transition-all duration-300 group-hover:scale-125"
//                       style={{
//                         background: `rgb(${157 + index * 10} ${
//                           48 + index * 5
//                         } ${137 - index * 10})`,
//                       }}
//                     ></div>
//                     <span className="text-lg font-semibold text-gray-700 group-hover:text-purple-800 transition-colors">
//                       {item}
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Contact Info - Enhanced */}
//             <div className="space-y-8">
//               <div>
//                 <h3
//                   className="text-3xl font-bold mb-2"
//                   style={{ color: "#1B2E4F" }}
//                 >
//                   Get In Touch
//                 </h3>
//                 <div className="flex items-center space-x-2 mb-6">
//                   <div
//                     className="w-16 h-1 rounded-full"
//                     style={{ background: "rgb(157 48 137)" }}
//                   ></div>
//                   <div
//                     className="w-2 h-2 rounded-full"
//                     style={{ background: "rgb(157 48 137)" }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="flex items-start space-x-4  ">
//                   <MapPin
//                     className="h-6 w-6 mt-1 flex-shrink-0"
//                     style={{ color: "rgb(157 48 137)" }}
//                   />
//                   <div>
//                     <h5 className="font-semibold text-gray-800 mb-1">
//                       Our Location
//                     </h5>
//                     <h6 className="font-semibold text-gray-600 mb-1">
//                       Operating Address
//                     </h6>
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       PLOT NO 21-A (2), RAMDWARA COLONY-2, SANGANER,
//                       JAIPUR-302029
//                     </p>
//                     <p className="text-gray-500 text-xs mt-1">
//                       LANDMARK: BEHIND SPARSH HOSPITAL
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4   ">
//                   <Workflow
//                     className="h-6 w-6 flex-shrink-0"
//                     style={{ color: "rgb(157 48 137)" }}
//                   />
//                   <div>
//                     <h5 className="font-semibold text-gray-800 mb-1">
//                       Working Hours
//                     </h5>
//                     <p className="text-gray-600">
//                       <p>Mon-sat</p>
//                       <p>09:30AM-06:00PM</p>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4   ">
//                   <Phone
//                     className="h-6 w-6 flex-shrink-0"
//                     style={{ color: "rgb(157 48 137)" }}
//                   />
//                   <div>
//                     <h5 className="font-semibold text-gray-800 mb-1">
//                       Contact Us
//                     </h5>
//                     <p className="text-gray-600">
//                       <a href="tel:9680034960" className="hover:underline">
//                         +91-9680034960
//                       </a>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-4   ">
//                   <Mail
//                     className="h-6 w-6 flex-shrink-0"
//                     style={{ color: "rgb(157 48 137)" }}
//                   />
//                   <div>
//                     <h5 className="font-semibold text-gray-800 mb-1">
//                       Email Address
//                     </h5>
//                     <p className="text-gray-600 text-sm">
//                       <a
//                         href="mailto:shreeshyamblockprints.1@gmail.com"
//                         className="hover:underline"
//                       >
//                         shreeshyamblockprints.1@gmail.com
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>



//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



"use client";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  Workflow,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import footerLogo from "../../assest/footerLogo.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

// Toast Component
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] transform transition-all duration-300 ${
        type === "success"
          ? "bg-green-100 text-green-800 border border-green-200"
          : "bg-red-100 text-red-800 border border-red-200"
      }`}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <div className="h-6 w-6 mr-2 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        ) : (
          <div className="h-6 w-6 mr-2 bg-red-500 rounded-full flex items-center justify-center">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className={`ml-4 ${
          type === "success" ? "text-green-600" : "text-red-600"
        } hover:opacity-70`}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default function Footer() {
  const [categories, setCategories] = useState<string[]>([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`);
        const data = await res.json();
        if (Array.isArray(data.website?.categories)) {
          setCategories(data.website.categories.map((cat: any) => cat.name));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [baseUrl, referenceWebsite]);

  const handleSubscribe = async () => {
    if (!email) {
      setToast({
        show: true,
        message: "Please enter your email",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${baseUrl}/newsletter/subscribe`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNhMzM3Njg5M2FjOWY3MTllYTVjNGQiLCJlbWFpbCI6ImRldmVsb3BlckA3dW5pcXVlLmluIiwidXNlcm5hbWUiOiJhZG1pbiIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc1NTU5OTE5MCwiZXhwIjoxNzU1NjAyNzkwfQ.pFKqDtkko3EQxbUQEA99XXeEACN1bdsCxuSYCpye4cI",
          },
        }
      );

      setToast({
        show: true,
        message: "✅ Subscribed successfully!",
        type: "success",
      });
      setEmail(""); // Clear the input field
    } catch (error) {
      console.error("Subscription error:", error);

      let errorMessage = "❌ Something went wrong!";
      if (error.response) {
        errorMessage = `❌ Error: ${error.response.data.message || "Failed to subscribe"}`;
      }

      setToast({
        show: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, "") // Remove special characters
      .replace(/--+/g, "-"); // Remove duplicate hyphens
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23A13C78' fillOpacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20-20c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main footer content */}
      <div
        className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-t-4"
        style={{ borderColor: "rgb(157 48 137)" }}
      >
        {/* Decorative top border pattern */}
        <div
          className="w-full h-2"
          style={{
            background:
              "linear-gradient(90deg, rgb(157 48 137) 0%, #A13C78 25%, #872D67 50%, #681853 75%, rgb(157 48 137) 100%)",
          }}
        ></div>

        <div className="container mx-auto px-4 py-2 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-8">
            {/* Brand Section - Enhanced */}
            <div className="lg:col-span-1 space-y-8 md:space-x-8 ">
              <Link to="/" className="inline-block group">
                <div className="relative">
                  <img
                    src={footerLogo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="w-56 rounded-2xl md:ml-8 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>

              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed max-w-sm">
                  Where tradition gracefully meets modern style, bringing you
                  handcrafted elegance inspired by the rich art of block
                  printing. With every piece,{" "}
                  <Link
                    to={"/about-us"}
                    className="text-purple-900 hover:underline"
                  >
                    Jajam Block Print{" "}
                  </Link>{" "}
                  celebrates culture, craftsmanship, and contemporary fashion in
                  harmony.
                </p>

                {/* Enhanced social media */}
                <div className="space-y-4">
                  <h4
                    className="text-lg font-bold"
                    style={{ color: "#1B2E4F" }}
                  >
                    Follow Our Journey
                  </h4>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: <Facebook className="h-5 w-5" />,
                        label: "Facebook",
                        color: "#1877F2",
                        link: "https://www.facebook.com/jajamblockprints",
                      },
                      {
                        icon: <Twitter className="h-5 w-5" />,
                        label: "Twitter",
                        color: "#1DA1F2",
                        link: "#",
                      },
                      {
                        icon: <Instagram className="h-5 w-5" />,
                        label: "Instagram",
                        color: "#E4405F",
                        link: "https://www.instagram.com/jajamblockprints/",
                      },
                      {
                        icon: <Youtube className="h-5 w-5" />,
                        label: "YouTube",
                        color: "#FF0000",
                        link: "#",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-12 w-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 hover:shadow-xl"
                        style={{
                          borderColor: "rgba(157, 48, 137, 0.3)",
                          color: "rgb(157 48 137)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = social.color;
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = social.color;
                          e.currentTarget.style.transform =
                            "translateY(-8px) scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgb(157 48 137)";
                          e.currentTarget.style.borderColor =
                            "rgba(157, 48, 137, 0.3)";
                          e.currentTarget.style.transform =
                            "translateY(0) scale(1)";
                        }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="">
                  <h3 className="text-xl font-bold my-4 ">
                    Subscribe to our Newsletter
                  </h3>
                  <div className="flex justify-left items-center gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="border px-4 py-2 rounded-lg w-64"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={loading}
                      className="text-black px-4 py-2 rounded-lg"
                      style={{ backgroundColor: "#ffdcf1" }}
                    >
                      {loading ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>
                  {message && (
                    <p className="mt-2 text-sm text-gray-700">{message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shop Categories - Enhanced */}
            <div className="space-y-8">
              <div>
                <h3
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#1B2E4F" }}
                >
                  Shop Categories
                </h3>
                <div className="flex items-center space-x-2 mb-6">
                  <div
                    className="w-16 h-1 rounded-full"
                    style={{ background: "rgb(157 48 137)" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "rgb(157 48 137)" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-0">
                {categories.slice(0, 10).map((item, index) => (
                  <Link
                    key={item}
                    to={`/category/${slugify(item)}`}
                    className="group flex items-center p-1  duration-300 "
                  >
                    <div
                      className="w-2 h-2 rounded-full mr-4 transition-all duration-300 group-hover:scale-125"
                      style={{
                        background: `rgb(${157 + index * 10} ${
                          48 + index * 5
                        } ${137 - index * 10})`,
                      }}
                    ></div>
                    <span className="text-lg font-semibold text-gray-700 group-hover:text-purple-800 transition-colors">
                      {item}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info - Enhanced */}
            <div className="space-y-8">
              <div>
                <h3
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#1B2E4F" }}
                >
                  Get In Touch
                </h3>
                <div className="flex items-center space-x-2 mb-6">
                  <div
                    className="w-16 h-1 rounded-full"
                    style={{ background: "rgb(157 48 137)" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "rgb(157 48 137)" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4  ">
                  <MapPin
                    className="h-6 w-6 mt-1 flex-shrink-0"
                    style={{ color: "rgb(157 48 137)" }}
                  />
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">
                      Our Location
                    </h5>
                    <h6 className="font-semibold text-gray-600 mb-1">
                      Operating Address
                    </h6>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      PLOT NO 21-A (2), RAMDWARA COLONY-2, SANGANER,
                      JAIPUR-302029
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      LANDMARK: BEHIND SPARSH HOSPITAL
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4   ">
                  <Workflow
                    className="h-6 w-6 flex-shrink-0"
                    style={{ color: "rgb(157 48 137)" }}
                  />
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">
                      Working Hours
                    </h5>
                    <p className="text-gray-600">
                      <p>Mon-sat</p>
                      <p>09:30AM-06:00PM</p>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4   ">
                  <Phone
                    className="h-6 w-6 flex-shrink-0"
                    style={{ color: "rgb(157 48 137)" }}
                  />
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">
                      Contact Us
                    </h5>
                    <p className="text-gray-600">
                      <a href="tel:9680034960" className="hover:underline">
                        +91-9680034960
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4   ">
                  <Mail
                    className="h-6 w-6 flex-shrink-0"
                    style={{ color: "rgb(157 48 137)" }}
                  />
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">
                      Email Address
                    </h5>
                    <p className="text-gray-600 text-sm">
                      <a
                        href="mailto:shreeshyamblockprints.1@gmail.com"
                        className="hover:underline"
                      >
                        shreeshyamblockprints.1@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* New Links Section */}
            <div className="space-y-8">
              <div>
                <h3
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#1B2E4F" }}
                >
                  Policies & Info
                </h3>
                <div className="flex items-center space-x-2 mb-6">
                  <div
                    className="w-16 h-1 rounded-full"
                    style={{ background: "rgb(157 48 137)" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "rgb(157 48 137)" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
               
                <Link
                  to="/about-us"
                  className="block text-lg font-semibold text-gray-700 hover:text-purple-800 transition-colors"
                >
                  About us
                </Link>
                 <Link
                  to="/returns-and-exchanges"
                  className="block text-lg font-semibold text-gray-700 hover:text-purple-800 transition-colors"
                >
                  Returns & Exchanges
                </Link>
                <Link
                  to="/cancellation_policy"
                  className="block text-lg font-semibold text-gray-700 hover:text-purple-800 transition-colors"
                >
                  Cancellation Policy
                </Link>
                <Link
                  to="/shipping-policy"
                  className="block text-lg font-semibold text-gray-700 hover:text-purple-800 transition-colors"
                >
                  Shipping Policy
                </Link>
                <Link
                  to="/privacy-policy"
                  className="block text-lg font-semibold text-gray-700 hover:text-purple-800 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="block text-lg font-semibold text-gray-700 hover:text-purple-800 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="block text-lg font-semibold text-gray-700 hover:text-purple-800 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom section with copyright */}
          <div className="border-t border-gray-200 pt-8 pb-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Jajam Block Print. All rights
                reserved.
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-gray-600 text-sm">Crafted with</span>
                <Heart
                  className="h-4 w-4 text-red-500"
                  style={{ fill: "rgb(157 48 137)" }}
                />
                <span className="text-gray-600 text-sm">
                  in Rajasthan, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}