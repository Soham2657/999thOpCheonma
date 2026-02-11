/*
PURPOSE:
Handles all comment-related API calls.
*/

import api from "./api";

export const commentService = {
  getCommentsByBlog: async (blogId) => {
    const res = await api.get(`/comments/${blogId}`);
    return res.data.comments;
  },

  addComment: async (blogId, data) => {
    const res = await api.post(`/comments/`, { blogId, ...data });
    return res.data.comment;
  },

  deleteComment: async (commentId) => {
    const res = await api.delete(`/comments/${commentId}`);
    return res.data;
  },
};