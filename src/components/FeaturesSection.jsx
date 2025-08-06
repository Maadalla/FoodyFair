const FeaturesSection = () =>  {
    return (
        <div className="py-16 bg-gray-100">
  <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-4 text-center">
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
      <p>Get price comparison in seconds — no login or signup.</p>
    </div>
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Clean Data</h3>
      <p>Menu data is up-to-date and accurate from real CSV sources.</p>
    </div>
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Reports Option</h3>
      <p>Missing menu? Submit it to improve the database for everyone.</p>
    </div>
  </div>
</div>
    );
}
export default FeaturesSection;