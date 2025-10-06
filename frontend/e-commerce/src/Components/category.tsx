import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import InnerBanner from "./innerBanner";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaSearchPlus,
  FaShapes,
  FaSpinner,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Category {
  _id: string;
  image: string;
  name: string;
  description: string;
}

const PRIMARY_GREEN = "#2E7D32";
const ACCENT_LIME = "#CDDC39";

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get<Category[]>(
          "http://localhost:3000/categories"
        );
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (id: string) => {
    navigate(`/category/${id}`);
  };

  const containerVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  // const cardVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { type: "spring", stiffness: 100, damping: 15 },
  //   },
  // };

  const CategoryCard = ({ category }: { category: Category }) => (
    <motion.div
      //variants={cardVariants}
      onClick={() => handleCategoryClick(category._id)}
      className="bg-white rounded-xl overflow-hidden shadow-xl group flex flex-col transition duration-300 cursor-pointer border-b-8 border-transparent hover:shadow-2xl hover:border-b-8 hover:border-[#CDDC39]"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
          <FaSearchPlus className="text-white text-4xl" />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className={`font-extrabold text-2xl text-[${PRIMARY_GREEN}] line-clamp-1`}
        >
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {category.description}
        </p>
      </div>

      <div
        className={`p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between`}
      >
        <span className="font-semibold text-gray-700 text-sm flex items-center">
          <FaShapes className={`mr-2 text-[${ACCENT_LIME}]`} /> Explore Products
        </span>
        <motion.div
          className={`text-[${PRIMARY_GREEN}] group-hover:text-white group-hover:bg-[${PRIMARY_GREEN}] p-2 rounded-full transition duration-300`}
          whileHover={{ x: 5 }}
        >
          <FaArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <InnerBanner
        name={"Shop by Category"}
        description={
          "Browse our wide range of categories and find the perfect products that suit your style, needs, and lifestyle. There’s something for everyone!"
        }
      />

      <div className="min-h-screen py-12 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-10 border-b-4 border-gray-300 pb-3">
            <span className={`text-[${PRIMARY_GREEN}] mr-2`}></span> Product
            Collections
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <FaSpinner className="animate-spin text-4xl text-[#2E7D32]" />
              <p className="ml-4 text-xl text-gray-600">
                Loading categories...
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.length === 0 ? (
                <p className="text-gray-600 text-2xl text-center p-12 bg-white rounded-xl shadow border-l-8 border-[#CDDC39] col-span-full">
                  😭 No categories found. Please check your backend connection.
                </p>
              ) : (
                categories.map((category) => (
                  <CategoryCard key={category._id} category={category} />
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
