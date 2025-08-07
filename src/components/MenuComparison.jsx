import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Fuse from 'fuse.js';

const PRODUCTS_PER_PAGE = 6;

const MenuComparison = ({ restaurant }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localMenu, setLocalMenu] = useState([]);
  const [glovoMenu, setGlovoMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [page, setPage] = useState(1);

  // Fetch menus from Supabase
  useEffect(() => {
    const fetchMenus = async () => {
      if (!restaurant) return;
      setLoading(true);
      setError(null);
      try {
        // Get restaurant id
        const { data: restData, error: restError } = await supabase
          .from('restaurants')
          .select('id')
          .eq('name', restaurant)
          .single();
        if (restError || !restData) throw restError || new Error('Restaurant not found');

        // Fetch all menu items for this restaurant
        const { data, error } = await supabase
          .from('menus')
          .select('*')
          .eq('restaurant_id', restData.id);

        if (error) throw error;

        setLocalMenu(data.filter(item => item.source === 'restaurant'));
        setGlovoMenu(data.filter(item => item.source === 'glovo'));
      } catch {
        setError('Could not load menu items');
        setLocalMenu([]);
        setGlovoMenu([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, [restaurant]);

  // Categorize items
  const categorizeItems = (items) => {
    const categories = {
      pizzas: { name: "🍕 Pizzas", items: [] },
      burgers: { name: "🍔 Burgers", items: [] },
      tacos: { name: "🌮 Tacos", items: [] },
      salades: { name: "🥗 Salades", items: [] },
      sandwichs: { name: "🥪 Sandwichs", items: [] },
      pâtes: { name: "🍝 Pâtes", items: [] },
      viandes: { name: "🥩 Viandes", items: [] },
      poissons: { name: "🐟 Poissons & Fruits de Mer", items: [] },
      desserts: { name: "🍰 Desserts", items: [] },
      boissons: { name: "🥤 Boissons", items: [] },
      soupes: { name: "🍲 Soupes", items: [] },
      crêpes: { name: "🥞 Crêpes", items: [] },
      gaufres: { name: "🧇 Gaufres", items: [] },
      sushis: { name: "🍣 Sushis", items: [] },
      plats_asiatiques: { name: "🍜 Plats Asiatiques", items: [] },
      enfants: { name: "👶 Menu Enfant", items: [] },
      autres: { name: "🍽️ Autres", items: [] }
    };

    items.forEach(item => {
      const lowerItem = item.item.toLowerCase();

      if (lowerItem.includes('pizza')) categories.pizzas.items.push(item);
      else if (lowerItem.includes('burger')) categories.burgers.items.push(item);
      else if (lowerItem.includes('taco')) categories.tacos.items.push(item);
      else if (lowerItem.includes('salade')) categories.salades.items.push(item);
      else if (lowerItem.includes('sandwich')) categories.sandwichs.items.push(item);
      else if (lowerItem.includes('pâte') || lowerItem.includes('pasta') || lowerItem.includes('spaghetti') || lowerItem.includes('lasagne') || lowerItem.includes('vermicelle') || lowerItem.includes('padthai')) categories.pâtes.items.push(item);
      else if (lowerItem.includes('viande') || lowerItem.includes('boeuf') || lowerItem.includes('poulet') || lowerItem.includes('agneau') || lowerItem.includes('charcuterie') || lowerItem.includes('cordon bleu') || lowerItem.includes('nugget') || lowerItem.includes('brochette')) categories.viandes.items.push(item);
      else if (lowerItem.includes('poisson') || lowerItem.includes('saumon') || lowerItem.includes('crevette') || lowerItem.includes('fruits de mer') || lowerItem.includes('dourade') || lowerItem.includes('loup bar')) categories.poissons.items.push(item);
      else if (lowerItem.includes('dessert') || lowerItem.includes('tiramisu') || lowerItem.includes('panna cotta') || lowerItem.includes('fondant') || lowerItem.includes('nougat') || lowerItem.includes('salade fruit')) categories.desserts.items.push(item);
      else if (lowerItem.includes('boisson') || lowerItem.includes('soda') || lowerItem.includes('eau') || lowerItem.includes('orangina') || lowerItem.includes('jus') || lowerItem.includes('coca')) categories.boissons.items.push(item);
      else if (lowerItem.includes('soupe')) categories.soupes.items.push(item);
      else if (lowerItem.includes('crêpe')) categories.crêpes.items.push(item);
      else if (lowerItem.includes('gaufre')) categories.gaufres.items.push(item);
      else if (lowerItem.includes('sushi')) categories.sushis.items.push(item);
      else if (lowerItem.includes('asiatique') || lowerItem.includes('padthai') || lowerItem.includes('vermicelle') || lowerItem.includes('riz cantonnais')) categories.plats_asiatiques.items.push(item);
      else if (lowerItem.includes('kids') || lowerItem.includes('enfant') || lowerItem.includes('mini')) categories.enfants.items.push(item);
      else categories.autres.items.push(item);
    });

    return Object.entries(categories)
      .filter(([, category]) => category.items.length > 0)
      .map(([key, category]) => ({ id: key, ...category }));
  };

  const localCategories = categorizeItems(localMenu);

  // Fuzzy match: for each local item, find best glovo match
  const fuseGlovo = new Fuse(glovoMenu, { keys: ['item'], threshold: 0.4 });

  // Find price difference for an item (by fuzzy match)
  const getPriceDifference = (itemName) => {
    const [bestMatch] = fuseGlovo.search(itemName);
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
        .toString()
        .replace(/[^\d,.]/g, '')
        .replace(',', '.')
    );
    return isNaN(numeric) ? 0 : numeric;
  };

  // 1. Filter items for display (must have price in both menus)
  const displayableItems = (searchTerm.trim() !== ''
    ? localMenu.filter(item =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase()))
    : (
      activeCategory
        ? (localCategories.find(cat => cat.id === activeCategory)?.items || [])
        : (localCategories[0]?.items || [])
    )
  ).filter(item => {
    const priceDiff = getPriceDifference(item.item);
    return priceDiff && typeof priceDiff.localPrice === 'number' && typeof priceDiff.glovoPrice === 'number';
  });

  // 2. Pagination logic on filtered items
  const totalPages = Math.ceil(displayableItems.length / PRODUCTS_PER_PAGE);
  const paginatedItems = displayableItems.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  // 3. For category buttons, show only the count of displayable items
  const getDisplayableCount = (cat) =>
    cat.items.filter(item => {
      const priceDiff = getPriceDifference(item.item);
      return priceDiff && typeof priceDiff.localPrice === 'number' && typeof priceDiff.glovoPrice === 'number';
    }).length;

  // Reset to page 1 when filter changes
  useEffect(() => { setPage(1); }, [searchTerm, activeCategory, restaurant]);
  useEffect(() => { setActiveCategory(''); }, [localMenu, glovoMenu]);

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

  if (!loading && !error && displayableItems.length === 0 && searchTerm.trim() !== '') {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>Aucun plat trouvé pour votre recherche.</p>
      </div>
    );
  }

  if (!loading && !error && localCategories.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>Aucun plat comparable trouvé pour ce restaurant.</p>
        <p>Essayez un autre restaurant ou vérifiez les menus.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-4 text-[#0F172A]">
          {restaurant} Menu Comparison
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Rechercher un plat..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
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

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {localCategories
          .filter(category => getDisplayableCount(category) > 0)
          .map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 text-sm rounded-full border transition-all 
                ${activeCategory === category.id
                  ? 'bg-[#38BDF8] text-white border-[#38BDF8]'
                  : 'bg-white border-gray-300 text-[#0F172A] hover:bg-[#f1f5f9]'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name} ({getDisplayableCount(category)})
            </button>
          ))}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.map(item => {
            const priceDiff = getPriceDifference(item.item);
            const isOverpay = priceDiff.difference > 0;
            return (
              <div
                key={item.item}
                className="rounded-xl overflow-hidden shadow-lg border border-[#e0e7ef] bg-white flex flex-col"
              >
                <div className="px-6 py-4 border-b bg-[#0F172A]">
                  <h3 className="text-lg font-medium text-white">{item.item}</h3>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch justify-between">
                  <div className="flex-1 px-6 py-4 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-[#e0e7ef]">
                    <span className="text-sm text-[#64748b] mb-1">Sur place</span>
                    <span className="text-2xl font-bold text-[#0F172A]">{priceDiff.localPrice.toFixed(2)} DH</span>
                    <span className="text-2xl">🍴</span>
                  </div>
                  <div className="flex-1 px-6 py-4 flex flex-col items-center justify-center">
                    <span className="text-sm text-[#64748b] mb-1">Glovo</span>
                    <span className="text-2xl font-bold text-[#0F172A]">{priceDiff.glovoPrice.toFixed(2)} DH</span>
                    <span className="text-2xl">🛵</span>
                  </div>
                </div>
                <div className={`px-6 py-3 text-center font-semibold text-sm
                  ${isOverpay ? 'bg-[#fee2e2] text-[#b91c1c]' : 'bg-[#d1fae5] text-[#065f46]'}`}>
                  {isOverpay
                    ? <>Vous payez {Math.abs(priceDiff.difference).toFixed(2)} DH de plus sur Glovo</>
                    : <>Vous payez {Math.abs(priceDiff.difference).toFixed(2)} DH de moins sur Glovo</>
                  }
                </div>
              </div>
            );
          })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-full font-semibold bg-[#0F172A] text-white hover:bg-[#38BDF8] hover:text-[#0F172A] transition disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="mx-2 text-lg font-medium text-[#0F172A]">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-full font-semibold bg-[#0F172A] text-white hover:bg-[#38BDF8] hover:text-[#0F172A] transition disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuComparison;