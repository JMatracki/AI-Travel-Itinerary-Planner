import React, { useState } from "react";
import { translations } from "../translations/translations";

interface TripFormProps {
  onGenerateItinerary: (
    destination: string,
    days: number,
    activities: string
  ) => void;
  language: "en" | "pl";
  loading: boolean;
}

const TripForm: React.FC<TripFormProps> = ({
  onGenerateItinerary,
  language,
  loading,
}) => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState<number>(1);
  const [activities, setActivities] = useState("");
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!destination) {
      setError(t.destinationError);
      return;
    }
    if (days <= 0) {
      setError(t.daysError);
      return;
    }
    if (!activities) {
      setError(t.activitiesError);
      return;
    }

    setError(null);
    onGenerateItinerary(destination, days, activities);
    setDestination("");
    setActivities("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 mb-4 w-full max-w-md transition duration-300 mx-auto"
    >
      <div className="mb-4">
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.destinationLabel}
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="days"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.daysLabel}
        </label>
        <input
          type="number"
          id="days"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          min="1"
          required
          className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="activities"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t.activitiesLabel}
        </label>
        <input
          type="text"
          id="activities"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          required
          className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        {loading ? t.loadingText : t.generateButton}
      </button>
    </form>
  );
};

export default TripForm;
