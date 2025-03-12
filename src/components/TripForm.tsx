import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { translations } from "../translations/translations";
import { tripSchema, TripFormData } from "../schemas/tripSchema";

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
  const t = translations[language];

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    setError,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema(t)),
  });

  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(1);
  const [activities, setActivities] = useState("");

  const setDynamicErrors = useCallback(() => {
    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof TripFormData]) {
        setError(key as keyof TripFormData, {
          message: errors[key as keyof TripFormData]?.message,
        });
      }
    });
  }, [errors, setError]);

  useEffect(() => {
    setDynamicErrors();
  }, [language, errors, setError, t, setDynamicErrors]);

  useEffect(() => {
    setValue("destination", destination);
    setValue("days", days);
    setValue("activities", activities);
  }, [language, destination, days, activities, setValue]);

  const onSubmit = (data: TripFormData) => {
    onGenerateItinerary(data.destination, data.days, data.activities);
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDays(value);
    setValue("days", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="destination" className="block text-lg font-medium">
          {t.destinationLabel}
        </label>
        <input
          {...register("destination")}
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
          disabled={loading}
        />
        {errors.destination && (
          <p className="text-red-500 text-sm">{errors.destination.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="days" className="block text-lg font-medium">
          {t.daysLabel}
        </label>
        <input
          type="number"
          {...register("days")}
          id="days"
          value={days}
          onChange={handleDaysChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
          disabled={loading}
        />
        {errors.days && (
          <p className="text-red-500 text-sm">{errors.days.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="activities" className="block text-lg font-medium">
          {t.activitiesLabel}
        </label>
        <textarea
          {...register("activities")}
          id="activities"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
          disabled={loading}
        />
        {errors.activities && (
          <p className="text-red-500 text-sm">{errors.activities.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-50"
        disabled={loading}
      >
        {loading ? t.loadingText : t.generateButton}
      </button>
    </form>
  );
};

export default TripForm;
