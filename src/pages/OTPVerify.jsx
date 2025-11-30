import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OTPVerify() {
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();
  
  // OTP input state - array of 6 digits
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Timer state (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  
  // Refs for input fields
  const inputRefs = useRef([]);
  
  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle input change
  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle keydown for navigation and backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty, clear previous and focus it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      
      // Focus the next empty input or last input
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };
  
  // Handle verify button click
  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    
    try {
      const result = await verifyOTP(otpCode);
      
      if (result.success) {
        // Navigate to voting page on success
        navigate('/voting');
      } else {
        setError(result.error || 'Invalid OTP code. Please try again');
      }
    } catch (err) {
      setError('Verification failed. Please try again');
    } finally {
      setIsVerifying(false);
    }
  };
  
  // Handle resend OTP
  const handleResend = () => {
    // Mock resend - reset timer
    setTimeLeft(300);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };
  
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center overflow-x-hidden p-4 bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full px-4 sm:px-8 md:px-10 lg:px-20">
        <header className="flex items-center justify-between whitespace-nowrap py-6">
          <div className="flex items-center gap-3 text-primary">
            <div className="size-6">
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
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">De-Vote</h2>
          </div>
        </header>
      </div>
      
      {/* Main Content */}
      <main className="w-full max-w-md">
        <div className="bg-card shadow-xl rounded-xl p-8 space-y-8 border border-border">
          {/* Title Section */}
          <div className="text-center space-y-2">
            <h1 className="text-primary text-3xl font-black leading-tight tracking-[-0.033em]">
              Verify Your Identity
            </h1>
            <p className="text-muted-foreground text-base font-normal leading-normal">
              We've sent a 6-digit verification code to your registered email address.
            </p>
          </div>
          
          {/* OTP Input Fields */}
          <div className="flex flex-col items-center space-y-6">
            <fieldset className="relative flex gap-2 sm:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="number"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="flex h-14 w-12 text-center text-lg font-bold [appearance:textfield] focus:outline-none focus:ring-2 focus:ring-secondary bg-background border border-border rounded-lg text-foreground transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </fieldset>
            
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>
          
          {/* Verify Button */}
          <div className="w-full">
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-primary-foreground text-base font-bold leading-normal tracking-[0.015em] hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate">
                {isVerifying ? 'Verifying...' : 'Verify'}
              </span>
            </button>
          </div>
          
          {/* Timer and Resend */}
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              Code expires in <span className="font-bold text-accent">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Didn't receive a code?{' '}
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="font-bold text-primary hover:underline focus:outline-none"
                >
                  Resend
                </button>
              ) : (
                <span className="font-bold text-muted-foreground">Resend</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
