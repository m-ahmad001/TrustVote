import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { isConnected, address, getTruncatedAddress, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleLogout = () => {
    logout();
    disconnectWallet();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-4 text-primary">
          <div className="size-6 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_319)">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_319">
                  <rect fill="white" height="48" width="48"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em]">
            TrustVote
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          <div className="flex items-center gap-9">
            {isAuthenticated ? (
              <>
                <Link
                  to="/voting"
                  className="text-primary hover:text-accent text-sm font-medium leading-normal transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/campaigns"
                  className="text-primary hover:text-accent text-sm font-medium leading-normal transition-colors"
                >
                  Campaigns
                </Link>
                <Link
                  to="/results"
                  className="text-primary hover:text-accent text-sm font-medium leading-normal transition-colors"
                >
                  Results
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#about"
                  className="text-primary hover:text-accent text-sm font-medium leading-normal transition-colors"
                >
                  About
                </a>
                <a
                  href="#how-it-works"
                  className="text-primary hover:text-accent text-sm font-medium leading-normal transition-colors"
                >
                  How it Works
                </a>
                <a
                  href="#features"
                  className="text-primary hover:text-accent text-sm font-medium leading-normal transition-colors"
                >
                  Features
                </a>
              </>
            )}
          </div>
        </nav>

        {/* Right Side - Wallet & User Menu */}
        <div className="flex items-center gap-4">
          {/* Wallet Connection */}
          {isConnected ? (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-primary font-medium">
                {getTruncatedAddress()}
              </span>
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate">
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </span>
            </button>
          )}

          {/* User Menu (Desktop) */}
          {isAuthenticated && (
            <div className="hidden md:block relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/10 transition-colors"
              >
                <span className="material-symbols-outlined text-primary">
                  account_circle
                </span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-primary">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-muted/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">person</span>
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-primary">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <nav className="px-4 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/voting"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-primary hover:bg-muted/10 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/campaigns"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-primary hover:bg-muted/10 rounded-lg transition-colors"
                >
                  Campaigns
                </Link>
                <Link
                  to="/results"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-primary hover:bg-muted/10 rounded-lg transition-colors"
                >
                  Results
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-primary hover:bg-muted/10 rounded-lg transition-colors"
                >
                  Profile
                </Link>
                <div className="pt-2 border-t border-border">
                  {isConnected ? (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-primary font-medium">
                        {getTruncatedAddress()}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={handleConnectWallet}
                      disabled={isConnecting}
                      className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    >
                      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-primary hover:bg-muted/10 rounded-lg transition-colors"
                >
                  About
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-primary hover:bg-muted/10 rounded-lg transition-colors"
                >
                  How it Works
                </a>
                <a
                  href="#features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-primary hover:bg-muted/10 rounded-lg transition-colors"
                >
                  Features
                </a>
                <div className="pt-2 border-t border-border">
                  <button
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
