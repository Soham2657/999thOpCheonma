const express = require('express');
const dotenv = require('dotenv');

// Load env variables FIRST before anything else
dotenv.config();

const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require('./middlewares/errorMiddleware');
// Import routes
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();

const app = express();

app.use(cors({
   origin: "https://999th-op-cheonma.vercel.app",
  credentials: true
}));
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/upload", uploadRoutes);
// Error handling middleware
app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
