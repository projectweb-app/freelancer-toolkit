import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check for an active session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in authentication state (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Clean up the listener when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {/* If there is no session, show the Login page. Otherwise, show the Dashboard. */}
      {!session ? <Login /> : <Dashboard key={session.user.id} session={session} />}
    </div>
  );
}

export default App;