import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutContact from './components/AboutContact';
import Services from './components/Services';
import PaymentPage from './components/PaymentPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Output from './components/Output';
import History from './components/History'; // Import History

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [serviceHistory, setServiceHistory] = useState([]); // State for storing service history

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const addServiceToHistory = (service) => {
    setServiceHistory((prevHistory) => [...prevHistory, service]);
  };

  return (
    <Router>
      <Content
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLogin={handleLogin}
        serviceHistory={serviceHistory} // Pass history state to Content
        addServiceToHistory={addServiceToHistory} // Pass function to add service
      />
    </Router>
  );
}

function Content({
  isAuthenticated,
  onLogout,
  onLogin,
  serviceHistory,
  addServiceToHistory,
}) {
  const location = useLocation();

  const showNavbar =
    isAuthenticated &&
    (location.pathname === '/AboutContact' ||
      location.pathname === '/Services' ||
      location.pathname === '/history' || // Include History page
      location.pathname === '/Output' ||
      location.pathname === '/payment/'); // Include Output page if needed

  return (
    <>
      {showNavbar && (
        <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      )}
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
            <Route path="/signup" element={<SignUpPage onSignUp={onLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/AboutContact" element={<AboutContact />} />
            <Route
              path="/Services"
              element={<Services addServiceToHistory={addServiceToHistory} />}
            />
            <Route
              path="/payment/:serviceId"
              element={
                <PaymentPage addServiceToHistory={addServiceToHistory} />
              }
            />
            <Route path="/Output" element={<Output />} />
            <Route
              path="/history"
              element={<History history={serviceHistory} />}
            />{' '}
            {/* Add History Page */}
            <Route path="*" element={<Navigate to="/AboutContact" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
