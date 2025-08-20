"use client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"
// import Img from '../../assest/saree.webp'

const styleMap: Record<string, any> = {
  "Kalmkari Print Fabric": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "320+ Products",
    image: "/saree1.webp",
  },
  "Cotton mal mal saree": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "450+ Products",
    image: "/saree2.webp",
  },
  "Chanderi Silk saree": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "180+ Products",
    image: "/saree3.webp",
  },
  "Maheswari Silk saree": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "210+ Products",
    image: "/saree4.webp",
  },
  "Kota Doriya Saree": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "380+ Products",
    image: "/saree5.webp",
  },
  "Cotton Suit": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "150+ Products",
    image: "/saree6.webp",
  },
  "Sanganeri Print Fabric": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "160+ Products",
    image: "/saree7.webp",
  },
  "Dabu Print Fabric": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "140+ Products",
    image: "/saree8.webp",
  },
  "Bagru Print": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "130+ Products",
    image: "/saree9.webp",
  },
  "Cotton Suit In Kota": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "170+ Products",
    image: "/saree10.webp",
  },
  "Chanderi Silk Suits": {
    color: "rgb(157 48 137)",
    lightColor: "rgba(157, 48, 137, 0.1)",
    count: "190+ Products",
    image: "/saree11.webp",
  },
}

export default function TopCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`)
        const data = await res.json()
        if (Array.isArray(data.website?.categories)) {
          const categoryNames = data.website.categories.map((cat: any) => cat.name)
          setCategories(categoryNames)
          console.log(categoryNames,"Category Name")
        } else {
          console.warn("Categories not found in response:", data)
          setCategories(["Suits", "Sarees", "Fabrics", "Men's Wear", "Women's Wear", "Accessories"])
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        setCategories(["Suits", "Sarees", "Fabrics", "Men's Wear", "Women's Wear", "Accessories"])
      }
    }
    fetchCategories()
  }, [baseUrl, referenceWebsite])

  return (
    <section className="pt-20 pb-12 border-b-2 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <span
              className="text-sm font-semibold px-6 py-3 underline inline-flex items-center gap-2 "
              // style={{
              //   color: "rgb(157 48 137)",
              //   borderColor: "rgb(157 48 137)",
              // }}
            >
              <Sparkles className="w-4 h-4" />
              Heritage Collections
               <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: "#1B2E4F" }}>
            Our <span style={{ color: "rgb(157 48 137)" }}>Categories</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of traditional wear, each piece crafted with authentic techniques
          </p>
        </div>

        {/* Categories Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((name, index) => {
            const styles = styleMap[name] || {
              color: "rgb(157 48 137)",
              lightColor: "rgba(157, 48, 137, 0.1)",
              count: "100+ Products",
              image: "/saree12.webp",
            }

            return (
              <Link key={name} to={`/category/${name.toLowerCase()}`} className="group block">
                <div
                  className="bg-white rounded-xl border-2 overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                  style={{
                    borderColor: "rgba(157, 48, 137, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgb(157 48 137)"
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(157, 48, 137, 0.15)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(157, 48, 137, 0.1)"
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={styles.image || "/placeholder.svg"}
                      // src={`http://api.jajamblockprints.com${styles.image}`}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Number Badge */}
                    {/* <div className="absolute top-4 left-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                        style={{ background: "rgb(157 48 137)" }}
                      >
                        {index + 1}
                      </div>
                    </div> */}

                    {/* Product Count Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                        style={{
                          background: "rgba(157, 48, 137, 0.9)",
                        }}
                      >
                        {styles.count}
                      </div>
                    </div>

                    {/* Hover Overlay with Arrow */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300"
                        style={{ background: "rgb(157 48 137)" }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Category Name */}
                    <h3
                      className="text-xl font-bold mb-3 group-hover:text-purple-900 transition-colors"
                      style={{ color: "#1B2E4F" }}
                    >
                      {name}
                    </h3>

                    {/* Simple Divider */}
                    <div
                      className="w-12 h-0.5 rounded-full mb-4 transition-all duration-300 group-hover:w-20"
                      style={{ background: "rgb(157 48 137)" }}
                    />

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      Explore our premium collection of {name.toLowerCase()} with authentic craftsmanship and quality
                      materials.
                    </p>

                    {/* Explore Link */}
                    <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      <span style={{ color: "rgb(157 48 137)" }}>Explore Collection</span>
                      <ArrowRight className="ml-2 h-4 w-4" style={{ color: "rgb(157 48 137)" }} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <p className="text-gray-600 font-medium">✨ Handcrafted with Love • Delivered with Care ✨</p>
        </div>
      </div>
    </section>
  )
}
