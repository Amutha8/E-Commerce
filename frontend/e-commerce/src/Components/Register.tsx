import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaMailBulk,
  FaLock,
  FaUniversity,
  FaNewspaper,
  FaHackerNews,
  FaAddressBook,
  FaPhoneAlt,
} from "react-icons/fa";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required").min(4).max(15),
  dept: yup.string().required("Department is required"),
  age: yup.string().required("Age is required"),
  rollno: yup.string().required("Roll No is required"),
  phno: yup.string().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
});

type FormData = {
  name: string;
  dept: string;
  email: string;
  password: string;
  age: string;
  rollno: string;
  address: string;
  phno: string;
};

const Registration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3000/auth/signUp", data);
      alert("Registration successful!");
      navigate("/Login");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#2E7D32] to-green-700">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-[95%] max-w-5xl"
      >
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg')",
          }}
        />
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#2E7D32] mb-2 text-center">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Fill in your details to get started 🚀
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className="p-3 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
              />
              <p className="text-red-600 text-sm">{errors.name?.message}</p>
            </div>

            <div className="relative">
              <FaMailBulk className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className="p-3 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
              />
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="p-3 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
              />
              <p className="text-red-600 text-sm">{errors.password?.message}</p>
            </div>

            <div className="relative">
              <FaUniversity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Department"
                {...register("dept")}
                className="p-3 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
              />
              <p className="text-red-600 text-sm">{errors.dept?.message}</p>
            </div>

            <div className="relative">
              <FaNewspaper className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Roll Number"
                {...register("rollno")}
                className="p-3 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
              />
              <p className="text-red-600 text-sm">{errors.rollno?.message}</p>
            </div>

            <div className="relative">
              <FaHackerNews className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Age"
                {...register("age")}
                className="p-3 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
              />
              <p className="text-red-600 text-sm">{errors.age?.message}</p>
            </div>

            <div className="relative md:col-span-2">
              <FaAddressBook className="absolute left-3 top-5 text-gray-500" />
              <textarea
                placeholder="Full Address"
                {...register("address")}
                className="p-3 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
                rows={3}
              />
              <p className="text-red-600 text-sm">{errors.address?.message}</p>
            </div>

            <div className="relative md:col-span-2">
              <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phno")}
                className="p-3 pl-10 w-full rounded-lg border focus:ring-2 focus:ring-[#2E7D32] outline-none"
              />
              <p className="text-red-600 text-sm">{errors.phno?.message}</p>
            </div>

            <div className="md:col-span-2 flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-1/2 py-3 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition-all shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-lg text-white font-semibold bg-[#2E7D32] hover:bg-green-800 transition-all shadow-md"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;
