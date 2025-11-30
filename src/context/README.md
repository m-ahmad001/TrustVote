# Context API Documentation

This folder contains all React Context providers for global state management in the TrustVote application.

## Available Contexts

### 1. AuthContext
Manages user authentication state and operations.

**Hook:** `useAuth()`

**State:**
- `user` - Current user object (null if not authenticated)
- `isAuthenticated` - Boolean indicating authentication status
- `isLoading` - Boolean indicating if auth state is being loaded

**Methods:**
- `login(userData)` - Log in a user
- `logout()` - Log out the current user
- `register(registrationData)` - Register a new user
- `verifyOTP(otp)` - Verify OTP code
- `updateProfile(updates)` - Update user profile

**Example:**
```jsx
import { useAuth } from '../context';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.fullName}!</p>
      ) : (
        <button onClick={() => login(userData)}>Login</button>
      )}
    </div>
  );
}
```

### 2. WalletContext
Manages MetaMask wallet connection state.

**Hook:** `useWallet()`

**State:**
- `address` - Connected wallet address
- `isConnected` - Boolean indicating connection status
- `isConnecting` - Boolean indicating connection in progress
- `error` - Error message if connection failed
- `balance` - Wallet balance (mock)

**Methods:**
- `connectWallet()` - Connect to MetaMask wallet
- `disconnectWallet()` - Disconnect wallet
- `switchWallet()` - Switch to a different wallet
- `getTruncatedAddress(addr)` - Get truncated address for display

**Example:**
```jsx
import { useWallet } from '../context';

function WalletButton() {
  const { address, isConnected, connectWallet, getTruncatedAddress } = useWallet();
  
  return (
    <button onClick={connectWallet}>
      {isConnected ? getTruncatedAddress() : 'Connect Wallet'}
    </button>
  );
}
```

### 3. CampaignContext
Manages campaign data and voting operations.

**Hook:** `useCampaign()`

**State:**
- `campaigns` - Array of all campaigns
- `votingRecords` - Object mapping vote records
- `isLoading` - Boolean indicating loading state

**Methods:**
- `getAllCampaigns()` - Get all campaigns
- `getActiveCampaigns()` - Get only active campaigns
- `getCampaignById(id)` - Get specific campaign
- `createCampaign(data)` - Create new campaign
- `updateCampaign(id, updates)` - Update campaign
- `deleteCampaign(id)` - Delete campaign
- `castVote(campaignId, optionId, voterAddress)` - Cast a vote
- `hasVoted(campaignId, voterAddress)` - Check if user voted
- `getVoteRecord(campaignId, voterAddress)` - Get vote record
- `getCampaignResults(campaignId)` - Get campaign results

**Example:**
```jsx
import { useCampaign } from '../context';

function CampaignList() {
  const { getActiveCampaigns, castVote } = useCampaign();
  const campaigns = getActiveCampaigns();
  
  return (
    <div>
      {campaigns.map(campaign => (
        <div key={campaign.id}>
          <h3>{campaign.title}</h3>
          <button onClick={() => castVote(campaign.id, 'opt1', walletAddress)}>
            Vote
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 4. LanguageContext
Manages application language and text direction.

**Hook:** `useLanguage()`

**State:**
- `language` - Current language code ('en' or 'ur')
- `direction` - Text direction ('ltr' or 'rtl')
- `isRTL` - Boolean indicating RTL mode

**Methods:**
- `switchLanguage(newLanguage)` - Switch to specific language
- `toggleLanguage()` - Toggle between English and Urdu

**Example:**
```jsx
import { useLanguage } from '../context';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <button onClick={toggleLanguage}>
      {language === 'en' ? 'اردو' : 'English'}
    </button>
  );
}
```

## Usage

### Import All Hooks
```jsx
import { useAuth, useWallet, useCampaign, useLanguage } from './context';
```

### Using Multiple Contexts
```jsx
import { useAuth, useWallet, useCampaign } from '../context';

function VotingPage() {
  const { user, isAuthenticated } = useAuth();
  const { address, isConnected } = useWallet();
  const { getActiveCampaigns, castVote } = useCampaign();
  
  // Your component logic
}
```

## Mock Data

All contexts include mock data for development:
- **AuthContext**: Mock user with sample credentials
- **WalletContext**: Mock wallet address (0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb)
- **CampaignContext**: 3 sample campaigns with voting data
- **LanguageContext**: English/Urdu language support

## Notes

- All contexts use localStorage for persistence
- No prop drilling required - access state from any component
- All async operations include loading states
- Error handling included in wallet and campaign operations
- Mock implementations simulate API delays for realistic UX
