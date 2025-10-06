import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaShoppingCart, FaBoxOpen, FaUsers, FaChartLine } from 'react-icons/fa';


interface Category {
  id: number;
  name: string;
  description: string;
  image: string; 
}

interface CategoryBannerProps {
  id: string|undefined; 
}



const CategoryBanner: React.FC<CategoryBannerProps> = ({ id }) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ecommercePoints = [
    { text: "Explore Top-Rated Products", Icon: FaShoppingCart },
    { text: "View Real-Time Inventory", Icon: FaBoxOpen },
    { text: "Read Verified Customer Reviews", Icon: FaUsers },
    { text: "Discover Trending Deals", Icon: FaChartLine },
  ];

  
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<Category>(
          `http://localhost:3000/categories/${id}`
        );
        console.log(data);
        
        setCategory(data);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to load category details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Loading category banner...</p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="flex justify-center items-center h-48 bg-red-100 border border-red-400 text-red-700 rounded-lg p-4">
        <p>{error || "Category not found."}</p>
      </div>
    );
  }

 
  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center">

        <div className="lg:w-1/2 p-4 ">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {category.name}
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            {category.description || "Discover the latest and greatest products in this category. We've curated a selection of items to meet all your needs and desires."}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {ecommercePoints.map((point, index) => (
              <div key={index} className="flex items-center space-x-3">
                <point.Icon className="h-6 w-6 text-[#AED581]" />
                <span className="text-base ">
                  {point.text}
                </span>
              </div>
            ))}
          </div>

         <button className="px-8 py-3 text-lg font-semibold rounded-full text-gray-900 bg-[#AED581] transition duration-300">
            Shop Now
          </button>
          
         <p className="text-sm text-gray-500 mt-4">
            Free shipping on orders over ₹500
          </p>
        </div>

        <div className="lg:w-1/2 p-4 flex justify-center items-center relative">
          <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
            <div className="w-full h-full bg-gradient-to-br from-purple-800/50 to-indigo-900/50 opacity-50 blur-xl"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-md h-96">
            <img
              src={category.image}
              alt={`${category.name} category`}
              className="w-full h-full object-cover rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-500 ease-in-out"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/600x400.png?text=Category+Image';
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;