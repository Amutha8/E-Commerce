import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const PRIMARY_GREEN = "#2E7D32";

export const Contact = () => {
  const schema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    message: yup.string().required("Message is required"),
  });

  type FormData = {
    firstname: string;
    lastname: string;
    email: string;
    message: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const showSuccessToast = () => {
    toast.success("Feedback Successfully Sent!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const showErrorToast = () => {
    toast.error("Something went wrong. Please try again.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3002/contact/CreateQuery", data);
      showSuccessToast();
      reset();
    } catch (error) {
      showErrorToast();
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl py-16 mx-auto justify-around px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2
              className="text-4xl font-extrabold text-gray-800 mb-4"
              style={{ color: PRIMARY_GREEN }}
            >
              Contact Us
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Got a question or feedback? We’re here to help! Reach out via
              email, phone, or the form — we’ll respond within **24 hours**.
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-700 font-bold flex items-center">
                <span className="text-xl mr-3" style={{ color: PRIMARY_GREEN }}>
                  📧
                </span>
                info@e-commerce.com
              </p>
              <p className="text-gray-700 font-bold flex items-center">
                <span className="text-xl mr-3" style={{ color: PRIMARY_GREEN }}>
                  📞
                </span>
                +91 9876543142
              </p>
              <p className="text-gray-600">
                Our support team is available{" "}
                <strong style={{ color: PRIMARY_GREEN }}>
                  Mon–Sat, 9:00 AM – 6:00 PM
                </strong>
                .
              </p>
            </div>

            <div className="flex gap-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="bg-white shadow-md rounded-full p-4 border flex justify-center items-center h-12 w-12 hover:scale-110 hover:shadow-lg transition group"
              >
                <FaFacebookF className="text-2xl text-blue-600 group-hover:text-blue-700 transition" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="bg-white shadow-md rounded-full p-4 border flex justify-center items-center h-12 w-12 hover:scale-110 hover:shadow-lg transition group"
              >
                <FaWhatsapp className="text-2xl text-green-500 group-hover:text-green-600 transition" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="bg-white shadow-md rounded-full p-4 border flex justify-center items-center h-12 w-12 hover:scale-110 hover:shadow-lg transition group"
              >
                <FaLinkedinIn className="text-2xl text-blue-600 group-hover:text-blue-700 transition" />
              </a>
            </div>
          </div>
          <div className="py-3 order-1 lg:order-2">
            <form
              className="rounded-xl p-8 flex flex-col gap-3 shadow-lg border"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstname")}
                    className="border p-3 w-full shadow-sm rounded-lg focus:outline-none focus:ring-2"
                    style={
                      {
                        borderColor: errors.firstname ? "red" : "#ccc",
                        "--tw-ring-color": PRIMARY_GREEN,
                      } as React.CSSProperties
                    }
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstname?.message}
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastname")}
                    className="border p-3 w-full shadow-sm rounded-lg focus:outline-none focus:ring-2"
                    style={
                      {
                        borderColor: errors.lastname ? "red" : "#ccc",
                        "--tw-ring-color": PRIMARY_GREEN,
                      } as React.CSSProperties
                    }
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastname?.message}
                  </p>
                </div>
              </div>

              <input
                type="text"
                placeholder="Your Email"
                {...register("email")}
                className="border p-3 shadow-sm rounded-lg focus:outline-none focus:ring-2"
                style={
                  {
                    borderColor: errors.email ? "red" : "#ccc",
                    "--tw-ring-color": PRIMARY_GREEN,
                  } as React.CSSProperties
                }
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>

              <textarea
                placeholder="Enter your query here..."
                {...register("message")}
                rows={5}
                className="border p-3 shadow-sm rounded-lg focus:outline-none focus:ring-2"
                style={
                  {
                    borderColor: errors.message ? "red" : "#ccc",
                    "--tw-ring-color": PRIMARY_GREEN,
                  } as React.CSSProperties
                }
              ></textarea>
              <p className="text-red-500 text-sm">{errors.message?.message}</p>

              <button
                className="w-full rounded-full text-white font-semibold p-3 shadow-lg transition-all duration-300 hover:scale-[1.01] mt-2"
                style={{ backgroundColor: PRIMARY_GREEN }}
              >
                Submit Query
              </button>
            </form>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};
