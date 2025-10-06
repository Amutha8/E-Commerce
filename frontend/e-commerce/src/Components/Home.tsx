import React from "react";
import {
  FaTruck,
  FaCertificate,
  FaTag,
  FaLock,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Contact } from "./Contact";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const PRIMARY_GREEN = "#2E7D32";
const BG_OFF_WHITE = "#FFFFFF";
const BG_CONTAINER_COLOR = "#F5F5F5";

interface ValuePropItemProps {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const ValuePropItem: React.FC<ValuePropItemProps> = ({
  Icon,
  title,
  description,
}) => (
  <motion.div
    className="p-6 bg-white rounded-xl shadow-lg border-b-4"
    style={{ borderColor: PRIMARY_GREEN }}
    whileHover={{ translateY: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <div
      className={`p-3 rounded-full mb-4 inline-block`}
      style={{ backgroundColor: PRIMARY_GREEN }}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

const ECommerceHomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="font-sans min-h-screen"
      style={{ backgroundColor: BG_CONTAINER_COLOR }}
    >
      <Navbar />
      <section className="bg-[#2E7D32]/85 relative w-full overflow-hidden flex justify-center pt-20 pb-10">
        <div
          className="max-w-7xl w-[95%] mx-auto relative shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row"
          style={{ backgroundColor: BG_OFF_WHITE }}
        >
          <motion.div
            className="w-full lg:w-1/2 relative flex justify-center items-end overflow-hidden" // Added overflow-hidden here
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://t3.ftcdn.net/jpg/06/96/50/22/240_F_696502296_BivWdKpo83G668pSBN5sadNmYifVvukX.jpg" // Higher resolution image
              alt="Woman shopping"
              className="absolute top-0 left-0 w-full h-full object-cover" // Fill entire parent container
            />

            <FaStar
              className="absolute text-5xl opacity-80"
              style={{
                color: PRIMARY_GREEN,
                bottom: "2%",
                right: "5%",
                transform: "rotate(15deg)",
                zIndex: 2,
              }}
            />
            <FaStar
              className="absolute text-7xl opacity-80"
              style={{
                color: PRIMARY_GREEN,
                bottom: "20%",
                left: "0%",
                transform: "rotate(-25deg)",
                zIndex: 2,
              }}
            />
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1
              className="text-6xl md:text-7xl font-black leading-tight mb-3 tracking-tighter uppercase"
              style={{ color: PRIMARY_GREEN }}
            >
              ONLINE
            </h1>
            <h1
              className="text-6xl md:text-7xl font-black leading-tight mb-5 tracking-tighter uppercase"
              style={{ color: PRIMARY_GREEN }}
            >
              SHOPPING
            </h1>
            <p
              className="text-xl font-bold mb-4 uppercase tracking-wider"
              style={{ color: PRIMARY_GREEN }}
            >
              LIMITED TIME ONLY
            </p>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Experience high-end shopping. Discover globally sourced,
              **verified products** and enjoy our seamless, secure delivery
              service.
            </p>
            <motion.button
              onClick={() => navigate("/categories")}
              className={`px-8 py-3 bg-[${PRIMARY_GREEN}] text-white font-bold text-lg rounded-md shadow-lg hover:bg-green-700 transition duration-300 w-fit`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHOP NOW
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          Why Choose Our Platform?
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Experience the future of seamless and secure global commerce.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValuePropItem
            Icon={FaTag}
            title="Best Price Guarantee"
            description="Access real-time price comparisons to ensure you always get the best value."
          />
          <ValuePropItem
            Icon={FaCertificate}
            title="Certified Quality"
            description="We partner exclusively with verified sellers known for high-quality goods."
          />
          <ValuePropItem
            Icon={FaTruck}
            title="Priority Shipping"
            description="Choose our express logistics for fast, reliable, and secure worldwide delivery."
          />
          <ValuePropItem
            Icon={FaLock}
            title="Advanced Security"
            description="Shop confidently with fully encrypted payments and purchase protection."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://t4.ftcdn.net/jpg/15/30/45/35/240_F_1530453578_Qt1nMLwKOch7rArFrHggdCDGdCAWgblN.jpg"
              alt="Detailed product packaging"
              className="w-full h-auto object-cover rounded-xl shadow-2xl"
            />
            <div
              className={`absolute top-4 left-4 p-2 rounded-full text-white font-bold text-sm`}
              style={{ backgroundColor: PRIMARY_GREEN }}
            >
              <FaClock className="inline mr-1" /> Limited Stock
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-[#2E7D32] mb-4">
              The Seasonal **Essentials** Collection is Here.
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Hand-picked for durability and style, our new collection features
              exclusive items you won't find anywhere else. Don't miss out on
              quality crafted for modern living.
            </p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex items-center">
                <FaStar
                  className={`mr-2 text-md`}
                  style={{ color: PRIMARY_GREEN }}
                />{" "}
                Exclusive Vendor Access
              </li>
              <li className="flex items-center">
                <FaStar
                  className={`mr-2 text-md`}
                  style={{ color: PRIMARY_GREEN }}
                />{" "}
                Detailed Product Reviews
              </li>
              <li className="flex items-center">
                <FaStar
                  className={`mr-2 text-md`}
                  style={{ color: PRIMARY_GREEN }}
                />{" "}
                Extended Warranty Options
              </li>
            </ul>
            <button
              onClick={() => navigate("/featured")}
              className="px-8 py-3 bg-[#2E7D32] text-white font-semibold rounded-lg shadow-md hover: transition duration-300"
            >
              Shop The Collection
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Explore Our Top-Rated Categories
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Find exactly what you need from our most popular departments.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {["Electronics", "Apparel", "Home Goods", "Health & Beauty"].map(
              (cat, index) => (
                <motion.div
                  key={cat}
                  className="bg-white p-6 rounded-xl shadow-md text-center border-t-4 hover:shadow-lg transition duration-300 cursor-pointer"
                  style={{ borderColor: PRIMARY_GREEN }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    navigate(
                      `/categories/${cat.toLowerCase().replace(/ & /g, "-")}`
                    )
                  }
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <FaTag
                    className={`text-3xl mx-auto mb-3`}
                    style={{ color: PRIMARY_GREEN }}
                  />
                  <p className="font-semibold text-gray-800">{cat}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default ECommerceHomePage;
