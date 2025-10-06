import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import {
  FaUserTag,
  FaEnvelopeOpenText,
  FaIdBadge,
  FaMapMarkerAlt,
  FaPhoneVolume,
  FaEdit,
  FaRegCalendarAlt,
  FaStarOfLife,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import { ToastContainer } from "react-toastify"; // Ensure ToastContainer is available
import EditProfileModal from "./EditProfile";

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

const ProfileDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)._id : null;

  useEffect(() => {
    if (userId) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/auth/getProfile/${userId}`
      );
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedData: User) => {
    setUser(updatedData);
    setIsEditing(false);
  };

  if (!userId)
    return (
      <div className="min-h-screen bg-[#1D3A1F] flex items-center justify-center">
        <p className="p-8 bg-red-800 text-white rounded-lg shadow-2xl">
          User not logged in. Access restricted.
        </p>
      </div>
    );

  if (loading || !user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1D3A1F]">
        <div className="flex flex-col items-center space-y-3 text-white">
          <FaStarOfLife className="animate-spin text-4xl text-[#CDDC39]" />
          <p className="text-xl">Establishing secure connection...</p>
        </div>
      </div>
    );

  const DataModule = ({
    icon: Icon,
    label,
    value,
    delay,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    delay: number;
  }) => (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border-l-4 border-[#CDDC39] h-full"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + delay }}
    >
      <div className="flex items-center space-x-4">
        <Icon className="text-3xl text-[#CDDC39] flex-shrink-0" />
        <div>
          <span className="text-sm font-light text-gray-400 uppercase tracking-widest">
            {label}
          </span>
          <p className="text-xl font-bold text-white mt-1 break-words">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-24 px-4 relative overflow-hidden bg-[#1D3A1F] transition-colors duration-500">
        <motion.div
          className="max-w-7xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DataModule
                icon={FaEnvelopeOpenText}
                label="Primary Email"
                value={user.email}
                delay={0.0}
              />
              <DataModule
                icon={FaPhoneVolume}
                label="Contact Number"
                value={user.phno}
                delay={0.1}
              />
              <DataModule
                icon={FaIdBadge}
                label="Roll Number"
                value={user.rollno}
                delay={0.2}
              />
              <DataModule
                icon={FaRegCalendarAlt}
                label="Age Status"
                value={`${user.age} Years Old`}
                delay={0.3}
              />
            </div>

            <motion.div
              className="bg-gray-800/80 p-6 rounded-xl shadow-lg flex flex-col justify-between"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div>
                <div className="w-24 h-24 mx-auto rounded-full bg-[#2E7D32] border-4 border-[#CDDC39] flex items-center justify-center mb-4">
                  <FaUserTag className="text-4xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  System User ID: {userId.substring(0, 8)}...
                </p>
              </div>
              <div className="mt-4 text-center">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#CDDC39] text-[#2E7D32]">
                  Verified Profile
                </span>
              </div>
            </motion.div>
          </div>

          <DataModule
            icon={FaMapMarkerAlt}
            label="Registered Address"
            value={user.address}
            delay={0.5}
          />

          <div className="flex justify-center mt-12">
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(205, 220, 57, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-[#CDDC39] text-[#2E7D32] font-extrabold px-10 py-4 rounded-full text-lg shadow-xl transition duration-300 transform"
              >
                <FaEdit className="mr-3" />
                INITIATE PROFILE EDIT
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <EditProfileModal
            onClose={() => setIsEditing(false)}
            onSave={handleProfileUpdate}
          />
        )}
      </AnimatePresence>
      <ToastContainer />
    </>
  );
};

export default ProfileDashboard;
