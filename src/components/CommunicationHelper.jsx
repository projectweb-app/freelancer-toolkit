import { useState } from 'react';

function CommunicationHelper() {
  const [formData, setFormData] = useState({
    context: '',
    tone: 'Professional & Friendly' // Default value
  });
  const [loading, setLoading] = useState(false);
  const [communication, setCommunication] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCommunication('');

    try {
      // Call our newest backend API endpoint
      const response = await fetch('/api/generateCommunication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setCommunication(data.communication);
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
      <h2 className="text-3xl font-bold mb-6 text-white text-center">AI Client Communication Helper</h2>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mb-8">
        <textarea 
          name="context" 
          value={formData.context} 
          onChange={handleChange} 
          placeholder="What's the situation? (e.g., 'Client is asking for work outside the original scope', 'Client has missed a payment deadline')" 
          required 
          className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <select 
            name="tone" 
            value={formData.tone} 
            onChange={handleChange} 
            required 
            className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Professional & Friendly</option>
            <option>Firm & Direct</option>
            <option>Understanding & Flexible</option>
            <option>Brief & Informative</option>
          </select>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-500"
          >
            {loading ? 'Drafting...' : '✍️ Draft Response'}
          </button>
        </div>
      </form>
      
      {/* Output Display */}
      {communication && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">Suggested Response:</h3>
          <div className="text-gray-300 whitespace-pre-wrap">{communication}</div>
        </div>
      )}
    </div>
  );
}

export default CommunicationHelper;