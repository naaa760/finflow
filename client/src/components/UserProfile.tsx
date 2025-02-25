"use client";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function UserProfile() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Profile Settings
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Image
            src={user?.imageUrl || "/default-avatar.png"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {user?.fullName}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        {/* Profile fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Display Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              defaultValue={user?.fullName || ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* Add more profile fields as needed */}
        </div>
      </div>
    </motion.div>
  );
}
