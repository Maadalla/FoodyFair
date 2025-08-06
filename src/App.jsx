import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CitySelector from './components/CitySelector';
import RestaurantSelector from './components/RestaurantSelector';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import MenuComparison from './components/MenuComparison';

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

  // Scrolls the comparison section to the middle of the viewport
  const scrollToComparison = () => {
    const el = document.getElementById('city-selector');
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect.top + scrollTop - (window.innerHeight / 2) + (rect.height / 2);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-inter">
      <Navbar scrollToComparison={scrollToComparison} />
      <HeroSection scrollToComparison={scrollToComparison} />
      <section id="city-selector" className="py-16 bg-[#0F172A]">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0F172A]">
            Commencez la comparaison
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <CitySelector
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
              cities={cities}
            />
            <RestaurantSelector
              selectedRestaurant={selectedRestaurant}
              onSelectRestaurant={setSelectedRestaurant}
              restaurants={restaurants}
            />
          </div>
        </div>
      </section>
      {selectedCity && selectedRestaurant && (
        <section id="comparison" className="py-12 bg-[#0F172A]">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <MenuComparison restaurant={selectedRestaurant} />
          </div>
        </section>
      )}
      <FeaturesSection />
      
      <FAQSection />
      <Footer />
    </div>
  );
};

export default App;