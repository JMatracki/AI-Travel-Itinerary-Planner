import React, { useState } from "react";

interface ApiKeyInputProps {
  onUpdateKeys: (openAiKey: string, unsplashKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onUpdateKeys }) => {
  const [openAiKey, setOpenAiKey] = useState<string>("");
  const [unsplashKey, setUnsplashKey] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateKeys(openAiKey, unsplashKey);
    setOpenAiKey("");
    setUnsplashKey("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="OpenAI API Key"
        value={openAiKey}
        onChange={(e) => setOpenAiKey(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Unsplash API Key"
        value={unsplashKey}
        onChange={(e) => setUnsplashKey(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
        Zapisz klucze
      </button>
    </form>
  );
};

export default ApiKeyInput;
