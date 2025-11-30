/**
 * Validation utility functions for form inputs
 */

/**
 * Validate email format using regex pattern
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate CNIC format (13 digits)
 * @param {string} cnic - CNIC number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateCNIC = (cnic) => {
  if (!cnic) return false;
  // Remove any dashes or spaces
  const cleanCNIC = cnic.replace(/[-\s]/g, '');
  // Check if it's exactly 13 digits
  const cnicRegex = /^\d{13}$/;
  return cnicRegex.test(cleanCNIC);
};

/**
 * Validate wallet address format (42-char hex starting with 0x)
 * @param {string} address - Wallet address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateWalletAddress = (address) => {
  if (!address) return false;
  // Check if it's 42 characters, starts with 0x, and contains only hex characters
  const walletRegex = /^0x[a-fA-F0-9]{40}$/;
  return walletRegex.test(address);
};

/**
 * Truncate wallet address for display (0x1234...5678)
 * @param {string} address - Full wallet address
 * @returns {string} - Truncated address
 */
export const truncateAddress = (address) => {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date and time to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date and time string
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Validate full name (at least 2 characters, letters and spaces only)
 * @param {string} name - Full name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateFullName = (name) => {
  if (!name) return false;
  const trimmedName = name.trim();
  // At least 2 characters, letters, spaces, and common name characters
  const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
  return nameRegex.test(trimmedName);
};

/**
 * Get validation error message for email
 * @param {string} email - Email to validate
 * @returns {string} - Error message or empty string if valid
 */
export const getEmailError = (email) => {
  if (!email) return 'Email is required';
  if (!validateEmail(email)) return 'Please enter a valid email address';
  return '';
};

/**
 * Get validation error message for CNIC
 * @param {string} cnic - CNIC to validate
 * @returns {string} - Error message or empty string if valid
 */
export const getCNICError = (cnic) => {
  if (!cnic) return 'CNIC is required';
  const cleanCNIC = cnic.replace(/[-\s]/g, '');
  if (cleanCNIC.length !== 13) return 'CNIC must be exactly 13 digits';
  if (!/^\d+$/.test(cleanCNIC)) return 'CNIC must contain only numbers';
  return '';
};

/**
 * Get validation error message for wallet address
 * @param {string} address - Wallet address to validate
 * @returns {string} - Error message or empty string if valid
 */
export const getWalletAddressError = (address) => {
  if (!address) return 'Wallet address is required';
  if (!validateWalletAddress(address)) {
    return 'Please enter a valid wallet address (42 characters starting with 0x)';
  }
  return '';
};

/**
 * Get validation error message for full name
 * @param {string} name - Full name to validate
 * @returns {string} - Error message or empty string if valid
 */
export const getFullNameError = (name) => {
  if (!name) return 'Full name is required';
  const trimmedName = name.trim();
  if (trimmedName.length < 2) return 'Name must be at least 2 characters';
  if (!validateFullName(name)) return 'Please enter a valid name (letters and spaces only)';
  return '';
};
