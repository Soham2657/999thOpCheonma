
import { Link } from "react-router-dom";
import ImageSliderHero from "../components/animations/ImageSliderHero";
import FadeInSection from "../components/animations/FadeinSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section with Image Slider */}
      <ImageSliderHero />

      {/* Additional Content Section with Fade In */}
      <FadeInSection>
        <div className="px-4 md:px-6 py-12 md:py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to <span className="text-purple-500">ManhwaSensei</span>
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            A manhwa blog website where you get news, updates, reviews and discussions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/blogs"
              className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700 transition"
            >
              Explore Blogs
            </Link>

            <Link
              to="/register"
              className="bg-gray-800 px-6 py-3 rounded-xl hover:bg-gray-700 transition"
            >
              Join Now
            </Link>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}