import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaBirthdayCake,
  FaUniversity,
  FaIdCardAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSave,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  age: string;
  dept: string;
  rollno: string;
  address: string;
  phno: string;
}

interface EditProfileModalProps {
  onClose: () => void;
  onSave: (updatedData: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)._id : null;

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    } else {
      toast.error("User ID not found in local storage.", {
        position: "top-center",
      });
      setIsLoading(false);
    }
  }, [userId]);
  const fetchProfileData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/auth/getProfile/${userId}`
      );
      setFormData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to load profile data for editing.", {
        position: "top-center",
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !formData) return;

    setIsSubmitting(true);

    try {
      await axios.put(`http://localhost:3000/auth/${userId}`, formData);

      toast.success("Profile successfully updated!", {
        position: "top-center",
      });

      const updatedUser = { ...JSON.parse(storedUser!), ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      onSave(formData);
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Failed to save changes.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    icon: Icon,
    required = false,
  }: any) => (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] transition duration-200"
        required={required}
        disabled={isLoading || isSubmitting}
      />
    </div>
  );

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-[#2E7D32] text-white flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Modify Profile Details
          </h1>
          <button
            onClick={onClose}
            className="text-white hover:text-[#CDDC39] transition"
            disabled={isSubmitting}
          >
            <FaTimes size={24} />
          </button>
        </div>
        {isLoading || !formData ? (
          <div className="flex items-center justify-center p-12 text-[#2E7D32]">
            <FaSpinner className="animate-spin text-4xl mr-3" />
            <p className="text-lg">Loading profile data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <p className="text-sm text-gray-600 border-b pb-4 mb-4">
              Edit the fields you wish to update. All changes are verified on
              save.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                icon={FaUserCircle}
                required
              />
              <InputField
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                icon={FaEnvelope}
                required
              />
              <InputField
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                icon={FaBirthdayCake}
              />
              <InputField
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                placeholder="Department"
                icon={FaUniversity}
              />
              <InputField
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                placeholder="Roll No / ID"
                icon={FaIdCardAlt}
              />
              <InputField
                name="phno"
                value={formData.phno}
                onChange={handleChange}
                placeholder="Phone Number"
                icon={FaPhoneAlt}
              />
            </div>

            <InputField
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full Address"
              icon={FaMapMarkerAlt}
            />

            <div className="flex justify-end pt-4 space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center bg-[#2E7D32] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaSave className="mr-2" />
                )}
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EditProfileModal;
