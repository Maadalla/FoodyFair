const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow">
          Stop Overpaying on Glovo — <br className="hidden md:inline" />
          Get Real Prices Instantly
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90 font-medium">
          Compare delivery vs. in-store pricing in seconds—no login needed.
        </p>
        <a
          href="#city-selector"
          className="bg-yellow-500 text-white uppercase px-8 py-4 rounded-full font-bold shadow-lg hover:bg-yellow-600 transition-all duration-150 tracking-wide text-lg"
        >
          Compare Now &rarr;
        </a>
        <div className="mt-2 text-white/90 text-base font-semibold">
          <span className="bg-white/20 px-3 py-1 rounded-full inline-block">
            On average, Glovo prices are{" "}
            <span className="text-yellow-200 font-bold">30% higher</span> than
            in-store!
          </span>
        </div>
        <div className="mt-6">
          <a
            href="#features"
            className="underline text-white/80 hover:text-white transition"
          >
            Learn How It Works
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;