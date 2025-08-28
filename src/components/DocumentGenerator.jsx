import { useState } from 'react';

function DocumentGenerator() {
  const [formData, setFormData] = useState({
    documentType: 'Contract', // Default to Contract
    clientName: '',
    yourName: '',
    projectName: '',
    projectDescription: '',
    price: '',
    terms: ''
  });
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDocument('');

    try {
      const response = await fetch('/api/generateDocument', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setDocument(data.document);
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
      <h2 className="text-3xl font-bold mb-6 text-white text-center">AI Contract & Invoice Generator</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <select name="documentType" value={formData.documentType} onChange={handleChange} required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2">
          <option value="Contract">Generate a Contract</option>
          <option value="Invoice">Generate an Invoice</option>
        </select>
        <input name="yourName" value={formData.yourName} onChange={handleChange} placeholder="Your Name / Company Name" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Client Name / Company Name" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Project Name" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Total Project Price" required className="p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} placeholder="Project Scope / Itemized Services" required className="md:col-span-2 p-3 bg-gray-700 rounded-md text-white border border-gray-600 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        <textarea name="terms" value={formData.terms} onChange={handleChange} placeholder="Additional Terms or Notes (e.g., payment due in 15 days)" className="md:col-span-2 p-3 bg-gray-700 rounded-md text-white border border-gray-600 h-16 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

        <button type="submit" disabled={loading} className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-500">
          {loading ? 'Generating...' : '📄 Generate Document'}
        </button>
      </form>
      
      {document && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">Generated {formData.documentType}:</h3>
          <div className="text-gray-300 whitespace-pre-wrap">{document}</div>
        </div>
      )}
    </div>
  );
}

export default DocumentGenerator;