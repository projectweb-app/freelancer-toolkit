import { supabase } from '../supabaseClient';
import ProposalGenerator from '../components/ProposalGenerator';
import PricingCalculator from '../components/PricingCalculator'; // 1. Import the new component

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
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      
      <main className="flex flex-col items-center gap-12">
        {/* Tool 1 */}
        <ProposalGenerator />

        {/* Tool 2 */}
        <PricingCalculator /> {/* 2. Add the new component here */}
      </main>
    </div>
  );
}

export default Dashboard;```

---
