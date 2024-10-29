import React, { useState, useEffect } from "react";

interface ApiKeyModalProps {
  onClose: () => void;
  onSave: (openAiKey: string, unsplashKey: string) => void;
  apiKeysConfiguration: string;
  saveLabel: string;
  cancelLabel: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  onClose,
  onSave,
  apiKeysConfiguration,
  saveLabel,
  cancelLabel,
}) => {
  const [openAiKey, setOpenAiKey] = useState<string>("");
  const [unsplashKey, setUnsplashKey] = useState<string>("");

  useEffect(() => {
    const storedOpenAiKey = localStorage.getItem("openAiApiKey");
    const storedUnsplashKey = localStorage.getItem("unsplashAccessKey");
    if (storedOpenAiKey) setOpenAiKey(storedOpenAiKey);
    if (storedUnsplashKey) setUnsplashKey(storedUnsplashKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem("openAiApiKey", openAiKey);
    localStorage.setItem("unsplashAccessKey", unsplashKey);
    onSave(openAiKey, unsplashKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-gray-800 bg-opacity-75 absolute inset-0"
        onClick={onClose}
      ></div>
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 relative z-10 shadow-lg w-1/4">
        <h2 className="text-xl mb-4 dark:text-white">{apiKeysConfiguration}</h2>
        <div className="mb-4">
          <label className="block mb-1 dark:text-gray-200">
            OpenAI API Key:
          </label>
          <input
            type="text"
            value={openAiKey}
            onChange={(e) => setOpenAiKey(e.target.value)}
            className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 dark:text-gray-200">
            Unsplash Access Key:
          </label>
          <input
            type="text"
            value={unsplashKey}
            onChange={(e) => setUnsplashKey(e.target.value)}
            className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {saveLabel}
          </button>
          <button
            onClick={onClose}
            className="ml-2 py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
