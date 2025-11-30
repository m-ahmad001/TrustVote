import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import {
  validateEmail,
  validateCNIC,
  validateFullName,
  getEmailError,
  getCNICError,
  getFullNameError,
} from '../utils/validation';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { address, isConnected, connectWallet, isConnecting } = useWallet();

  // Form state
  const [formData, setFormData] = useState({
    walletAddress: '',
    email: '',
    fullName: '',
    cnic: '',
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Update wallet address when connected
  useEffect(() => {
    if (address) {
      setFormData((prev) => ({ ...prev, walletAddress: address }));
    }
  }, [address]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle input blur (mark as touched and validate)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'email':
        error = getEmailError(value);
        break;
      case 'fullName':
        error = getFullNameError(value);
        break;
      case 'cnic':
        error = getCNICError(value);
        break;
      default:
        break;
    }
    
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === '';
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.walletAddress) {
      newErrors.walletAddress = 'Please connect your wallet first';
    }
    
    const emailError = getEmailError(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const nameError = getFullNameError(formData.fullName);
    if (nameError) newErrors.fullName = nameError;
    
    const cnicError = getCNICError(formData.cnic);
    if (cnicError) newErrors.cnic = cnicError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    // Mark all fields as touched
    setTouched({
      walletAddress: true,
      email: true,
      fullName: true,
      cnic: true,
    });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Register user (mock - stores in context)
      await register(formData);
      
      // Navigate to OTP verification page
      navigate('/verify-otp');
    } catch (error) {
      setSubmitError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle wallet connection
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        walletAddress: 'Failed to connect wallet. Please try again.',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex flex-col items-center w-full px-4 py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex flex-wrap justify-between gap-3 p-4 text-center">
            <div className="flex w-full flex-col gap-3">
              <p className="text-primary text-4xl font-black leading-tight tracking-[-0.033em]">
                Create Your Voter Account
              </p>
              <p className="text-muted-foreground text-base font-normal leading-normal">
                Connect your wallet and fill in your details to get started.
              </p>
            </div>
          </div>

          {/* Wallet Connection Status */}
          <div
            className={`flex items-center justify-center gap-4 bg-card px-4 min-h-14 my-6 rounded-lg border ${
              isConnected
                ? 'border-green-200 bg-green-50'
                : 'border-border bg-card'
            }`}
          >
            <div
              className={`flex items-center justify-center rounded-full shrink-0 size-6 ${
                isConnected ? 'text-green-500' : 'text-red-500'
              }`}
            >
              <span className="material-symbols-outlined">
                {isConnected ? 'check_circle' : 'cancel'}
              </span>
            </div>
            <p className="text-foreground text-base font-medium leading-normal flex-1 truncate">
              {isConnected ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Not Connected'}
            </p>
            {!isConnected && (
              <button
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="text-sm font-medium text-secondary hover:underline disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Now'}
              </button>
            )}
          </div>

          {/* Registration Form */}
          <div className="bg-card p-6 sm:p-8 rounded-xl shadow-sm border border-border">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {/* Wallet Address Field */}
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-foreground text-base font-medium leading-normal pb-2">
                    Wallet Address
                  </p>
                  <input
                    type="text"
                    name="walletAddress"
                    value={formData.walletAddress}
                    readOnly
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-muted-foreground focus:outline-0 focus:ring-0 border border-border bg-muted h-14 p-[15px] text-base font-normal leading-normal cursor-not-allowed"
                    placeholder="Auto-populated after connection"
                  />
                  {touched.walletAddress && errors.walletAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.walletAddress}</p>
                  )}
                </label>

                {/* Email Field */}
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-foreground text-base font-medium leading-normal pb-2">
                    Email
                  </p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 border bg-background h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : touched.email && !errors.email
                        ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                    }`}
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                  {touched.email && !errors.email && formData.email && (
                    <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      Valid email
                    </p>
                  )}
                </label>

                {/* Full Name Field */}
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-foreground text-base font-medium leading-normal pb-2">
                    Full Name
                  </p>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 border bg-background h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal ${
                      touched.fullName && errors.fullName
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : touched.fullName && !errors.fullName
                        ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                  {touched.fullName && !errors.fullName && formData.fullName && (
                    <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      Valid name
                    </p>
                  )}
                </label>

                {/* CNIC Field */}
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-foreground text-base font-medium leading-normal pb-2">
                    CNIC
                  </p>
                  <input
                    type="text"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 border bg-background h-14 placeholder:text-muted-foreground p-[15px] text-base font-normal leading-normal ${
                      touched.cnic && errors.cnic
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : touched.cnic && !errors.cnic
                        ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                        : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                    }`}
                    placeholder="e.g. 12345-1234567-1"
                  />
                  {touched.cnic && errors.cnic && (
                    <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>
                  )}
                  {touched.cnic && !errors.cnic && formData.cnic && (
                    <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      Valid CNIC
                    </p>
                  )}
                </label>
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isConnected}
                className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-4 bg-primary text-primary-foreground text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                <span className="truncate">
                  {isSubmitting ? 'Registering...' : 'Register & Verify Wallet'}
                </span>
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-medium text-secondary hover:underline"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
