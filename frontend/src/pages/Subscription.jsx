/*
PURPOSE:
Subscription page where users can subscribe/unsubscribe to email notifications.
*/

import { useState, useEffect } from "react";
import { subscriptionService } from "../services/subscriptionService";
import toast from "react-hot-toast";
import { Bell, BellOff, Mail, Loader2 } from "lucide-react";


export default function Subscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);

  // Fetch subscription status on component mount
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const data = await subscriptionService.getStatus();
      setIsSubscribed(data.isSubscribed);
      setSubscriptionData(data.subscription);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch status");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSubscription = async () => {
    try {
      setActionLoading(true);

      if (isSubscribed) {
        // Unsubscribe
        const data = await subscriptionService.unsubscribe();
        toast.success(data.message || "Unsubscribed successfully!");
        setIsSubscribed(false);
        setSubscriptionData(null);
      } else {
        // Subscribe
        const data = await subscriptionService.subscribe();
        toast.success(data.message || "Subscribed successfully!");
        setIsSubscribed(true);
        setSubscriptionData(data.subscription);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update subscription"
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`p-4 rounded-full ${
                isSubscribed
                  ? "bg-green-100 dark:bg-green-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              {isSubscribed ? (
                <Bell className="text-green-600 dark:text-green-400" size={32} />
              ) : (
                <BellOff className="text-gray-600 dark:text-gray-400" size={32} />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Email Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Stay updated with new blog posts
              </p>
            </div>
          </div>

          {/* Status Card */}
          <div
            className={`p-6 rounded-lg mb-6 ${
              isSubscribed
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                : "bg-gray-50 dark:bg-gray-700/20 border border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Mail
                className={
                  isSubscribed
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400"
                }
                size={24}
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Current Status
              </h2>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-200 mb-2">
              {isSubscribed ? (
                <span className="font-semibold text-green-600 dark:text-green-400">
                  ✓ Subscribed
                </span>
              ) : (
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                  ✗ Not Subscribed
                </span>
              )}
            </p>

            {isSubscribed && subscriptionData && (
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Email:</strong> {subscriptionData.email}
                </p>
                <p className="mt-1">
                  <strong>Subscribed since:</strong>{" "}
                  {new Date(subscriptionData.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6 text-gray-700 dark:text-gray-300">
            <h3 className="font-semibold mb-2">What you'll receive:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Email notifications when new blog posts are published</li>
              <li>Direct links to read the latest content</li>
              <li>No spam, only quality manhwa content</li>
            </ul>
          </div>

          {/* Toggle Button */}
          <button
            onClick={handleToggleSubscription}
            disabled={actionLoading}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg transition ${
              isSubscribed
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {actionLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </span>
            ) : isSubscribed ? (
              "Unsubscribe"
            ) : (
              "Subscribe Now"
            )}
          </button>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
            You can change your subscription preferences anytime
          </p>
        </div>
      </div>
    </div>
  );
}
