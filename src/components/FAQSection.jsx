const FAQSection = () => (
  <section id="faq" className="py-20 bg-white">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#0F172A]">FAQ</h2>
      <div className="space-y-6">
        <div className="bg-[#0F172A] rounded-2xl p-6 shadow flex items-start gap-4">
          <span className="text-2xl text-[#38BDF8]">❓</span>
          <div>
            <h3 className="font-semibold mb-2 text-white">Comment ça marche ?</h3>
            <p className="text-white/80">Choisissez votre ville et restaurant, comparez les prix Glovo et sur place instantanément.</p>
          </div>
        </div>
        <div className="bg-[#0F172A] rounded-2xl p-6 shadow flex items-start gap-4">
          <span className="text-2xl text-[#38BDF8]">🔒</span>
          <div>
            <h3 className="font-semibold mb-2 text-white">Les données sont-elles fiables ?</h3>
            <p className="text-white/80">Oui, elles sont mises à jour régulièrement à partir des menus officiels.</p>
          </div>
        </div>
        <div className="bg-[#0F172A] rounded-2xl p-6 shadow flex items-start gap-4">
          <span className="text-2xl text-[#38BDF8]">🤝</span>
          <div>
            <h3 className="font-semibold mb-2 text-white">Puis-je contribuer ?</h3>
            <p className="text-white/80">Bien sûr ! Signalez les menus manquants ou incorrects via le bouton "Contribuer".</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;