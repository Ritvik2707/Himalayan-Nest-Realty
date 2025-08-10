"use client";
import { useState } from "react";
import Image from "next/image";

// Search Section with Location, Category, Budget Input
const SearchSection = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="hero bg-gray-100 py-10 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Find Your Dream Property</h1>
      <p className="mb-6 text-lg">Search properties by location, category, budget and more.</p>

      <div className="tabs mb-6">
        <button
          className={`px-6 py-2 ${activeTab === "buy" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
          onClick={() => handleTabChange("buy")}
        >
          Buy
        </button>
        <button
          className={`px-6 py-2 ${activeTab === "rent" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded ml-2`}
          onClick={() => handleTabChange("rent")}
        >
          Rent
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter location..."
          className="border rounded px-4 py-2 w-64"
        />
        <select className="border rounded px-4 py-2 w-48">
          <option value="">Select Category</option>
          <option value="flat">Flat</option>
          <option value="plot">Plot</option>
          <option value="pg">PG</option>
          <option value="house">House</option>
          <option value="commercial">Commercial</option>
        </select>
        <input
          type="number"
          placeholder="Your Budget (in ₹)"
          className="border rounded px-4 py-2 w-48"
        />
        <input
          type="text"
          placeholder="Search by keywords..."
          className="border rounded px-4 py-2 w-64"
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Search</button>
      </div>
    </section >
  )
}

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <div>
      <SearchSection />

      {/* Featured Listings */}
      <section className="featured py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example featured cards */}
          <div className="border rounded shadow p-4">
            <Image src="/images/flat.jpg" alt="Flat" width={300} height={200} className="rounded mb-2" />
            <h3 className="font-bold">2 BHK Flat for Rent</h3>
            <p>Roorkee • ₹12,000/month</p>
          </div>
          <div className="border rounded shadow p-4">
            <Image src="/images/plot.jpg" alt="Plot" width={300} height={200} className="rounded mb-2" />
            <h3 className="font-bold">Residential Plot for Sale</h3>
            <p>Dehradun • ₹25 Lakh</p>
          </div>
          <div className="border rounded shadow p-4">
            <Image src="/images/PG.jpg" alt="PG" width={300} height={200} className="rounded mb-2" />
            <h3 className="font-bold">PG Accommodation</h3>
            <p>Haridwar • ₹5,000/month</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories py-10 px-4 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {["Flat", "Plot", "PG", "House", "Commercial"].map((cat) => (
            <button key={cat} className="bg-white border px-6 py-3 rounded shadow hover:bg-blue-100">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Top Cities */}
      <section className="cities py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6">Top Cities</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {["Roorkee", "Haridwar", "Dehradun", "Saharanpur", "Rishikesh", "Nainital"].map((city) => (
            <span key={city} className="bg-blue-50 px-5 py-2 rounded-full text-blue-700 font-medium">
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us py-10 px-4 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Himalayan Nest?</h2>
        <ul className="list-disc list-inside max-w-xl mx-auto text-left">
          <li>Verified listings and trusted dealers</li>
          <li>Easy location-based search</li>
          <li>Wide range of property categories</li>
          <li>Support for buyers, renters, and dealers</li>
          <li>Local expertise in Uttarakhand & nearby cities</li>
        </ul>
      </section>

      {/* Dealer Call-to-Action */}
      <section className="dealer-cta py-10 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Are you a dealer?</h2>
        <p className="mb-4">List your properties with Himalayan Nest and reach thousands of buyers & renters.</p>
        <button className="bg-green-600 text-white px-8 py-3 rounded font-bold hover:bg-green-700">
          List Your Property
        </button>
      </section>
    </div>
  );
}