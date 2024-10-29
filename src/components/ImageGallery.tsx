import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden mb-4">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="h-80 w-full object-cover transition duration-300 ease-in-out rounded-lg mx-auto"
      />
      <button
        onClick={prevImage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow"
        aria-label="Previous Image"
      >
        <FaArrowLeft className="text-gray-600" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow"
        aria-label="Next Image"
      >
        <FaArrowRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default ImageGallery;
