import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthenticationContext } from "./Authcontext";
import { ToastContainer, toast } from "react-toastify";
import { FaLock, FaMailBulk } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthenticationContext);
  const navigate = useNavigate();

  if (!authContext) return <p>Please log in.</p>;
  const { login } = authContext;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const showSuccessToast = () => {
    toast.success("Login Successfully", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  };

  const showErrorToast = () => {
    toast.error("Invalid username or password", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response.data) throw new Error("Invalid credentials");

      login(response.data.user, response.data.token);

      showSuccessToast();
      if (response.data.user.role === "admin") navigate("/Admindashboard");
      else navigate("/home");
    } catch (error: any) {
      console.error("Login Error:", error.message);
      showErrorToast();
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#2E7D32] via-green-700 to-green-900 relative overflow-hidden">
        <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-5"></div>
        <div className="absolute w-96 h-96 bg-green-500/30 rounded-full blur-3xl bottom-10 right-10"></div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-[90%] max-w-4xl"
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="hidden md:flex w-1/2 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg')",
            }}
          />
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
            <p className="text-sm text-gray-400 uppercase tracking-widest text-center mb-2">
              E-Commerce Pro
            </p>
            <h2 className="text-3xl font-bold text-[#2E7D32] mb-2 text-center">
              Welcome Back 👋
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Login to continue exploring our courses and products
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Enter Email"
                    {...register("email")}
                    className="p-4 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
                  />
                  <p className="text-red-600 text-sm">
                    {errors.email?.message}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Enter Password"
                    className="p-4 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </span>
                  <p className="text-red-600 text-sm">
                    {errors.password?.message}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="accent-[#2E7D32]" />
                  Remember Me
                </label>
                <button
                  type="button"
                  className="text-sm text-[#2E7D32] hover:underline"
                >
                  Forgot Password?
                </button>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #2E7D32" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 rounded-lg text-white font-semibold bg-[#2E7D32] hover:bg-green-800 transition-all"
              >
                Login
              </motion.button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don’t have an account?{" "}
              <button
                className="text-[#2E7D32] font-semibold hover:underline"
                onClick={() => navigate("/sign-up")}
              >
                Register here
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <ToastContainer />
    </>
  );
};
