import { supabase } from '../supabaseClient';
import ProposalGenerator from '../components/ProposalGenerator'; // Import our new component

function Dashboard() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <header className="flex justify-between items-center mb-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <button 
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          onClick={handleLogout} // This is the real logout function
        >
          Logout
        </button>
      </header>
      
      <main>
        {/* We are placing the Proposal Generator component right here */}
        <ProposalGenerator />
      </main>
    </div>
  );
}

export default Dashboard;