import { useState } from 'react';
import { Navbar } from '../components';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useLanguage } from '../context/LanguageContext';

export default function UserProfile() {
  const { user, updateProfile, mockUser } = useAuth();
  const { address, isConnected, switchWallet, getTruncatedAddress } = useWallet();
  const { language, toggleLanguage } = useLanguage();
  
  // Use mockUser if no user is logged in (for development)
  const currentUser = user || mockUser;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form data
      setFormData({
        fullName: currentUser?.fullName || '',
        email: currentUser?.email || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Update profile through AuthContext
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleWalletChange = async () => {
    try {
      await switchWallet();
    } catch (error) {
      console.error('Failed to switch wallet:', error);
    }
  };

  const handleCopyAddress = () => {
    const walletAddress = address || currentUser?.walletAddress;
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Get wallet address for display
  const walletAddress = address || currentUser?.walletAddress;
  const displayAddress = walletAddress ? getTruncatedAddress(walletAddress) : 'Not connected';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="w-full max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="flex h-full min-h-[auto] flex-col justify-start bg-card p-4 rounded-xl shadow-sm border border-border">
              <div className="flex flex-col gap-6">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full size-12 flex items-center justify-center text-xl font-bold">
                    {currentUser?.fullName?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-foreground text-base font-semibold leading-normal">
                      {currentUser?.fullName || 'User'}
                    </h1>
                    <p className="text-muted-foreground text-sm font-normal leading-normal capitalize">
                      {currentUser?.role || 'Voter'}
                    </p>
                  </div>
                </div>

                {/* Navigation Menu */}
                <div className="flex flex-col gap-2">
                  <a 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
                    href="#"
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                      person
                    </span>
                    <p className="text-sm font-medium leading-normal">Personal Information</p>
                  </a>
                  <a 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    href="#"
                  >
                    <span className="material-symbols-outlined">lock</span>
                    <p className="text-sm font-medium leading-normal">Security</p>
                  </a>
                  <a 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    href="#"
                  >
                    <span className="material-symbols-outlined">settings</span>
                    <p className="text-sm font-medium leading-normal">Account Settings</p>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 bg-card p-6 md:p-8 rounded-xl shadow-sm border border-border">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 pb-6 border-b border-border">
              <p className="text-foreground text-3xl font-bold leading-tight tracking-tight">
                Personal Information
              </p>
              <button
                onClick={handleEditToggle}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isEditing
                    ? 'text-foreground bg-muted border border-border hover:bg-muted/80'
                    : 'text-primary-foreground bg-primary hover:bg-primary/90'
                }`}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Form Fields */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Full Name Field */}
              <div className="flex flex-col">
                <label className="flex flex-col">
                  <p className="text-foreground text-sm font-medium leading-normal pb-2">
                    Full Name
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-lg">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border h-12 placeholder:text-muted-foreground p-3 text-sm font-normal leading-normal ${
                        !isEditing ? 'bg-muted cursor-not-allowed' : 'bg-background'
                      }`}
                    />
                  </div>
                </label>
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label className="flex flex-col">
                  <p className="text-foreground text-sm font-medium leading-normal pb-2">
                    Email Address
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-lg">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border h-12 placeholder:text-muted-foreground p-3 text-sm font-normal leading-normal ${
                        !isEditing ? 'bg-muted cursor-not-allowed' : 'bg-background'
                      }`}
                    />
                  </div>
                </label>
              </div>

              {/* CNIC Field (Read-only) */}
              <div className="flex flex-col">
                <label className="flex flex-col">
                  <p className="text-foreground text-sm font-medium leading-normal pb-2">
                    CNIC
                  </p>
                  <div className="flex w-full flex-1 items-center rounded-lg border border-border bg-muted h-12 px-3">
                    <span className="text-muted-foreground text-sm">
                      {currentUser?.cnic ? 
                        `${currentUser.cnic.slice(0, 5)}-*******-${currentUser.cnic.slice(-1)}` : 
                        '42101-*******-9'
                      }
                    </span>
                  </div>
                </label>
              </div>

              {/* Role Badge */}
              <div className="flex flex-col">
                <p className="text-foreground text-sm font-medium leading-normal pb-2">
                  User Role
                </p>
                <div className="flex items-center h-12">
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full capitalize">
                    {currentUser?.role || 'Voter'}
                  </span>
                </div>
              </div>

              {/* Wallet Address Field */}
              <div className="flex flex-col col-span-1 md:col-span-2">
                <p className="text-foreground text-sm font-medium leading-normal pb-2">
                  Linked Wallet Address
                </p>
                <div className="flex w-full flex-1 items-stretch rounded-lg border border-border bg-muted h-12">
                  <div className="flex-1 flex items-center px-3">
                    <p className="truncate text-muted-foreground text-sm font-mono">
                      {walletAddress || 'Not connected'}
                    </p>
                    {isConnected && (
                      <div className="ml-2 w-2 h-2 bg-green-500 rounded-full" title="Connected"></div>
                    )}
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    disabled={!walletAddress}
                    className="text-muted-foreground hover:text-primary flex items-center justify-center px-3 border-l border-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Copy address"
                  >
                    <span className="material-symbols-outlined text-base">
                      {copySuccess ? 'check' : 'content_copy'}
                    </span>
                  </button>
                  <button
                    onClick={handleWalletChange}
                    className="text-muted-foreground hover:text-primary flex items-center justify-center px-3 border-l border-border transition-colors"
                    title="Change wallet"
                  >
                    <span className="material-symbols-outlined text-base">
                      swap_horiz
                    </span>
                  </button>
                </div>
              </div>

              {/* Language Preference */}
              <div className="flex flex-col col-span-1 md:col-span-2">
                <p className="text-foreground text-sm font-medium leading-normal pb-2">
                  Language Preference
                </p>
                <div className="flex items-center gap-4 h-12">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      language
                    </span>
                    <span className="text-sm font-medium">
                      {language === 'en' ? 'English' : 'اردو'}
                    </span>
                    <span className="material-symbols-outlined text-base">
                      swap_horiz
                    </span>
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Current: {language === 'en' ? 'English' : 'Urdu'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons (only show when editing) */}
            {isEditing && (
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                <button
                  onClick={handleEditToggle}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-semibold text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
