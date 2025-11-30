import { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState('0');

  // Mock wallet address for development
  const mockAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  // Initialize wallet state from localStorage
  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    const storedConnected = localStorage.getItem('walletConnected');
    
    if (storedAddress && storedConnected === 'true') {
      setAddress(storedAddress);
      setIsConnected(true);
      // Mock balance
      setBalance('1.5');
    }
  }, []);

  // Connect wallet function (mock implementation)
  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock: Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        // For development, use mock address
        console.warn('MetaMask not detected, using mock wallet');
        setAddress(mockAddress);
        setIsConnected(true);
        setBalance('1.5');
        localStorage.setItem('walletAddress', mockAddress);
        localStorage.setItem('walletConnected', 'true');
        return { address: mockAddress };
      }

      // If MetaMask is available, try to connect
      // This is commented out for mock implementation
      // const accounts = await window.ethereum.request({ 
      //   method: 'eth_requestAccounts' 
      // });
      // const walletAddress = accounts[0];
      
      // For now, use mock address
      const walletAddress = mockAddress;
      setAddress(walletAddress);
      setIsConnected(true);
      setBalance('1.5');
      localStorage.setItem('walletAddress', walletAddress);
      localStorage.setItem('walletConnected', 'true');
      
      return { address: walletAddress };
    } catch (err) {
      const errorMessage = err.message || 'Failed to connect wallet';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    setBalance('0');
    setError(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletConnected');
  };

  // Get truncated address for display
  const getTruncatedAddress = (addr = address) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Switch wallet function (mock implementation)
  const switchWallet = async () => {
    disconnectWallet();
    return await connectWallet();
  };

  // Listen for account changes (mock implementation)
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
        }
      };

      const handleChainChanged = () => {
        // Reload the page on chain change
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [address]);

  const value = {
    address,
    isConnected,
    isConnecting,
    error,
    balance,
    connectWallet,
    disconnectWallet,
    switchWallet,
    getTruncatedAddress,
    mockAddress, // For development/testing
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default WalletContext;
