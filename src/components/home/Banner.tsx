"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface APIBanner {
  _id: string;
  bannerName: string;
  description: string;
  deviceType: string;
  images: string[];
  position: string;
}

const Banner: React.FC = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

  const [banners, setBanners] = useState<APIBanner[]>([]);
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");
  const [categories, setCategories] = useState<string[]>([]);
  const [isNewArrival, setIsNewArrival] = useState(false);
  
  // ✅ Detect "new arrivals" banner
  useEffect(() => {
    const hasNewArrivalBanner = banners.some(
      (banner) => banner.description === "newArrival"
    );
    setIsNewArrival(hasNewArrivalBanner);
  }, [banners]);

  // ✅ Fetch categories
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

  // ✅ Correct API call for newArrival
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${baseUrl}/products?referenceWebsite=${referenceWebsite}`;
        if (isNewArrival) {
          url += `&newArrival=true`; // ✅ correct param
        }
        console.log("🟢 Fetching products from:", url);
        const res = await fetch(url);
        const data = await res.json();
        // handle data.products here if needed
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, [isNewArrival]);

  // ✅ Device type detection
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth <= 768;
      setDeviceType(isMobile ? "mobile" : "desktop");
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);
// useEffect(() => {
//   const checkDevice = () => {
//     const isMobile = /android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos/i
//       .test(navigator.userAgent);
//     setDeviceType(isMobile ? "mobile" : "desktop");
//   };

//   checkDevice();
// }, []);


  // ✅ Fetch banners based on device
 useEffect(() => {
  const fetchBanners = async () => {
    try {
      const endpoint = deviceType === "mobile" ? "mobile" : "desktop";
      const res = await fetch(
        `${baseUrl}/banners/${endpoint}?referenceWebsite=${referenceWebsite}`
      );
      const data = await res.json();
      const filtered = (data.banners || []).filter(
        (item: APIBanner) => item.deviceType === deviceType
      );
      setBanners(filtered);
    } catch (err) {
      console.error("Failed to fetch banners", err);
    }
  };

  fetchBanners();
}, [deviceType]);


  if (banners.length === 0) return null;

  return (
    <section className="relative w-full">
      <div className="relative overflow-hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-auto"
        >
          {banners.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="relative w-full h-auto">
                <img
                  src={`https://api.jajamblockprints.com${item.images[0]}`}
                  alt={item.bannerName}
                  className="w-full h-auto object-fill"
                  loading="eager"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center z-20 px-4">
                  <div className="w-full max-w-3xl space-y-4">
                    <div className="flex flex-row justify-center items-center gap-3 -mt-16 sm:mt-64">
                      <Link
                        to={
                          item.description?.toLowerCase() === "new arrivals"
                            ? `/products?newArrival=true` 
                            : `/category/${encodeURIComponent(
                                item?.description
                              ).toLowerCase()}`
                        }
                        className="group inline-flex items-center justify-center gap-2 py-1 px-4 text-xs font-bold bg-white text-black rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgb(157 48 137)";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.color = "black";
                        }}
                      >
                        <span>Shop {item?.description}</span>
                        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <a
                        href="/products"
                        className="group inline-flex items-center justify-center gap-2 py-1 px-4 text-sm font-bold rounded-full transition-all duration-300 border-2 border-white/50 backdrop-blur-sm hover:bg-white/20 bg-white/10 text-white"
                      >
                        <span>View All Products</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Buttons */}
          <div className="swiper-button-prev hidden sm:flex" />
          <div className="swiper-button-next hidden sm:flex" />
        </Swiper>

        {/* Swiper Styles */}
        <style jsx global>{`
          .swiper-pagination {
            bottom: 20px !important;
          }

          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            margin: 0 6px;
            opacity: 1;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
            width: 30px;
            background: white;
            border-radius: 7px;
            border-color: white;
          }

          .swiper-button-next,
          .swiper-button-prev {
            width: 50px;
            height: 50px;
            background: rgba(157, 48, 137, 0.8);
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px);
            transition: all 0.3s ease;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgb(157, 48, 137);
            border-color: white;
            transform: scale(1.1);
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px;
            color: white;
            font-weight: bold;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Banner;
