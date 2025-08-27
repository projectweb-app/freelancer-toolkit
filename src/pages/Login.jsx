import { useState } from 'react';

// This is a placeholder for our actual supabase client
// We will create this in the next steps
import { supabase } from '../supabaseClient'; 

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Supabase's magic link login/signup function
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Sign in via magic link with your email below</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              id="email"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : <span>Send Magic Link</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;