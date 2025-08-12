"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchProperties } from "../handlers/PropertyHandlers";

// Hero Section with Search
const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchData, setSearchData] = useState({
    location: '',
    category: '',
    budget: '',
    keywords: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = async () => {
    setIsSearching(true);

    try {
      const searchParams = {
        ...searchData,
        purpose: activeTab
      };

      // Create URL parameters for navigation
      const urlParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && value !== '') {
          urlParams.append(key, value);
        }
      });

      // Navigate to properties page with search parameters
      router.push(`/properties?${urlParams.toString()}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Find Your Dream Property
            <span className="block text-green-200 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 sm:mt-2">
              in the Heart of Uttarakhand
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Discover beautiful properties in Roorkee, Haridwar, Dehradun, and across the stunning landscapes of Uttarakhand
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto">
          {/* Buy/Rent Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-xl p-2 flex">
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "buy"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-green-600"
                  }`}
                onClick={() => handleTabChange("buy")}
              >
                Buy Property
              </button>
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "rent"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-green-600"
                  }`}
                onClick={() => handleTabChange("rent")}
              >
                Rent Property
              </button>
            </div>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Enter city or area..."
                value={searchData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Property Type</label>
              <select
                value={searchData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              >
                <option value="">All Types</option>
                <option value="flat">Flat/Apartment</option>
                <option value="house">House/Villa</option>
                <option value="plot">Plot/Land</option>
                <option value="pg">PG/Hostel</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Budget {activeTab === 'rent' ? '(per month)' : ''}
              </label>
              <input
                type="number"
                placeholder={activeTab === 'rent' ? "Your Monthly Budget (in ₹)" : "Your Budget (in ₹)"}
                value={searchData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Keywords</label>
              <input
                type="text"
                placeholder="2BHK, furnished, parking..."
                value={searchData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className={`bg-green-600 hover:bg-green-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${isSearching ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {isSearching ? 'Searching...' : 'Search Properties'}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          <div className="bg-white bg-opacity-10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-green-200">500+</div>
            <div className="text-xs sm:text-sm text-green-100">Properties Listed</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-green-200">100+</div>
            <div className="text-xs sm:text-sm text-green-100">Happy Customers</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-green-200">6</div>
            <div className="text-xs sm:text-sm text-green-100">Cities Covered</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-green-200">5+</div>
            <div className="text-xs sm:text-sm text-green-100">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Properties Section
const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Modern 2 BHK Flat",
      location: "Civil Lines, Roorkee",
      price: "₹12,000/month",
      originalPrice: "₹15,000/month",
      purpose: "Rent",
      image: "/images/flat.jpg",
      features: ["2 BHK", "Furnished", "Parking", "24/7 Security"],
      rating: 4.5,
      isNew: true
    },
    {
      id: 2,
      title: "Premium Residential Plot",
      location: "Shivalik Nagar, Dehradun",
      price: "₹25 Lakh",
      originalPrice: "₹28 Lakh",
      purpose: "Sale",
      image: "/images/plot.jpg",
      features: ["120 Sq Yd", "Corner Plot", "Clear Title", "Road Facing"],
      rating: 4.7,
      isNew: false
    },
    {
      id: 3,
      title: "Comfortable PG Accommodation",
      location: "Near Har Ki Pauri, Haridwar",
      price: "₹5,000/month",
      originalPrice: "₹6,000/month",
      purpose: "Rent",
      image: "/images/PG.jpg",
      features: ["Single Room", "Meals Included", "WiFi", "Laundry"],
      rating: 4.3,
      isNew: true
    },
    {
      id: 4,
      title: "Spacious 3 BHK House",
      location: "Rishikesh",
      price: "₹45 Lakh",
      originalPrice: "₹50 Lakh",
      purpose: "Sale",
      image: "/images/house.jpg",
      features: ["Garden", "Parking", "Modular Kitchen", "Near Ganga"],
      rating: 4.8,
      isNew: false
    },
    {
      id: 5,
      title: "Luxury 2 BHK Flat",
      location: "Roorkee",
      price: "₹15,000/month",
      originalPrice: "₹18,000/month",
      purpose: "Rent",
      image: "/images/flat.jpg",
      features: ["Swimming Pool", "Gym", "Clubhouse", "24/7 Security"],
      rating: 4.6,
      isNew: true
    },
    {
      id: 6,
      title: "Commercial Plot for Sale",
      location: "Dehradun",
      price: "₹80 Lakh",
      originalPrice: "₹90 Lakh",
      purpose: "Sale",
      image: "/images/plot.jpg",
      features: ["Main Road Facing", "High Footfall", "Clear Title"],
      rating: 4.9,
      isNew: false
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Featured Properties</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Handpicked properties offering the best value and prime locations across Uttarakhand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Image Container */}
              <div className="relative">
                <Image
                  src={property.image}
                  alt={property.title}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.isNew && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      New
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${property.purpose === 'Rent' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                    For {property.purpose}
                  </span>
                </div>

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">{property.title}</h3>
                  <div className="flex items-center ml-2">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs sm:text-sm text-gray-600">{property.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm">{property.location}</span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.features.map((feature, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-green-600">{property.price}</span>
                    {property.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">{property.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button className="flex-1 bg-green-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm sm:text-base">
                    View Details
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/properties"
            className="inline-flex items-center bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Properties
            <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Property Categories Section
const PropertyCategories = () => {
  const categories = [
    {
      name: "Apartments & Flats",
      icon: "🏢",
      description: "Modern apartments with all amenities",
      count: "150+ Properties",
      color: "bg-blue-500"
    },
    {
      name: "Independent Houses",
      icon: "🏠",
      description: "Spacious houses with gardens",
      count: "80+ Properties",
      color: "bg-green-500"
    },
    {
      name: "Residential Plots",
      icon: "🏞️",
      description: "Prime plots for your dream home",
      count: "120+ Properties",
      color: "bg-purple-500"
    },
    {
      name: "PG & Hostels",
      icon: "🏨",
      description: "Comfortable accommodation for students",
      count: "60+ Properties",
      color: "bg-orange-500"
    },
    {
      name: "Commercial Spaces",
      icon: "🏪",
      description: "Offices, shops, and business spaces",
      count: "90+ Properties",
      color: "bg-red-500"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Browse by Category</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Find the perfect property type that matches your needs and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-200">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{category.description}</p>
                <span className="text-green-600 font-medium text-xs sm:text-sm">{category.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Popular Cities Section
const PopularCities = () => {
  const cities = [
    {
      name: "Roorkee",
      properties: "180+",
      image: "/images/roorkee.jpg",
      description: "Home to IIT Roorkee, perfect for students and professionals"
    },
    {
      name: "Haridwar",
      properties: "120+",
      image: "/images/haridwar.jpg",
      description: "Holy city with spiritual significance and growing infrastructure"
    },
    {
      name: "Dehradun",
      properties: "200+",
      image: "/images/dehradun.jpg",
      description: "Capital city with excellent connectivity and modern amenities"
    },
    {
      name: "Rishikesh",
      properties: "90+",
      image: "/images/rishikesh.jpg",
      description: "Yoga capital with serene environment and river views"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Popular Cities</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Explore properties in the most sought-after cities of Uttarakhand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cities.map((city, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <Image
                  src={city.image}
                  alt={city.name}
                  width={300}
                  height={200}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">{city.name}</h3>
                  <p className="text-green-200 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{city.properties} Properties</p>
                  <p className="text-xs sm:text-sm text-gray-200">{city.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUs = () => {
  const features = [
    {
      icon: "🔍",
      title: "Verified Listings",
      description: "All properties are verified and authenticated by our expert team"
    },
    {
      icon: "🎯",
      title: "Local Expertise",
      description: "Deep knowledge of Uttarakhand property market and regulations"
    },
    {
      icon: "🤝",
      title: "Trusted Partners",
      description: "Network of reliable builders, agents, and legal advisors"
    },
    {
      icon: "📱",
      title: "Easy Search",
      description: "Advanced filters and smart search to find your perfect property"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries"
    },
    {
      icon: "📋",
      title: "Legal Assistance",
      description: "Complete documentation and legal support for smooth transactions"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose Himalayan Nest?</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            We make property buying, selling, and renting simple, transparent, and hassle-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl group-hover:bg-green-200 transition-colors duration-300 group-hover:scale-110 transform">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Section
const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
        <p className="text-xl text-green-100 mb-12 leading-relaxed">
          Join thousands of satisfied customers who found their perfect home with Himalayan Nest.
          Whether you&apos;re buying, selling, or renting, we&apos;re here to help you every step of the way.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link
            href="/properties"
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse Properties
          </Link>
          <span className="text-green-200 hidden md:block">or</span>
          <Link
            href="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
          >
            List Your Property
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-green-500">
          <p className="text-green-200 mb-4">
            For property owners and dealers
          </p>
          <p className="text-lg">
            <span className="font-semibold">List your properties for FREE</span> and reach thousands of potential buyers and renters
          </p>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProperties />
      <PropertyCategories />
      <PopularCities />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
}