import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CitySelector from './components/CitySelector';
import RestaurantSelector from './components/RestaurantSelector';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import MenuComparison from './components/MenuComparison';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
const App = () => {
  // Removed unused 'cities' state
  const [selectedCity, setSelectedCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  // Removed unused fetchCities useEffect

  // Load restaurants when city changes
  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!selectedCity) {
        setRestaurants([]);
        return;
      }
      try {
        const { data: cityData, error: cityError } = await supabase
          .from('cities')
          .select('id')
          .eq('name', selectedCity)
          .single();
        if (cityError) throw cityError;

        const { data: restaurantsData, error: restaurantsError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('city_id', cityData.id);
        if (restaurantsError) throw restaurantsError;

        setRestaurants(restaurantsData.map(r => r.name));
      } catch (error) {
        console.error(error);
        setRestaurants([]);
      }
    };
    fetchRestaurants();
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
      <section id="city-selector" className="py-12 md:py-20 bg-[#0F172A] px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-lg md:text-2xl font-medium text-[#0F172A] mb-6 text-center">
            Commencez la comparaison
          </h2>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <CitySelector
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* ...cards... */}
      </div>
      <FAQSection />
      <Footer />
      <Analytics/>
      <SpeedInsights/>
    </div>
  );
};

export default App;