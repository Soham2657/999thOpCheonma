

/*
PURPOSE:
Hero section for Home page.
It shows a full-screen background image slider with smooth fade transition.

FEATURES:
- Auto slide every few seconds
- Smooth fade-in/out animation using framer-motion
- Manual dots to switch slides
- Dark overlay so text is readable
*/

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import slide1 from "../../assets/hero/slide1.png";
import slide2 from "../../assets/hero/slide2.jpg";
import slide3 from "../../assets/hero/slide3.jpg";


export default function ImageSliderHero() {
  
  const slides = [
    {
      id: 1,
      image: slide1,
      title: "Welcome to the greatest Cheonmas Archive",
      subtitle: "Latest Manhwa Updates, Reviews & Community Discussions",
    },
    {
      id: 2,
      image: slide2,
      title: "Stay Updated",
      subtitle: "Get notified whenever a new blog is posted.",
    },
    {
      id: 3,
      image: slide3,
      title: "Search by Manhwa",
      subtitle: "Find your favorite manhwa blogs instantly.",
    },
  ];

  // Stores which slide is currently active
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide logic (runs every 4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      {/* AnimatePresence helps animate slide exit + entry */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].id} // key changes => animation triggers
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
        >
          {/* Background Image */}
          <img
            src={slides[currentIndex].image}
            alt="hero-slide"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
            <motion.h1
              className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {slides[currentIndex].title}
            </motion.h1>

            <motion.p
              className="mt-4 text-base md:text-lg lg:text-2xl text-gray-200 max-w-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {slides[currentIndex].subtitle}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-8 w-full max-w-sm sm:max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/blogs"
                className="bg-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition text-center"
              >
                Explore Blogs
              </Link>

              <Link
                to="/register"
                className="bg-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition text-center"
              >
                Join Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${
              index === currentIndex ? "bg-purple-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
