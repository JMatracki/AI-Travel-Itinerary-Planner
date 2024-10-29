import React from "react";

interface SavedItinerariesProps {
  itineraries: {
    id: string;
    content: string;
    date: string;
    destination: string;
  }[];
  onExport: (itinerary: string) => void;
  onClear: () => void;
  onRemove: (id: string) => void;
  title: string;
  exportButtonLabel: string;
  clearButtonLabel: string;
  removeButtonLabel: string;
}

const SavedItineraries: React.FC<SavedItinerariesProps> = ({
  itineraries,
  onExport,
  onClear,
  onRemove,
  title,
  exportButtonLabel,
  clearButtonLabel,
  removeButtonLabel,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 dark:text-white text-center">
        {title}
      </h2>
      <button
        onClick={onClear}
        className="mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 w-full"
      >
        {clearButtonLabel}
      </button>
      <div className="flex flex-wrap gap-4 justify-center">
        {itineraries.map(({ id, content, date, destination }) => (
          <div
            key={id}
            className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 w-64"
          >
            <h3 className="text-lg font-bold dark:text-white mb-2 text-center">
              {destination}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
              {date}
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => onExport(content)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full mr-2"
              >
                {exportButtonLabel}
              </button>
              <button
                onClick={() => onRemove(id)}
                className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition duration-200 w-24"
              >
                {removeButtonLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItineraries;
