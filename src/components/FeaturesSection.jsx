const FeaturesSection = () => (
  <section id="features" className="py-16 bg-white">
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-4">
      <div className="p-8 bg-[#0F172A] rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 transition-transform">
        <span className="text-3xl mb-3">⚡</span>
        <h3 className="text-xl font-bold mb-2 text-white">Résultats instantanés</h3>
        <p className="text-base text-white/80 text-center">Obtenez la comparaison en quelques secondes.</p>
      </div>
      <div className="p-8 bg-[#38BDF8] rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 transition-transform">
        <span className="text-3xl mb-3">📊</span>
        <h3 className="text-xl font-bold mb-2 text-[#0F172A]">Données fiables</h3>
        <p className="text-base text-[#0F172A]/80 text-center">Menus mis à jour et vérifiés.</p>
      </div>
      <div className="p-8 bg-[#0F172A] rounded-2xl shadow-xl flex flex-col items-center hover:scale-105 transition-transform">
        <span className="text-3xl mb-3">🛠️</span>
        <h3 className="text-xl font-bold mb-2 text-white">Contribuez</h3>
        <p className="text-base text-white/80 text-center">Signalez les menus manquants et aidez la communauté.</p>
      </div>
    </div>
  </section>
);

export default FeaturesSection;