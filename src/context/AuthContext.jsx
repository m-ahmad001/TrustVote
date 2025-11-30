import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for development
  const mockUser = {
    id: '1',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    email: 'voter@example.com',
    fullName: 'John Doe',
    cnic: '1234567890123',
    role: 'voter',
    isVerified: true,
    createdAt: new Date().toISOString(),
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Login function (mock implementation)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  // Register function (mock implementation)
  const register = async (registrationData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser = {
      id: Date.now().toString(),
      ...registrationData,
      role: 'voter',
      isVerified: false,
      createdAt: new Date().toISOString(),
    };
    
    // Store temporarily until OTP verification
    localStorage.setItem('pendingUser', JSON.stringify(newUser));
    return newUser;
  };

  // Verify OTP function (mock implementation)
  const verifyOTP = async (otp) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock: Accept any 6-digit OTP
    if (otp.length === 6) {
      const pendingUser = localStorage.getItem('pendingUser');
      if (pendingUser) {
        const verifiedUser = JSON.parse(pendingUser);
        verifiedUser.isVerified = true;
        login(verifiedUser);
        localStorage.removeItem('pendingUser');
        return { success: true };
      }
    }
    return { success: false, error: 'Invalid OTP' };
  };

  // Update profile function (mock implementation)
  const updateProfile = async (updates) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    verifyOTP,
    updateProfile,
    mockUser, // For development/testing
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
