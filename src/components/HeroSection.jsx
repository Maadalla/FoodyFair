const HeroSection = ({ scrollToComparison }) => (
  <section className="py-24 bg-[#0F172A] text-white text-center">
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow">
        Arrêtez de surpayer sur Glovo
      </h1>
      <p className="text-xl md:text-2xl mb-8 font-medium">
        Comparez les prix livraison et restaurant en quelques secondes. Simple,
        rapide, sans inscription.
      </p>
      <button
        type="button"
        onClick={scrollToComparison}
        className="bg-[#38BDF8] text-[#0F172A] uppercase px-8 py-4 rounded-full font-bold shadow-lg hover:bg-white hover:text-[#0F172A] transition-all duration-150 tracking-wide text-lg"
      >
        Comparez maintenant &rarr;
      </button>
    </div>
  </section>
);

export default HeroSection;