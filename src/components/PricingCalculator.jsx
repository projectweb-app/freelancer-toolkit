import { useState } from 'react';

function PricingCalculator() {
  const [formData, setFormData] = useState({
    projectType: '',
    experienceLevel: 'Intermediate', // Default value
    projectLength: ''
  });
  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPricing('');

    try {
      // Call our new backend API endpoint
      const response = await fetch('/api/generatePrice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setPricing(data.pricing);
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">AI Smart Pricing Calculator</h2>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <input name="projectType" value={formData.projectType} onChange={handleChange} placeholder="Project Type (e.g., Logo Design)" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>
        <input name="projectLength" value={formData.projectLength} onChange={handleChange} placeholder="Project Size (e.g., small, 1-week)" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        
        <button type="submit" disabled={loading} className="md:col-span-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-500">
          {loading ? 'Calculating...' : '💰 Calculate Price'}
        </button>
      </form>
      
      {/* Output Display */}
      {pricing && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">Pricing Suggestion:</h3>
          <div className="text-gray-300 whitespace-pre-wrap">{pricing}</div>
        </div>
      )}
    </div>
  );
}

export default PricingCalculator;