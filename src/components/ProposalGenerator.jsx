import { useState } from 'react';

function ProposalGenerator() {
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    projectDescription: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProposal(''); // Clear previous proposal

    try {
      // This is the key part: our frontend calls our backend API endpoint
      const response = await fetch('/api/generateProposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setProposal(data.proposal);
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
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">AI Proposal Generator</h2>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Client Name" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Project Name / Title" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} placeholder="Briefly describe the project and what you will deliver..." required className="md:col-span-2 p-3 bg-gray-700 rounded-md text-white border border-gray-600 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Project Price (e.g., $1,500)" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" disabled={loading} className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-500">
          {loading ? 'Generating...' : '✨ Generate Proposal'}
        </button>
      </form>
      
      {/* Output Display */}
      {proposal && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">Generated Proposal:</h3>
          {/* Using whitespace-pre-wrap to respect line breaks from the AI */}
          <p className="text-gray-300 whitespace-pre-wrap">{proposal}</p>
        </div>
      )}
    </div>
  );
}

export default ProposalGenerator;