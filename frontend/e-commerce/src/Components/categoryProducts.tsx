import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import CategoryBanner from "./categoryBanner";
import {
  FaShoppingCart,
  FaSearchPlus,
  FaTimes,
  FaSpinner,
  FaTag,
  FaStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  categoryId: string;
}

const PRIMARY_GREEN = "#2E7D32";
const ACCENT_LIME = "#CDDC39";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const userId = "0ee6f2e9-22a0-4802-b893-8692104373cb";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>(
          `http://localhost:3000/products/by-category?categoryId=${id}`
        );
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products for this category.", {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const handleAddToCart = async (productId: string, productName: string) => {
    try {
      await axios.post("http://localhost:3000/cart", {
        userId: userId,
        productId,
        quantity: 1,
      });

      toast.success(`'${productName}' added to cart!`, {
        position: "bottom-right",
      });
    } catch (err) {
      console.error(err);
      toast.error(`Could not add '${productName}' to cart.`, {
        position: "bottom-right",
      });
    }
  };

  const gridContainerVariants = {
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContent = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 15 },
    },
    exit: { opacity: 0, scale: 0.7 },
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      //variants={cardVariants}
      className="bg-white rounded-xl overflow-hidden shadow-xl group flex flex-col transition duration-300 hover:shadow-2xl border-l-4 border-transparent hover:border-l-4 hover:border-[#CDDC39]"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.05]" // Use CONTAIN to ensure full image view
        />

        <button
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30"
          onClick={() => setSelectedProduct(product)}
          aria-label={`Quick view of ${product.name}`}
        >
          <FaSearchPlus
            className={`text-white text-3xl p-3 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white hover:bg-[${ACCENT_LIME}] transition`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-extrabold text-lg text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          <FaTag className={`mr-2 text-xl text-[${ACCENT_LIME}]`} />
          <span className={`font-extrabold text-xl text-[${PRIMARY_GREEN}]`}>
            ${product.price.toFixed(2)}
          </span>
        </div>

        <motion.button
          className={`flex items-center bg-[${PRIMARY_GREEN}] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 hover:bg-green-700 active:scale-95`}
          onClick={() => handleAddToCart(product._id, product.name)}
          whileHover={{ scale: 1.05 }}
        >
          <FaShoppingCart className="mr-2" size={14} />
          ADD
        </motion.button>
      </div>
    </motion.div>
  );

  const QuickViewModal = ({
    product,
    onClose,
  }: {
    product: Product;
    onClose: () => void;
  }) => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-4"
      variants={modalBackdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full flex flex-col lg:flex-row"
        //variants={modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10"
          onClick={onClose}
          aria-label="Close image preview"
        >
          <FaTimes size={20} />
        </button>

        <div className="w-full lg:w-1/2 h-80 lg:h-auto flex items-center justify-center  rounded-xl overflow-hidden mb-6 lg:mb-0 lg:mr-6">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {product.name}
            </h2>
            <p className="text-2xl font-black text-gray-800 flex items-center mb-4 border-b pb-2 border-gray-200">
              <FaStar className={`mr-2 text-[${ACCENT_LIME}]`} /> $
              {product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>
          </div>

          <button
            className={`w-full flex items-center justify-center mt-6 bg-[${PRIMARY_GREEN}] text-white font-bold py-3 rounded-lg shadow-xl hover:bg-green-700 transition duration-300`}
            onClick={() => {
              handleAddToCart(product._id, product.name);
              onClose();
            }}
          >
            <FaShoppingCart className="mr-3" />
            ADD TO CART IMMEDIATELY
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <Navbar />

      <div className="min-h-[250px] p-12 bg-[#2E7D32]  ">
        <CategoryBanner id={id} />
      </div>

      <div className="min-h-screen py-12 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-10 border-b-4 border-gray-300 pb-3">
            <span className={`text-[${PRIMARY_GREEN}] mr-2`}></span> Featured
            Collection
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <FaSpinner className="animate-spin text-4xl text-[#2E7D32]" />
              <p className="ml-4 text-xl text-gray-600">
                Loading quality products...
              </p>
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-600 text-2xl text-center p-12 bg-white rounded-xl shadow border-l-8 border-[#CDDC39]">
              Oops! No items are currently available in this category.
            </p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
      <ToastContainer />
    </>
  );
}
