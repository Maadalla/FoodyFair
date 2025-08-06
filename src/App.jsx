import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import CitySelector from './components/CitySelector';
import RestaurantSelector from './components/RestaurantSelector';
import MenuComparison from './components/MenuComparison';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  // Load cities.csv on first render
  useEffect(() => {
    Papa.parse('/data/cities.csv', {
      download: true,
      complete: (results) => {
        const cityNames = results.data.flat().filter(Boolean);
        setCities(cityNames);
      },
    });
  }, []);

  // Load restaurants when city changes
  useEffect(() => {
    if (!selectedCity) return;
    const filename = `/data/restaurants/restaurant_${selectedCity.toLowerCase()}.csv`;
    Papa.parse(filename, {
      download: true,
      complete: (results) => {
        const names = results.data.flat().filter(Boolean);
        setRestaurants(names);
      },
      error: (err) => {
        console.error('Error loading restaurant file:', err);
        setRestaurants([]);
      },
    });
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <div>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">
            Glovo vs In-Store Prices
          </h1>
          <p className="text-lg text-gray-600">
            Compare delivery and local restaurant menu prices — instantly.
          </p>
        </header>

        <div id="city-selector" className="my-10">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
            <span role="img" aria-label="location">📍</span>
            Choose Your City
            <span className="mx-4 hidden md:inline-block text-gray-400">|</span>
            <span role="img" aria-label="restaurant">🍽️</span>
            Choose Your Restaurant
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="bg-white rounded-lg shadow px-4 py-3 w-full md:w-72">
              <CitySelector
                cities={cities}
                selectedCity={selectedCity}
                onSelectCity={(city) => {
                  setSelectedCity(city);
                  setSelectedRestaurant('');
                }}
              />
            </div>
            {selectedCity && (
              <div className="bg-white rounded-lg shadow px-4 py-3 w-full md:w-72">
                <RestaurantSelector
                  restaurants={restaurants}
                  selectedRestaurant={selectedRestaurant}
                  onSelectRestaurant={setSelectedRestaurant}
                />
              </div>
            )}
          </div>
        </div>

        {/* Divider before comparison */}
        <hr className="my-8 border-gray-200" />

        {/* Step 3: Show Comparison (only after restaurant is selected) */}
        {selectedRestaurant && (
          <div className="bg-white shadow-lg rounded-lg p-6 relative">
            {/* Comparison Content */}
            <div id="comparison" className="max-w-5xl mx-auto">
              <MenuComparison restaurant={selectedRestaurant} />
            </div>
            {/* Bottom Action Bar */}
            <div className="absolute left-0 bottom-0 w-full flex justify-between px-4 py-3">
              <a
                href="#report-missing"
                className="text-yellow-600 underline font-medium hover:text-yellow-700 transition"
              >
                Report Missing Menu
              </a>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-yellow-600 transition"
                onClick={() => {
                  setSelectedRestaurant('');
                  document.getElementById('city-selector')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Check Another Restaurant
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );  
};

export default App;