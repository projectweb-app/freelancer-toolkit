import { supabase } from '../supabaseClient';
import ProposalGenerator from '../components/ProposalGenerator';
import PricingCalculator from '../components/PricingCalculator';
import CommunicationHelper from '../components/CommunicationHelper';
import DocumentGenerator from '../components/DocumentGenerator'; // 1. Import the new component

function Dashboard() {
  const handleLogout = async () => {
    // ... (logout function remains the same)
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <header className="flex justify-between items-center mb-12 max-w-6xl mx-auto">
        {/* ... (header remains the same) ... */}
      </header>
      
      <main className="flex flex-col items-center gap-12">
        {/* Tool 1 */}
        <ProposalGenerator />

        {/* Tool 2 */}
        <PricingCalculator />

        {/* Tool 3 */}
        <CommunicationHelper />
        
        {/* Tool 4 */}
        <DocumentGenerator /> {/* 2. Add the new component here */}
      </main>
    </div>
  );
}

export default Dashboard;