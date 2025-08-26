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
} from "lucide-react";
import { Link } from "react-router-dom";
import footerLogo from "../../assest/footerLogo.jpg";
import { useEffect, useState } from "react";

export default function Footer() {
  const [categories, setCategories] = useState<string[]>([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

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

  function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')   // Remove special characters
    .replace(/--+/g, '-');     // Remove duplicate hyphens
}

  return (
    <footer className="relative overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-8">
            {/* Brand Section - Enhanced */}
            <div className="lg:col-span-1 space-y-8">
              <Link to="/" className="inline-block group">
                <div className="relative">
                  <img
                    src={footerLogo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="w-56 rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105"
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
                  {/* <span
                    className="font-semibold"
                    style={{ color: "rgb(157 48 137)" }}
                  >
                    authentic traditional wear
                  </span> */}
                  {/* and modern fashion solutions. */}
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
                        link: "#",
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
                        {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {social.label}
                        </div> */}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Categories - Enhanced */}
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
                    // style={{
                    //   background: "rgba(157, 48, 137, 0.05)",
                    // }}
                    // onMouseEnter={(e) => {
                    //   e.currentTarget.style.background =
                    //     "rgba(157, 48, 137, 0.1)";
                    //   e.currentTarget.style.transform = "translateX(8px)";
                    // }}
                    // onMouseLeave={(e) => {
                    //   e.currentTarget.style.background =
                    //     "rgba(157, 48, 137, 0.05)";
                    //   e.currentTarget.style.transform = "translateX(0)";
                    // }}
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
                       PLOT NO 21-A (2), RAMDWARA
                      COLONY-2, SANGANER, JAIPUR-302029
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
                      <a href="tel:9116131960" className="hover:underline">
                        +91-9116131960
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
          </div>
        </div>

        {/* Copyright section with Customer Support links */}
        <div
          className="border-t-2 py-8"
          style={{
            borderColor: "rgba(157, 48, 137, 0.2)",
            background:
              "linear-gradient(135deg, rgba(157, 48, 137, 0.05), rgba(161, 60, 120, 0.05))",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6">
              <p className="text-gray-700 text-lg font-medium">
                &copy; {new Date().getFullYear()} JAJAM BLOCK PRINTS . All
                rights reserved.
              </p>

              {/* Customer Support Links with dividers */}
              <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
                {[
                  { title: "About Us", path: "/about-us" },
                  { title: "Terms of Service", path: "/terms-of-service" },
                  { title: "Privacy Policy", path: "/privacy-policy" },
                  {
                    title: "Terms And Conditions",
                    path: "/terms-and-conditions",
                  },
                  { title: "Shipping Policy", path: "/shipping-policy" },
                  {
                    title: "Return, Refund & Exchange Policy",
                    path: "/returns-and-exchanges",
                  },
                  { title: "Cancellation Policy", path: "/cancellation_policy" },
                ].map((item, index, array) => (
                  <div key={index} className="flex items-center">
                    <Link
                      to={item.path}
                      className="text-gray-600 hover:text-purple-700 transition-colors font-medium px-3 py-1 rounded-full hover:bg-purple-50"
                    >
                      {item.title}
                    </Link>
                    {index < array.length - 1 && (
                      <div
                        className="w-1 h-1 rounded-full mx-2"
                        style={{ background: "rgba(157, 48, 137, 0.4)" }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
