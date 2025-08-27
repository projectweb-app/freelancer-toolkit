function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <button 
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          // We will add the logout function later
          onClick={() => alert("Logout functionality to be added!")}
        >
          Logout
        </button>
      </header>
      
      <main>
        <h2 className="text-2xl font-bold mb-6">AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for our future AI tools */}
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold">AI Proposal Generator</h3>
            <p className="text-gray-400 mt-2">Coming Soon...</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold">AI Invoice Generator</h3>
            <p className="text-gray-400 mt-2">Coming Soon...</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold">AI Pricing Calculator</h3>
            <p className="text-gray-400 mt-2">Coming Soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;