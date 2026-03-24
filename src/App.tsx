import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { RegistrationForm } from './components/RegistrationForm';
import { LandingHero } from './components/LandingHero';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const handleSecretTrigger = () => {
    if (isAdmin) {
      setShowDashboard(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsAdmin(true);
    setShowDashboard(true);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[var(--color-bg-dark)] text-[var(--color-text-light)] w-full overflow-hidden font-sans min-h-screen relative">
      
      {/* Global Background Image (Italian Town with heavy dark overlay) */}
      <div className="fixed inset-0 z-0 pointer-events-none no-print">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15] blur-sm transition-opacity duration-1000 transform scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1473625247510-8b090623a3be?q=80&w=2000&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/90 to-[#050505]"></div>
      </div>

      {/* Zawsze pokazuj Landing Hero */}
      {!showDashboard && <div className="relative z-10"><LandingHero onStart={scrollToForm} /></div>}

      <div id="form-section" className="min-h-screen py-20 px-4 md:px-8 flex flex-col items-center print-clean relative z-10 w-full">
        {/* Seamless width, no cards or borders enclosing the form */}
        <div className="w-full max-w-4xl mx-auto">
          {(!showDashboard) && <Header onSecretTrigger={handleSecretTrigger} />}
          
          <main className={showDashboard ? "" : "mt-12"}>
            {showDashboard ? (
              <AdminDashboard 
                onLogout={() => { setIsAdmin(false); setShowDashboard(false); }} 
                onToggleView={() => setShowDashboard(false)}
              />
            ) : (
              <RegistrationForm />
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showLoginModal && !isAdmin && (
          <AdminLogin 
            onLoginSuccess={handleLoginSuccess} 
            onCancel={() => setShowLoginModal(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
