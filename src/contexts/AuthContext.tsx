
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../components/ui/use-toast';

// Types
interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (username: string, email: string, password: string, confirm_password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Check for existing auth on page load
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');

      if (storedUser && storedAccessToken) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      }

      setIsLoading(false);
    };

    loadUser();
  }, []);

  // API calls (mocked for now, will be replaced with actual API calls)
  const register = async (username: string, email: string, password: string, confirm_password: string) => {
    try {
      // Validation
      if (password !== confirm_password) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return false;
      }

      // Simulate API call
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser = {
        id: 1,
        username,
        email,
        first_name: '',
        last_name: '',
      };
      
      // Simulate JWT tokens from backend
      const mockAccessToken = 'mock-access-token-' + Math.random().toString(36).substring(2);
      const mockRefreshToken = 'mock-refresh-token-' + Math.random().toString(36).substring(2);
      
      // Store auth data
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('accessToken', mockAccessToken);
      localStorage.setItem('refreshToken', mockRefreshToken);
      
      setUser(mockUser);
      setAccessToken(mockAccessToken);
      setRefreshToken(mockRefreshToken);
      
      toast({
        title: "Success",
        description: "Registration successful!",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user validation - in real app this would be done by the backend
      if (email !== 'demo@example.com' && email !== 'user@example.com') {
        throw new Error("Invalid credentials");
      }
      
      // Mock successful login
      const mockUser = {
        id: 1,
        username: email.split('@')[0],
        email,
        first_name: 'Demo',
        last_name: 'User',
      };
      
      // Simulate JWT tokens from backend
      const mockAccessToken = 'mock-access-token-' + Math.random().toString(36).substring(2);
      const mockRefreshToken = 'mock-refresh-token-' + Math.random().toString(36).substring(2);
      
      // Store auth data
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('accessToken', mockAccessToken);
      localStorage.setItem('refreshToken', mockRefreshToken);
      
      setUser(mockUser);
      setAccessToken(mockAccessToken);
      setRefreshToken(mockRefreshToken);
      
      toast({
        title: "Success",
        description: "Login successful!",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password. Try demo@example.com with any password.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear auth data
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      // Update user data
      const updatedUser = { ...user, ...userData };
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
