
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

const AuthNavbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary">
          Auth<span className="text-foreground">Flow</span>
        </Link>
        
        <nav className="hidden md:flex space-x-4 items-center">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md transition hover:text-primary ${
              location.pathname === '/' ? 'text-primary font-medium' : 'text-gray-600'
            }`}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md transition hover:text-primary ${
                  location.pathname === '/dashboard' ? 'text-primary font-medium' : 'text-gray-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className={`px-3 py-2 rounded-md transition hover:text-primary ${
                  location.pathname === '/profile' ? 'text-primary font-medium' : 'text-gray-600'
                }`}
              >
                Profile
              </Link>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <div className="text-sm text-gray-600 mr-2">
                Hi, {user?.username}
              </div>
              <Button 
                variant="outline"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`px-3 py-2 rounded-md transition hover:text-primary ${
                  location.pathname === '/login' ? 'text-primary font-medium' : 'text-gray-600'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`px-3 py-2 rounded-md transition hover:text-primary ${
                  location.pathname === '/register' ? 'text-primary font-medium' : 'text-gray-600'
                }`}
              >
                <Button>Register</Button>
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile menu button - we would implement full mobile menu in a real app */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;
