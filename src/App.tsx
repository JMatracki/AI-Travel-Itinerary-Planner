import React, { useState, useCallback, useEffect } from "react";
import TripForm from "./components/TripForm";
import PLFlag from "./assets/images/pl_flag.png";
import UKFlag from "./assets/images/uk_flag.png";
import settingsIcon from "./assets/images/settings.png";
import { translations } from "./translations/translations";
import { jsPDF } from "jspdf";
import { replacePolishChars } from "./utils/utils";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import EstimatedCost from "./components/EstimatedCost";
import Itinerary from "./components/Itinerary";
import ImageGallery from "./components/ImageGallery";
import { fetchItinerary } from "./utils/fetchItinerary";
import SavedItineraries from "./components/SavedItineraries";
import Footer from "./components/Footer";
import ApiKeyModal from "./components/ApiKeyModal";

interface SavedItinerary {
  id: string;
  content: string;
  date: string;
  cost: string | null;
  images: string[];
  destination: string;
}

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en" | "pl">("en");
  const [estimatedCost, setEstimatedCost] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>(
    []
  );
  const [openAiApiKey, setOpenAiApiKey] = useState<string>("");
  const [unsplashAccessKey, setUnsplashAccessKey] = useState<string>("");
  const [isApiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);
  const t = translations[language];

  useEffect(() => {
    const storedItineraries = localStorage.getItem("savedItineraries");
    if (storedItineraries) {
      setSavedItineraries(JSON.parse(storedItineraries));
    }
  }, []);

  const saveItineraryToLocalStorage = (newItinerary: SavedItinerary) => {
    const updatedItineraries = [...savedItineraries, newItinerary];
    if (updatedItineraries.length > 8) {
      updatedItineraries.shift();
    }
    setSavedItineraries(updatedItineraries);
    localStorage.setItem(
      "savedItineraries",
      JSON.stringify(updatedItineraries)
    );
  };

  const handleGenerateItinerary = useCallback(
    async (destination: string, days: number, activities: string) => {
      setItinerary(null);
      setImages([]);
      setLoading(true);
      setError(null);
      try {
        const { itinerary, images } = await fetchItinerary(
          destination,
          days,
          activities,
          openAiApiKey,
          unsplashAccessKey,
          language
        );
        const costMatch = itinerary.match(/Estimated average cost: (.*?)/);
        setEstimatedCost(costMatch ? costMatch[1].trim() : null);
        setItinerary(itinerary);
        setImages(images);
        const newItinerary: SavedItinerary = {
          id: Date.now().toString(),
          content: itinerary,
          date: new Date().toLocaleDateString(
            language === "en" ? "en-US" : "pl-PL"
          ),
          cost: costMatch ? costMatch[1].trim() : null,
          images,
          destination,
        };
        saveItineraryToLocalStorage(newItinerary);
      } catch (error) {
        console.error("Błąd podczas generowania planu podróży:", error);
        setError(t.errorText);
      } finally {
        setLoading(false);
      }
    },
    [language, openAiApiKey, unsplashAccessKey, t.errorText]
  );

  const updateSavedItineraries = (updatedItineraries: SavedItinerary[]) => {
    setSavedItineraries(updatedItineraries);
    localStorage.setItem(
      "savedItineraries",
      JSON.stringify(updatedItineraries)
    );
  };

  const removeItinerary = (id: string) => {
    updateSavedItineraries(
      savedItineraries.filter((itinerary) => itinerary.id !== id)
    );
  };

  const clearSavedItineraries = () => {
    localStorage.removeItem("savedItineraries");
    setSavedItineraries([]);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pl" : "en"));
    setItinerary(null);
  };

  const handleApiKeyChange = (openAiKey: string, unsplashKey: string) => {
    setOpenAiApiKey(openAiKey);
    setUnsplashAccessKey(unsplashKey);
  };

  const exportToPDF = (itinerary: string) => {
    const cleanedTitle = replacePolishChars(t.itineraryTitle);
    const cleanedItinerary = replacePolishChars(itinerary);
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(cleanedTitle, 10, 10);
    doc.setFontSize(12);
    const lines: string[] = doc.splitTextToSize(cleanedItinerary, 190);
    lines.forEach((line: string, index: number) => {
      doc.text(line, 10, 20 + index * 10);
    });
    doc.save("itinerary.pdf");
  };

  return (
    <div
      className={`min-h-screen p-4 flex flex-col justify-between items-center transition duration-300 ${
        darkMode ? "" : "bg-gradient-to-b from-blue-100 to-white"
      } dark:bg-gray-900 dark:text-white`}
    >
      <div className="flex justify-end items-center mb-4 w-full">
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleDarkMode}
            className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-200 dark:bg-white dark:text-gray-900"
          >
            {darkMode ? t.toggleLightMode : t.toggleDarkMode}
          </button>
          <button onClick={toggleLanguage} className="w-8 h-8">
            <img
              src={language === "en" ? PLFlag : UKFlag}
              alt="Toggle Language"
            />
          </button>
          <button
            onClick={() => setApiKeyModalOpen(true)}
            className={`w-[24px] h-[24px] ${darkMode && "bg-white"}`}
          >
            <img src={settingsIcon} alt="API Key settings" />
          </button>
        </div>
      </div>
      <h1 className="text-4xl font-bold dark:text-white mb-4 text-center">
        {t.title}
      </h1>
      <TripForm
        onGenerateItinerary={handleGenerateItinerary}
        language={language}
        loading={loading}
      />
      {loading && <Loader />}
      {error && <ErrorMessage message={t.errorText} />}
      {estimatedCost && (
        <EstimatedCost cost={estimatedCost} label={t.estimatedCostLabel} />
      )}
      {itinerary && !loading && (
        <>
          <Itinerary
            itinerary={itinerary}
            title={t.itineraryTitle}
            onExport={() => exportToPDF(itinerary)}
            exportButtonLabel={t.exportPDFButton}
          />
          {images.length > 0 && <ImageGallery images={images} />}
        </>
      )}
      {savedItineraries.length > 0 && (
        <div className="mt-8 w-full max-w-xl">
          <SavedItineraries
            itineraries={savedItineraries}
            onExport={exportToPDF}
            onRemove={removeItinerary}
            onClear={clearSavedItineraries}
            title={t.savedItinerariesTitle}
            exportButtonLabel={t.exportPDFButton}
            clearButtonLabel={t.clearButtonLabel}
            removeButtonLabel={t.remove}
          />
        </div>
      )}
      <Footer createdByLabel={t.createdBy} darkMode={darkMode} />
      {isApiKeyModalOpen && (
        <ApiKeyModal
          onClose={() => setApiKeyModalOpen(false)}
          onSave={handleApiKeyChange}
          apiKeysConfiguration={t.apiKeysConfiguration}
          saveLabel={t.save}
          cancelLabel={t.cancel}
        />
      )}
    </div>
  );
};

export default App;
