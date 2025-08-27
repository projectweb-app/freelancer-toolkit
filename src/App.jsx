import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- 1. SET UP THE SUPABASE CLIENT ---
// Get our secret keys from the .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the 'phone line' to our Supabase database
const supabase = createClient(supabaseUrl, supabaseAnonKey);


function App() {
  // --- 2. SET UP STATE (COMPONENT MEMORY) ---
  const [email, setEmail] = useState(''); // Remembers what the user types in the input
  const [loading, setLoading] = useState(false); // Remembers if we are currently submitting the form
  const [submitted, setSubmitted] = useState(false); // Remembers if the form was submitted successfully

  // --- 3. HANDLE THE FORM SUBMISSION ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop the browser from refreshing the page
    
    setLoading(true); // Start the loading spinner

    // This is the magic line:
    // It says "in our 'waitlist' table, insert a new row with the email from our state"
    const { error } = await supabase.from('waitlist').insert({ email: email });

    if (error) {
      alert('Oops! Something went wrong. Please try again.');
      console.error(error);
    } else {
      setSubmitted(true); // Mark as submitted successfully
    }
    
    setLoading(false); // Stop the loading spinner
  };

  // --- 4. RENDER THE CORRECT VIEW ---
  // If the form has been submitted, show a thank you message
  if (submitted) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-sans p-4 text-center">
        <h1 className="text-5xl font-bold mb-4">🎉 Thank You!</h1>
        <p className="text-xl text-gray-400">You're on the list. We'll be in touch soon.</p>
      </div>
    );
  }

  // Otherwise, show the signup form
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">
          The AI Toolkit That Gets Freelancers Paid
        </h1>
        <p className="text-xl text-gray-400">
          Stop guessing. Start winning. Join the waitlist for your all-in-one AI assistant.
        </p>
      </header>
      
      <section className="w-full max-w-md mb-12">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Enter your email address"
            className="flex-grow p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} // The input value is tied to our state
            onChange={(e) => setEmail(e.target.value)} // When the user types, update our state
            required
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-500"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Joining...' : 'Join the Waitlist'}
          </button>
        </form>
      </section>
      
      {/* (The features section remains the same as before) */}
      <section className="text-center">
        {/* ... feature boxes code ... */}
      </section>
    </div>
  )
}

export default App