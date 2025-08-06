import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Fuse from 'fuse.js';

const MenuComparison = ({ restaurant }) => {
  const [glovoMenu, setGlovoMenu] = useState([]);
  const [localMenu, setLocalMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load data
  useEffect(() => {
    if (!restaurant) return;

    setLoading(true);
    setError(null);

    const loadCSV = async (path) => {
  return new Promise((resolve) => {
    Papa.parse(path, {
      download: true,
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results?.data || results.data.length === 0) {
          console.warn(`CSV ${path} has no data`);
          resolve([]);
          return;
        }

        const items = results.data
          .filter(row => Array.isArray(row) && row.length >= 2)
          .map(row => {
            const item = row[0]?.toString().trim().replace(/\u00A0/g, ''); // remove non-breaking space
            const price = row[1]?.toString().trim().replace(/\u00A0/g, '');
            return { item, price };
          });

        console.log(`✅ Loaded ${path}`, items);
        resolve(items);
      },
      error: (err) => {
        console.error(`❌ Failed to load ${path}`, err);
        resolve([]);
      }
    });
  });
};


    Promise.all([
      loadCSV(`/data/restaurant_menus/restaurant_menus_${restaurant.toLowerCase().replace(/[^\w]/g, '')}.csv`),
      loadCSV(`/data/glovo_menus/glovo_menus_${restaurant.toLowerCase().replace(/[^\w]/g, '')}.csv`)
    ]).then(([local, glovo]) => {
      if (local.length === 0 || glovo.length === 0) {
        setError('Menu data not found or empty');
      }
      setLocalMenu(local);
      setGlovoMenu(glovo);
      setLoading(false);
    }).catch(err => {
      console.error('Loading error:', err);
      setError('Failed to load menu data');
      setLoading(false);
    });
  }, [restaurant]);

  // Categorize items
  const categorizeItems = (items) => {
    const categories = {
      burgers: { name: "🍔 Burgers", items: [] },
      tacos: { name: "🌮 Tacos", items: [] },
      pizzas: { name: "🍕 Pizzas", items: [] },
      salads: { name: "🥗 Salads", items: [] },
      seafood: { name: "🐟 Seafood", items: [] },
      pasta: { name: "🍝 Pasta", items: [] },
      drinks: { name: "🥤 Drinks", items: [] },
      kids: { name: "👶 Kids Menu", items: [] },
      other: { name: "🍽️ Other", items: [] }
    };

    items.forEach(item => {
      const lowerItem = item.item.toLowerCase();
      
      if (lowerItem.includes('burger')) categories.burgers.items.push(item);
      else if (lowerItem.includes('taco')) categories.tacos.items.push(item);
      else if (lowerItem.includes('pizza')) categories.pizzas.items.push(item);
      else if (lowerItem.includes('salad') || lowerItem.includes('salade')) categories.salads.items.push(item);
      else if (lowerItem.includes('poisson') || lowerItem.includes('seafood') || lowerItem.includes('saumon')) categories.seafood.items.push(item);
      else if (lowerItem.includes('patte') || lowerItem.includes('spaghetti')) categories.pasta.items.push(item);
      else if (lowerItem.includes('boisson') || lowerItem.includes('soda') || lowerItem.includes('eau')) categories.drinks.items.push(item);
      else if (lowerItem.includes('kids') || lowerItem.includes('enfant')) categories.kids.items.push(item);
      else categories.other.items.push(item);
    });

    return Object.entries(categories)
      .filter(([, category]) => category.items.length > 0)
      .map(([key, category]) => ({ id: key, ...category }));
  };

  const localCategories = categorizeItems(localMenu);

  // Find price difference for an item
  const getPriceDifference = (itemName) => {
    const fuse = new Fuse(glovoMenu, { 
      keys: ['item'], 
      threshold: 0.4,
      includeScore: true
    });
    
    const [bestMatch] = fuse.search(itemName);
    if (!bestMatch) return null;

    const localItem = localMenu.find(i => i.item === itemName);
    if (!localItem) return null;

    const localPrice = cleanPrice(localItem.price);
    const glovoPrice = cleanPrice(bestMatch.item.price);
    const difference = glovoPrice - localPrice;

    return {
      localPrice,
      glovoPrice,
      difference,
      matchScore: bestMatch.score
    };
  };

  const cleanPrice = (priceStr) => {
    if (!priceStr) return 0;
    const numeric = parseFloat(
      priceStr
        .replace(/[^\d,.]/g, '')
        .replace(',', '.')
    );
    return isNaN(numeric) ? 0 : numeric;
  };

  // Filter categories based on search
  // (filteredCategories removed because it was unused)

  const filteredItems = searchTerm.trim() !== ''
  ? localMenu.filter(item =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading menus...</p>
    </div>
  );

  if (error) return (
    <div className="error-message">
      <p>⚠️ {error}</p>
      <p>Please try another restaurant or check back later.</p>
    </div>
  );

  return (
  <div className="max-w-6xl mx-auto px-4 py-8">
    {/* Header */}
    <header className="mb-6">
      <h1 className="text-3xl font-bold mb-4 text-yellow-600">
        {restaurant} Menu Comparison
      </h1>

      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search menu items..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
        )}
      </div>
    </header>

    {/* Category Buttons (only shown if not searching) */}
    
      <div className="flex flex-wrap gap-2 mb-6">
        {localCategories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 text-sm rounded-full border transition-all 
              ${activeCategory === category.id
                ? 'bg-yellow-500 text-white border-yellow-500'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name} ({category.items.length})
          </button>
        ))}
      </div>
    

    {/* Search Results */}
    {searchTerm.trim() !== '' ? (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => {
            const priceDiff = getPriceDifference(item.item);
            return (
              <div key={item.item} className="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{item.item}</h3>
                  {priceDiff && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold
                      ${priceDiff.difference > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {priceDiff.difference > 0 ? 'Overpay' : 'Save'} {Math.abs(priceDiff.difference).toFixed(2)} DH
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">🍴</span>
                    <span className="font-semibold text-gray-700">{priceDiff?.localPrice?.toFixed(2) || 'N/A'} DH</span>
                    <span className="text-xs text-gray-400 ml-1">In-store</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">🛵</span>
                    <span className="font-semibold text-gray-700">{priceDiff?.glovoPrice?.toFixed(2) || 'N/A'} DH</span>
                    <span className="text-xs text-gray-400 ml-1">Glovo</span>
                  </div>
                </div>
                {priceDiff && (
                  <div className="mt-1 text-xs text-gray-500">
                    {priceDiff.localPrice > 0 && (
                      <span>
                        {priceDiff.difference > 0 ? '↑' : '↓'} {((priceDiff.difference / priceDiff.localPrice) * 100).toFixed(1)}% difference
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No matching items found.</p>
        )}
      </div>
    ) : (
      // Category sections
      <div className="space-y-8">
        {(() => {
          // Find the open category
          const openCategory = activeCategory
            ? localCategories.find(cat => cat.id === activeCategory)
            : localCategories[0];

          if (!openCategory) return null;

          return (
            <div key={openCategory.id} className="border-b pb-4">
              <h2
                className="text-2xl font-semibold mb-3 text-yellow-600"
              >
                {openCategory.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {openCategory.items.map(item => {
                  const priceDiff = getPriceDifference(item.item);
                  return (
                    <div key={item.item} className="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{item.item}</h3>
                        {priceDiff && (
                          <span className={`px-2 py-1 rounded-full text-xs font-bold
                            ${priceDiff.difference > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {priceDiff.difference > 0 ? 'Overpay' : 'Save'} {Math.abs(priceDiff.difference).toFixed(2)} DH
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">🍴</span>
                          <span className="font-semibold text-gray-700">{priceDiff?.localPrice?.toFixed(2) || 'N/A'} DH</span>
                          <span className="text-xs text-gray-400 ml-1">In-store</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">🛵</span>
                          <span className="font-semibold text-gray-700">{priceDiff?.glovoPrice?.toFixed(2) || 'N/A'} DH</span>
                          <span className="text-xs text-gray-400 ml-1">Glovo</span>
                        </div>
                      </div>
                      {priceDiff && (
                        <div className="mt-1 text-xs text-gray-500">
                          {priceDiff.localPrice > 0 && (
                            <span>
                              {priceDiff.difference > 0 ? '↑' : '↓'} {((priceDiff.difference / priceDiff.localPrice) * 100).toFixed(1)}% difference
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    )}
  </div>
);

};
export default MenuComparison;