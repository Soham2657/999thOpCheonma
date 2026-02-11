/*
PURPOSE:
Handles API calls related to subscription/notifications.
*/
import api from "./api";

export const subscriptionService = {
  // Get current subscription status
  getStatus: async () => {
    const res = await api.get("/notifications/status");
    return res.data;
  },

  // Subscribe to notifications
  subscribe: async () => {
    const res = await api.post("/notifications/subscribe");
    return res.data;
  },

  // Unsubscribe from notifications
  unsubscribe: async () => {
    const res = await api.post("/notifications/unsubscribe");
    return res.data;
  },
};
