# 🧳 AI Travel Itinerary Planner (English)


## 📝 Project Description

Travel Itinerary Planner is a React application that allows users to generate detailed travel plans, including estimated costs and related images. The app supports language switching (Polish/English), dark mode, and the ability to export the travel plan to a PDF file. With the integration of OpenAI and Unsplash, users can receive intelligent recommendations and images tailored to their travel destination.

## ⚙️ Features

- **Travel Plan Generation** – Create a travel itinerary based on the destination, number of days, and preferred activities.
- **Cost Estimation** – Estimate travel costs based on the entered data.
- **Integration with OpenAI and Unsplash** – Fetch information and images related to the location.
- **Language Support** – The app supports switching between Polish and English.
- **Dark and Light Mode** – Ability to toggle between dark and light mode.
- **Export to PDF** – Option to save the travel plan in PDF format.
- **Saved Travel Plans** – Store generated plans in `localStorage` for re-viewing and PDF export.
- **API Key Configuration** – Users can input their API keys for OpenAI and Unsplash, securely stored in `localStorage`.
- **Testing Application** - Comprehensive tests using Playwright to ensure functionality, including generating travel itineraries, cost estimation, and integration with external APIs.

## 💻 Technology

The project is built using:

- **React** – as the main frontend framework.
- **Tailwind CSS** – for styling components.
- **TypeScript** – for better type management and code safety.
- **OpenAI API** – for generating intelligent travel recommendations.
- **Unsplash API** – for fetching images related to travel destinations.
- **jsPDF** – for generating PDF documents with travel plans.
- **React Hook Form + Zod** - for validation.
- **Playwright** - for E2E tests.

## 🚀 Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JMatracki/travel-itinerary.git
   cd travel-itinerary
2. **Install dependencies:**:
   ```bash
   npm install
3. **Run the application:**:
   ```bash
   npm run dev
4. **Configure API keys:**:
- Launch the application and click the settings icon in the top right corner to input the API keys for OpenAI and Unsplash.
- If you want to test application using playwright, first you need to add API keys to your .env file in tests folder. 
5. **Testing application**:
- When you added API keys as in step before, then you can type:
 ```bash
   npx playwright test
![Zrzut ekranu 2025-03-12 193950](https://github.com/user-attachments/assets/ec7fcdb1-27b3-48fd-be16-b44584b42d75)


## 📸 Preview
https://www.youtube.com/watch?v=rdjqTbXsc88

## 🌐 Live Preview
Check out the live version of the application [here](https://travelitineraryplanner.netlify.app/).

## 📝 Changelog
### [1.0.0] - 2024-10-29
- **Initial release** with basic functionality:
  - Travel plan generation based on destination, number of days, and activities.
  - Cost estimation functionality.
  - Integration with OpenAI and Unsplash for recommendations and images.
  - Language switching between Polish and English.
  - Dark/light mode toggle.
  - PDF export for the generated travel plans.
  - Store generated plans in `localStorage`.
### [1.0.1] - 2025-03-12
- **Release v1.0.1**:
  - Integrated React Hook Form with Zod for more efficient form validation and state management. This improves the flexibility of the validation process while making the form code cleaner and easier to maintain.
  - Introduced an end-to-end testing suite using Playwright. These tests automate the verification of application functionality across different user scenarios, ensuring a higher level of reliability and quality before deployment.
  - Integrated translations with tests to ensure stability: Translations were integrated into the tests to avoid test failures caused by changes in text content. 

## 📄 License

This project is licensed under the MIT License.

## ✨ Author

Created by: [JMatracki](https://github.com/jmatracki)

# 🧳 AI Generator Planu Podróży (Polski)

## 📝 Opis projektu

Travel Itinerary Planner to aplikacja React, która pozwala użytkownikom generować szczegółowe plany podróży, z szacunkowymi kosztami i powiązanymi z danym miejscem obrazami. Aplikacja obsługuje przełączanie języka (polski/angielski), tryb ciemny oraz umożliwia eksportowanie planu podróży do pliku PDF. Dzięki integracji z OpenAI i Unsplash użytkownicy mogą otrzymywać inteligentne rekomendacje i obrazy, dopasowane do miejsca podróży.

## ⚙️Funkcjonalności

- **Generowanie planu podróży** – Tworzenie planu podróży na podstawie docelowej lokalizacji, liczby dni oraz preferowanych aktywności.
- **Szacowanie kosztów** – Szacowanie kosztów podróży na podstawie wprowadzonych danych.
- **Integracja z OpenAI i Unsplash** – Pobieranie informacji oraz obrazów związanych z lokalizacją.
- **Obsługa języków** – Aplikacja obsługuje przełączanie języka między polskim i angielskim.
- **Tryb ciemny i jasny** – Możliwość przełączania się między trybem ciemnym i jasnym.
- **Eksport do PDF** – Możliwość zapisywania planu podróży w formacie PDF.
- **Zapisane plany podróży** – Przechowywanie wygenerowanych planów w `localStorage` z możliwością ponownego przeglądania i eksportu do PDF.
- **Konfiguracja kluczy API** – Użytkownicy mogą wprowadzić swoje klucze API dla OpenAI i Unsplash, które są bezpiecznie przechowywane w `localStorage`.
- **Testowanie Aplikacji** - Kompleksowe testy przy użyciu Playwrighta, które zapewniają poprawność działania, w tym generowanie planów podróży, szacowanie kosztów oraz integrację z zewnętrznymi API.

## 💻 Technologia

Projekt zbudowany w oparciu o:

- **React** – jako główny framework frontendowy.
- **Tailwind CSS** – do stylowania komponentów.
- **TypeScript** – dla lepszego zarządzania typami i bezpieczeństwa kodu.
- **OpenAI API** – generowanie inteligentnych rekomendacji podróży.
- **Unsplash API** – pobieranie obrazów związanych z miejscami podróży.
- **jsPDF** – generowanie dokumentów PDF z planami podróży.
- **React Hook Form + Zod** - walidacja formularzy.
- **Playwright** - pokrycie aplikacji testami E2E.

## 🚀 Instalacja i uruchomienie

1. **Klonuj repozytorium**:
   ```bash
   git clone https://github.com/JMatracki/travel-itinerary.git
   cd travel-itinerary
2. **Zainstaluj zależności**:
   ```bash
   npm install
3. **Uruchom aplikację**:
   ```bash
   npm run dev
4. **Skonfiguruj klucze API:**:
- Uruchom aplikację i kliknij ikonę ustawień w prawym górnym rogu, aby wprowadzić klucze API dla OpenAI i Unsplash.
- Jeśli chcesz testować aplikację za pomocą Playwrighta, najpierw musisz dodać klucze API do pliku .env w folderze z testami.
5. **Testowanie aplikacji**:
- Po dodaniu kluczy API, jak opisano w poprzednim kroku, możesz wpisać:
 ```bash
   npx playwright test
![Zrzut ekranu 2025-03-12 193950](https://github.com/user-attachments/assets/ec7fcdb1-27b3-48fd-be16-b44584b42d75)

## 📸 Podgląd
https://www.youtube.com/watch?v=rdjqTbXsc88

## 🌐 Podgląd live
Sprawdź podgląd na żywo [tutaj](https://travelitineraryplanner.netlify.app/).

## 📝 Changelog
### [1.0.0] - 2024-10-29
- **Początkowa wersja** z podstawową funkcjonalnością:
  - Generowanie planu podróży na podstawie celu podróży, liczby dni i aktywności.
  - Funkcjonalność szacowania kosztów.
  - Integracja z OpenAI i Unsplash w celu rekomendacji i pobierania obrazów.
  - Przełączanie języka pomiędzy polskim a angielskim.
  - Przełącznik trybu ciemnego/jasnego.
  - Eksport planów podróży do pliku PDF.
  - Przechowywanie wygenerowanych planów w `localStorage`.
### [1.0.1] - 2025-03-12
- **Wydanie v1.0.1**:
   - Zintegrowano React Hook Form z Zod w celu bardziej efektywnej walidacji formularzy i zarządzania stanem. Dzięki temu proces walidacji stał się bardziej elastyczny, a kod formularza czystszy i łatwiejszy do utrzymania.
   - Wprowadzono zestaw testów end-to-end przy użyciu Playwright. Testy te automatyzują weryfikację funkcjonalności aplikacji w różnych scenariuszach użytkowników, zapewniając wyższy poziom niezawodności i jakości przed wdrożeniem.
   - Zintegrowano tłumaczenia z testami, aby zapewnić stabilność: Tłumaczenia zostały zintegrowane z testami, aby uniknąć niepowodzeń testów spowodowanych zmianami w treści tekstów.

## 📄 Licencja
Ten projekt jest objęty licencją MIT.

## ✨ Autor
Stworzony przez: [JMatracki](https://github.com/jmatracki)
