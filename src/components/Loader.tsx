import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
