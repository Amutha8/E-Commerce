import { motion } from "framer-motion";
import { FaAngleDoubleRight } from "react-icons/fa";

interface InnerBannerProps {
  name: string;
  description: string;
  btnText?: string;
  imageUrls?: string;
  onClick?: () => void;
}

const PRIMARY_GREEN = "#2E7D32";
const ACCENT_LIME = "#CDDC39";

function InnerBanner({
  name,
  description,
  btnText,
  onClick,
  imageUrls,
}: InnerBannerProps) {
  const defaultImage =
    "https://cdn.pixabay.com/photo/2016/11/19/15/04/laptop-1839732_1280.jpg";

  const bgImage = imageUrls || defaultImage;
  const isSolidColorBackground = !bgImage;

  return (
    <div
      className="relative py-24 px-4 md:px-8 min-h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: isSolidColorBackground ? "none" : `url(${bgImage})`,
        backgroundColor: isSolidColorBackground ? PRIMARY_GREEN : "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: isSolidColorBackground
            ? "transparent"
            : `${PRIMARY_GREEN}CC`,
          borderBottom: `8px solid ${ACCENT_LIME}`,
        }}
      />

      <div className="max-w-7xl w-full mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          className="w-full max-w-4xl text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold leading-snug drop-shadow-md tracking-tight">
            {name}
          </h2>
          <motion.p
            className="mt-6 text-xl md:text-2xl font-light opacity-95 leading-relaxed max-w-3xl mx-auto border-t pt-4 border-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {description}
          </motion.p>
          {btnText && (
            <motion.button
              onClick={onClick}
              className={`mt-10 px-10 py-3 bg-[${ACCENT_LIME}] text-[${PRIMARY_GREEN}] font-bold text-lg rounded-full shadow-2xl transition duration-300 flex items-center justify-center hover:bg-yellow-500`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {btnText}
              <FaAngleDoubleRight className="ml-3" size={18} />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default InnerBanner;
