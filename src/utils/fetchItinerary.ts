import axios from "axios";

interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

interface UnsplashPhoto {
  urls: {
    small: string;
  };
}

export const fetchItinerary = async (
  destination: string,
  days: number,
  activities: string,
  openAiApiKey: string,
  unsplashAccessKey: string,
  language: "en" | "pl"
): Promise<{ itinerary: string; images: string[] }> => {
  const prompt =
    language === "pl"
      ? `Wygeneruj szczegółowy plan podróży na ${days} dni do ${destination}. Uwzględnij codzienne aktywności, miejsca do zobaczenia i sugerowane czasy na każdą aktywność. Skup się na ${activities}. Podaj również szacunkowy średni koszt tej podróży, w tym zakwaterowanie, jedzenie i aktywności.`
      : `Generate a detailed itinerary for a ${days}-day trip to ${destination}. Include daily activities, sights to see, and suggested times for each activity. Focus on ${activities}. Also, please provide an estimated average cost for this trip, including accommodation, food, and activities.`;

  const response = await axios.post<OpenAIResponse>(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiApiKey}`,
      },
    }
  );

  const itinerary = response.data.choices[0].message.content;
  const searchTerms = itinerary
    .split("\n")
    .filter((line) => line.trim().length > 0);

  if (searchTerms.length === 0) {
    return { itinerary, images: [] };
  }

  const uniqueImages: Set<string> = new Set();

  await Promise.all(
    searchTerms.map(async (term) => {
      if (!term) return;
      try {
        const unsplashResponse = await axios.get<{ results: UnsplashPhoto[] }>(
          `https://api.unsplash.com/search/photos`,
          {
            headers: {
              Authorization: `Client-ID ${unsplashAccessKey}`,
            },
            params: {
              query: `${destination} tourist places`,
              per_page: 8,
            },
          }
        );

        unsplashResponse.data.results.forEach((result) => {
          if (uniqueImages.size < 8) {
            uniqueImages.add(result.urls.small);
          }
        });
      } catch (error) {
        console.error(`Błąd przy pobieraniu zdjęć dla "${term}":`, error);
      }
    })
  );

  const filteredImages = Array.from(uniqueImages);

  return { itinerary, images: filteredImages };
};
