"use client";
import { motion } from "framer-motion";
import UserProfile from "@/components/UserProfile";
import { useNotifications } from "@/components/NotificationCenter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";

interface UserPreferences {
  emailNotifications: boolean;
  currencyDisplay: "USD" | "EUR" | "GBP";
  theme: "light" | "dark";
}

interface PreferencesResponse {
  success: boolean;
  data: UserPreferences;
}

export default function ProfilePage() {
  const { addNotification } = useNotifications();
  const { user } = useUser();

  // Fetch user preferences
  const { data: preferences, isLoading } = useQuery<PreferencesResponse>({
    queryKey: ["userPreferences"],
    queryFn: () => fetchApi<PreferencesResponse>("/user/preferences"),
    enabled: !!user,
  });

  // Update user preferences mutation
  const { mutate: updatePreferences } = useMutation<
    PreferencesResponse,
    Error,
    Partial<UserPreferences>
  >({
    mutationFn: (newPreferences) =>
      fetchApi("/user/preferences", {
        method: "PUT",
        body: JSON.stringify(newPreferences),
      }),
    onSuccess: () => {
      addNotification("Preferences updated successfully!", "success");
    },
    onError: () => {
      addNotification("Failed to update preferences", "error");
    },
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Account Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Section */}
          <UserProfile />

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Preferences
            </h2>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences?.data.emailNotifications}
                      onChange={(e) =>
                        updatePreferences({
                          ...preferences?.data,
                          emailNotifications: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Currency Display
                  </label>
                  <select
                    value={preferences?.data.currencyDisplay}
                    onChange={(e) =>
                      updatePreferences({
                        ...preferences?.data,
                        currencyDisplay: e.target.value as
                          | "USD"
                          | "EUR"
                          | "GBP",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Security
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => addNotification("2FA is already enabled!", "info")}
            className="w-full px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg flex items-center justify-between"
          >
            <span>Two-Factor Authentication</span>
            <span className="text-sm">Enabled</span>
          </button>
          <button className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-left">
            Change Password
          </button>
          <button className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-left">
            Active Sessions
          </button>
        </div>
      </motion.div>
    </div>
  );
}
