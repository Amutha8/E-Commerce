import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import {
  FaShoppingCart,
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaLock,
  FaMoneyBillWave,
  FaTruck,
  FaRegStickyNote,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PRIMARY_GREEN = "#2E7D32";
const ACCENT_YELLOW = "#FFC107";

interface ProductInCart {
  productId: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  note?: string;
}

interface Cart {
  items: ProductInCart[];
}

const FREE_SHIPPING_THRESHOLD = 500;

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = "0ee6f2e9-22a0-4802-b893-8692104373cb";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get<Cart>(
          `http://localhost:3000/cart/${userId}`
        );
        const initializedItems = data.items.map((item) => ({
          ...item,
          note: item.note || "",
        }));
        setCart({ ...data, items: initializedItems });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load cart data.", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const itemIndex = cart?.items.findIndex(
      (item) => item.productId._id === productId
    );
    if (itemIndex === undefined || itemIndex === -1 || !cart) return;

    const newQuantity = cart.items[itemIndex].quantity + delta;

    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    const updatedItems = cart.items.map((item, index) =>
      index === itemIndex ? { ...item, quantity: newQuantity } : item
    );
    setCart({ items: updatedItems });
    console.log(
      `[API CALL NEEDED] Updating ${productId} to quantity: ${newQuantity}`
    );
  };

  const handleRemoveItem = (productId: string) => {
    if (!cart) return;

    const updatedItems = cart.items.filter(
      (item) => item.productId._id !== productId
    );
    setCart({ items: updatedItems });
    toast.info("Item removed!", { position: "bottom-right" });
    console.log(`[API CALL NEEDED] Removing item: ${productId}`);
  };

  const handleUpdateNote = (productId: string, note: string) => {
    if (!cart) return;

    const updatedItems = cart.items.map((item) =>
      item.productId._id === productId ? { ...item, note: note } : item
    );
    setCart({ items: updatedItems });

    if (note.trim()) {
      toast.success("Note saved!", { position: "top-right", autoClose: 1000 });
    }

    console.log(`[API CALL NEEDED] Updating note for ${productId}: ${note}`);
  };

  const handleCheckout = () => {
    console.log("[API CALL NEEDED] Initiating Checkout...");
    toast.success("Checkout Initiated! (Check console for API details)", {
      position: "top-center",
    });
  };

  const subTotal =
    cart?.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    ) || 0;

  const shipping = subTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25;
  const taxRate = 0.08;
  const taxes = subTotal * taxRate;
  const totalPrice = subTotal + shipping + taxes;
  const progress = Math.min(100, (subTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subTotal;

  const QuantityButton = ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-all duration-200 shadow-md 
                ${
                  disabled
                    ? "text-gray-500 bg-gray-200 cursor-not-allowed"
                    : "text-white hover:bg-green-700 active:scale-90"
                }`}
      style={{ backgroundColor: disabled ? undefined : PRIMARY_GREEN }}
      disabled={disabled}
    >
      {children}
    </button>
  );

  const ItemNote = ({ item }: { item: ProductInCart }) => {
    const [note, setNote] = useState(item.note || "");
    const [isEditing, setIsEditing] = useState(false);

    const saveNote = () => {
      handleUpdateNote(item.productId._id, note);
      setIsEditing(false);
    };

    return (
      <div className="mt-3 text-sm flex items-start">
        <FaRegStickyNote
          className="text-gray-400 mr-2 mt-1 flex-shrink-0"
          size={14}
        />
        {isEditing ? (
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Gift for Mom"
              className="p-1 border border-gray-300 rounded-md focus:ring-2 text-gray-700 w-full"
              style={
                {
                  "--tw-ring-color": ACCENT_YELLOW,
                  borderColor: note.trim() ? PRIMARY_GREEN : "#ccc",
                } as React.CSSProperties
              }
              onBlur={saveNote}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveNote();
              }}
            />
            <button
              onClick={saveNote}
              className="text-xs font-medium mt-1 self-end hover:text-green-700"
              style={{ color: PRIMARY_GREEN }}
            >
              Save Note
            </button>
          </div>
        ) : (
          <p
            className={`text-gray-600 cursor-pointer ${
              note ? "italic font-medium" : "text-gray-400"
            }`}
            onClick={() => setIsEditing(true)}
          >
            {note || "Add a gift/packing note..."}
          </p>
        )}
      </div>
    );
  };

  const FreeShippingProgress = () => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6 shadow-lg">
      {subTotal >= FREE_SHIPPING_THRESHOLD ? (
        <motion.div
          className="flex items-center text-lg font-bold"
          style={{ color: PRIMARY_GREEN }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaTruck className="mr-3 text-2xl animate-bounce" />
          CONGRATS! You unlocked **FREE SHIPPING!**
        </motion.div>
      ) : (
        <>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            <span style={{ color: PRIMARY_GREEN }}>
              ${remainingForFreeShipping.toFixed(2)}
            </span>{" "}
            away from **FREE SHIPPING**!
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className={`h-2.5 rounded-full`}
              style={{ backgroundColor: ACCENT_YELLOW }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F0F4F7" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-10 flex items-center tracking-tight">
            <FaShoppingCart className="mr-4" style={{ color: PRIMARY_GREEN }} />
            Your Shopping Basket
          </h2>

          {loading ? (
            <p className="text-xl text-gray-600">
              Loading your personalized basket...
            </p>
          ) : !cart || cart.items.length === 0 ? (
            <div
              className="text-center p-20 bg-white rounded-2xl shadow-lg border-2 border-dashed"
              style={{ borderColor: ACCENT_YELLOW }}
            >
              <FaShoppingCart
                className="text-6xl mx-auto mb-4"
                style={{ color: ACCENT_YELLOW }}
              />
              <p className="text-2xl font-bold text-gray-700">
                Your basket is looking lonely.
              </p>
              <p className="text-md text-gray-500 mt-2">
                Time to fill it with amazing products!
              </p>
              <a
                href="/"
                className="mt-6 inline-block font-medium text-lg hover:text-green-700"
                style={{ color: PRIMARY_GREEN }}
              >
                Explore Collections &rarr;
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FreeShippingProgress />

                {cart.items.map((item) => (
                  <div
                    key={item.productId._id}
                    className="relative flex flex-col sm:flex-row items-center bg-white p-5 rounded-xl border border-gray-200 transition duration-300 transform hover:-translate-y-0.5"
                    style={{
                      boxShadow: `4px 4px 0 0 ${PRIMARY_GREEN}`,
                    }}
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-28 h-28 object-cover rounded-lg flex-shrink-0 mb-4 sm:mb-0 border border-gray-100"
                    />

                    <div className="ml-0 sm:ml-6 flex-1 text-center sm:text-left">
                      <h3 className="font-extrabold text-xl text-gray-900">
                        {item.productId.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Price:{" "}
                        <span
                          className="font-medium"
                          style={{ color: PRIMARY_GREEN }}
                        >
                          ${item.productId.price.toFixed(2)}
                        </span>
                      </p>

                      <ItemNote item={item} />

                      <div className="flex items-center justify-center sm:justify-start mt-4 space-x-3">
                        <QuantityButton
                          onClick={() =>
                            handleUpdateQuantity(item.productId._id, -1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={10} />
                        </QuantityButton>
                        <span
                          className="font-extrabold text-xl w-8 text-center"
                          style={{ color: PRIMARY_GREEN }}
                        >
                          {item.quantity}
                        </span>
                        <QuantityButton
                          onClick={() =>
                            handleUpdateQuantity(item.productId._id, 1)
                          }
                          disabled={false}
                        >
                          <FaPlus size={10} />
                        </QuantityButton>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col items-center sm:items-end">
                      <p
                        className="font-black text-3xl mb-3"
                        style={{ color: PRIMARY_GREEN }}
                      >
                        ${(item.productId.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.productId._id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center font-bold transition active:scale-95 bg-transparent border-none"
                      >
                        <FaTrashAlt className="mr-1" size={12} /> REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div
                  className="sticky top-24 p-8 bg-white rounded-2xl shadow-2xl border-b-8"
                  style={{ borderColor: ACCENT_YELLOW }}
                >
                  <h3
                    className="text-3xl font-black text-gray-900 mb-6 pb-3 border-b-2"
                    style={{ color: PRIMARY_GREEN, borderColor: PRIMARY_GREEN }}
                  >
                    Order Summary
                  </h3>

                  <div className="space-y-4 text-gray-700 text-lg">
                    <div className="flex justify-between items-center">
                      <span>Subtotal ({cart.items.length} items)</span>
                      <span className="font-semibold">
                        ${subTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping & Handling</span>
                      {shipping === 0 ? (
                        <span
                          className="font-extrabold text-white px-3 py-1 rounded-full text-sm flex items-center shadow-lg"
                          style={{ backgroundColor: PRIMARY_GREEN }}
                        >
                          <FaTruck className="mr-1" /> FREE
                        </span>
                      ) : (
                        <span className="font-semibold">
                          ${shipping.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Estimated Tax</span>
                      <span className="font-semibold">${taxes.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-300">
                    <span className="text-xl font-bold text-gray-900">
                      Grand Total
                    </span>
                    <span
                      className="text-4xl font-black"
                      style={{ color: PRIMARY_GREEN }}
                    >
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-8">
                    <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden">
                      <input
                        type="text"
                        placeholder="Gift card or promo code"
                        className="flex-1 p-3 focus:outline-none text-gray-700"
                      />
                      <button
                        className="px-4 py-3 font-bold text-white transition duration-300 hover:bg-green-700"
                        style={{ backgroundColor: PRIMARY_GREEN }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 flex items-center justify-center text-xl font-extrabold py-4 rounded-lg shadow-xl transition duration-300 active:scale-[0.98]"
                    style={{
                      backgroundColor: ACCENT_YELLOW,
                      color: PRIMARY_GREEN,
                    }}
                  >
                    <FaLock className="mr-3 text-lg" />
                    SECURE CHECKOUT
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center flex items-center justify-center">
                    <FaMoneyBillWave className="mr-1 text-green-600" />
                    All transactions are 256-bit encrypted.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
