import React from "react";

interface ItineraryProps {
  itinerary: string;
  title: string;
  onExport: () => void;
  exportButtonLabel: string;
}

const Itinerary: React.FC<ItineraryProps> = ({
  itinerary,
  title,
  onExport,
  exportButtonLabel,
}) => {
  return (
    <div className="m-auto mb-6 p-4 border border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800 w-full max-w-2xl">
      <h2 aria-label="Your itinerary" className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <pre className="whitespace-pre-wrap">{itinerary}</pre>
      <button
        onClick={onExport}
        className="mt-4 bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600 transition duration-200"
      >
        {exportButtonLabel}
      </button>
    </div>
  );
};

export default Itinerary;
