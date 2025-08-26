"use client"

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#9d3089] mb-6">About Us</h1>
        <div className="w-24 h-1.5 bg-[#9d3089] mx-auto rounded-full"></div>
      </div>

      {/* Shree Shyam Block Prints Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        {/* Image */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl transition-all hover:shadow-2xl">
          <img
            src="/8.jpeg"
            alt="Artisan working on block printing"
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <p className="text-sm font-medium">Master Artisan at Work</p>
            <p className="text-xs opacity-80">Traditional Block Printing Since 1981</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-[#9d3089]/10 text-[#9d3089] px-4 py-2 rounded-full text-sm font-semibold">
                Est. 1981 | Handcrafted in Rajasthan
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#9d3089]">Shree Shyam Block Prints</h2> 
            <p className="text-lg text-gray-700 leading-relaxed">
              For more than 40 years, Shree Shyam Block Prints has been keeping India’s textile traditions alive. Started in 1981 by <strong>Ram Vinod Shukla</strong>, we are a family-run production unit in Rajasthan, known for hand block printing styles like Bagru, Dabu, and Sanganeri.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every product is carefully handmade by skilled artisans, using age-old methods passed down through generations. Our aim is to keep tradition alive by creating sustainable, high-quality fabrics.
            </p>
          </div>
        </div>
      </div>

      {/* Jajam Block Prints Section */}
      <div className="bg-gradient-to-r from-[#9d3089]/5 to-purple-50 rounded-3xl p-8 md:p-12 mb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#9d3089]">
                Jajam Block Prints
                <span className="block text-lg font-normal text-gray-600 mt-2">A Sub-Brand by Shree Shyam</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To expand our legacy, we're excited to introduce Jajam Block Prints — a fresh, contemporary sub-brand
                designed for the modern lifestyle. Named after the traditional floor spreads of Rajasthan, Jajam brings
                the same authenticity and heritage in a more modern, design-forward format.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're looking for handcrafted apparel, home furnishings, or custom textiles, Jajam Block Prints
                blends traditional techniques with contemporary style—made with heart, for you.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/1.jpeg"
              alt="Jajam Block Prints modern designs"
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <p className="text-sm font-medium">Contemporary Designs</p>
              <p className="text-xs opacity-80">Traditional Craft, Modern Appeal</p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Stand For Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#9d3089] mb-4">What We Stand For</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our commitment to authenticity, sustainability, and artisan craftsmanship drives everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 shadow-lg">
              <img
                src="/4.jpeg"
                alt="In-house production"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-sm font-bold">100% In-House</h3>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#9d3089] mb-3">100% In-House Production</h3>
            <p className="text-gray-600 text-sm">Complete control over quality from start to finish</p>
          </div>

          <div className="text-center group">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 shadow-lg">
              <img
                src="/6.jpeg"
                alt="Natural dyes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-sm font-bold">Natural Dyes</h3>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#9d3089] mb-3">Natural Dyes & Sustainable Practices</h3>
            <p className="text-gray-600 text-sm">Eco-friendly processes that respect our environment</p>
          </div>

          <div className="text-center group">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 shadow-lg">
              <img
                src="/5.jpeg"
                alt="Artisan craftsmanship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-sm font-bold">Authentic Craft</h3>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#9d3089] mb-3">Authentic Artisan Craftsmanship</h3>
            <p className="text-gray-600 text-sm">Skills passed down through generations of master craftsmen</p>
          </div>

          <div className="text-center group">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 shadow-lg">
              <img
                src="/12.jpeg"
                alt="Rajasthan heritage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-sm font-bold">Heritage</h3>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#9d3089] mb-3">Rooted in Rajasthan's Textile Heritage</h3>
            <p className="text-gray-600 text-sm">Preserving centuries-old traditions for future generations</p>
          </div>
        </div>
      </div>

      {/* Techniques & Products Info */}
      <div className="bg-[#f9f4f8] rounded-xl p-8 mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-[#9d3089] mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Traditional Techniques
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Bagru Block Print
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Dabu Printing
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Sanganeri Technique
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Natural Dye Printing
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Handcrafted Textiles
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#9d3089] mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Our Products
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Handcrafted Apparel
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Home Furnishings
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Custom Textiles
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Cotton Sarees
              </li>
              <li className="flex items-start">
                <svg
                  className="w-4 h-4 mt-0.5 mr-2 text-[#9d3089]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Block Printed Kurtis
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="text-center py-12 bg-gradient-to-r from-[#9d3089]/10 to-purple-100 rounded-2xl">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#9d3089] mb-4">Thank you for supporting handmade.</h2>
          <p className="text-xl md:text-2xl font-semibold text-gray-700">Thank you for supporting Indian artisans.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9d3089] mb-2">40+</div>
              <div className="text-gray-600">Years of Heritage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9d3089] mb-2">100%</div>
              <div className="text-gray-600">In-House Production</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9d3089] mb-2">3</div>
              <div className="text-gray-600">Traditional Techniques</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
