# Design Document

## Overview

This design document outlines the architecture and implementation approach for a blockchain-based decentralized voting application. The system is designed as a Final Year Project (FYP) with simplicity and educational value in mind, using React JS, Tailwind CSS, shadcn/ui components, Node.js backend, Ethereum smart contracts, and MongoDB database. The design prioritizes clean, minimal aesthetics with a light theme and straightforward component structure suitable for developers with 1 year of experience.

## Architecture

### High-Level Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React Frontend│◄───────►│  Node.js Backend│◄───────►│    MongoDB      │
│   (Tailwind +   │         │   (REST API)    │         │   (User Data)   │
│    shadcn/ui)   │         └─────────────────┘         └─────────────────┘
└────────┬────────┘                  │
         │                           │
         │                           ▼
         │                  ┌─────────────────┐
         └─────────────────►│  Ethereum Smart │
           (MetaMask)       │    Contracts    │
                            │  (Vote Storage) │
                            └─────────────────┘
```

### Technology Stack

- **Frontend**: React JS 18+, React Router v6, Tailwind CSS, shadcn/ui components
- **State Management**: React Context API (simple, no Redux)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Blockchain**: Ethereum (Sepolia testnet for development), ethers.js v6
- **Wallet Connection**: MetaMask via ethers.js BrowserProvider
- **Authentication**: JWT tokens + OTP verification via email
- **Email Service**: Nodemailer or similar for OTP delivery

### Folder Structure (Simple Approach)

```
src/
├── components/           # All reusable UI components
│   ├── LandingHero.jsx
│   ├── FeatureCard.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── CampaignCard.jsx
│   ├── VoteOption.jsx
│   ├── ResultsChart.jsx
│   └── WalletConnect.jsx
├── pages/               # All page components
│   ├── Landing.jsx
│   ├── Register.jsx
│   ├── OTPVerify.jsx
│   ├── Voting.jsx
│   ├── Results.jsx
│   ├── CampaignManagement.jsx
│   ├── AddMember.jsx
│   ├── CampaignDetails.jsx
│   └── UserProfile.jsx
├── utils/               # Helper functions
│   ├── blockchain.js   # ethers.js and thirdweb integration
│   ├── api.js          # API calls to backend
│   └── validation.js   # Form validation helpers
├── App.jsx             # Main app with routing
├── index.css           # Tailwind imports + custom styles
└── main.jsx            # Entry point
```

## Components and Interfaces

### Color System (Tailwind Configuration)
we are using tailwind css v4 so use tha latest approched for themeing
```javascript

// src/index.css
@tailwind base;

:root {
  --radius: 0.625rem;

  /* Base Colors (unchanged unless requested) */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* NEW THEME COLORS */
  /* Primary: #123962 */
  --primary: oklch(0.384 0.051 255.42);
  --primary-foreground: oklch(0.985 0 0);

  /* Secondary: #2754ba */
  --secondary: oklch(0.537 0.169 263.59);
  --secondary-foreground: oklch(0.205 0 0);

  /* Accent: #00aee6 */
  --accent: oklch(0.746 0.184 223.79);
  --accent-foreground: oklch(0.205 0 0);

  /* Supporting: #799eb2 */
  --muted: oklch(0.702 0.053 239.61);
  --muted-foreground: oklch(0.556 0 0);

  /* Supporting-light: #b1d4e5 */
  --supporting-light: oklch(0.841 0.053 238.65);

  /* Destructive (kept as original unless you want custom red) */
  --destructive: oklch(0.577 0.245 27.325);

  /* Borders, inputs, rings (neutral tones) */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  /* Charts (kept original unless you want matching theme tones) */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);

  /* Sidebar */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.384 0.051 255.42);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.746 0.184 223.79);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

```

### Component Specifications

#### 1. Navbar Component
- **Purpose**: Global navigation across all pages
- **Props**: `userRole` (voter/organizer/admin), `isAuthenticated` (boolean)
- **Features**:
  - Logo on left (text-based: "TrustVote")
  - Navigation links: Home, Dashboard, Campaigns, Results
  - Wallet connection status indicator (address truncated: 0x1234...5678)
  - User profile dropdown on right
  - Responsive hamburger menu for mobile
- **Styling**: Fixed top, white background, border-bottom with supporting-light color, primary text color

#### 2. LandingHero Component
- **Purpose**: Hero section of landing page
- **Features**:
  - Main headline: "Secure Voting Powered by Blockchain"
  - Subheading with transparency message
  - Two CTA buttons: "Start Voting" (accent color), "Create a Campaign" (secondary color)
  - Simple blockchain chain SVG illustration (3-4 connected blocks)
- **Layout**: Centered content, max-width container, padding for mobile
- **Styling**: Light background, primary color for headline, supporting color for subheading

#### 3. FeatureCard Component
- **Purpose**: Display individual feature benefits
- **Props**: `icon` (React icon component), `title`, `description`, `accentColor`
- **Features**:
  - Icon at top (size: 48px)
  - Title in primary color
  - Description in supporting color
  - Left border accent (4px width)
  - Hover effect: slight shadow and border color change
- **Layout**: Card with padding, white background, rounded corners
- **Styling**: Border-l-4 with accent color, transition on hover

#### 4. WalletConnect Component
- **Purpose**: MetaMask wallet connection interface
- **Props**: `onConnect` (callback function)
- **Features**:
  - "Connect Wallet" button when disconnected
  - Display connected address when connected (truncated)
  - MetaMask icon
  - Connection status indicator (green dot for connected)
  - Error message display for connection failures
- **Styling**: Accent color button, inline status display

#### 5. CampaignCard Component
- **Purpose**: Display campaign summary in lists
- **Props**: `campaign` (object with id, title, description, status, endDate, totalVotes)
- **Features**:
  - Campaign title (primary color, bold)
  - Short description (2 lines max, ellipsis)
  - Status badge (Active/Closed) with color coding
  - End date display
  - Total votes count
  - "View Details" or "Vote Now" button based on status
- **Layout**: Card layout, white background, border
- **Styling**: Hover effect with shadow, status badge with accent/supporting colors

#### 6. VoteOption Component
- **Purpose**: Individual voting option with radio button
- **Props**: `option` (object with id, name, description), `selected` (boolean), `onSelect` (callback)
- **Features**:
  - Radio button (custom styled)
  - Option name (bold)
  - Optional description
  - Selected state with accent border
  - Disabled state for already voted
- **Layout**: Full-width card, padding
- **Styling**: Border changes to accent when selected, cursor pointer

#### 7. ResultsChart Component
- **Purpose**: Display voting results with bar charts
- **Props**: `results` (array of {option, votes, percentage})
- **Features**:
  - Option name on left
  - Horizontal bar showing percentage
  - Vote count and percentage on right
  - Different colors for each option (accent, secondary, primary rotation)
  - Animated bar fill (simple CSS transition)
- **Layout**: Stacked bars with spacing
- **Styling**: Rounded bars, smooth transitions

### Page Layouts

#### Landing Page Layout
```
┌─────────────────────────────────────┐
│           Navbar                    │
├─────────────────────────────────────┤
│                                     │
│         Hero Section                │
│    (Headline + CTAs + Visual)       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│        About Section                │
│     (Feature Description)           │
│                                     │
├─────────────────────────────────────┤
│                                     │
│      How It Works Section           │
│    (3-Step Visual Guide)            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│       Features Grid                 │
│   (4 Feature Cards in 2x2)          │
│                                     │
├─────────────────────────────────────┤
│           Footer                    │
└─────────────────────────────────────┘
```

#### Register Page Layout
```
┌─────────────────────────────────────┐
│           Navbar                    │
├─────────────────────────────────────┤
│                                     │
│    ┌─────────────────────────┐     │
│    │   Registration Form     │     │
│    │                         │     │
│    │  Wallet Address Field   │     │
│    │  Email Field            │     │
│    │  Full Name Field        │     │
│    │  CNIC Field             │     │
│    │                         │     │
│    │  [Register & Verify]    │     │
│    │                         │     │
│    │  Wallet Status: ✓       │     │
│    └─────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

#### Voting Page Layout
```
┌─────────────────────────────────────┐
│           Navbar                    │
├─────────────────────────────────────┤
│  Active Campaigns                   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Campaign Card 1            │   │
│  │  [Vote Now]                 │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Campaign Card 2            │   │
│  │  [Vote Now]                 │   │
│  └─────────────────────────────┘   │
│                                     │
│  Wallet: 0x1234...5678 ✓            │
│  One vote per wallet                │
└─────────────────────────────────────┘
```

#### Results Dashboard Layout
```
┌─────────────────────────────────────┐
│           Navbar                    │
├─────────────────────────────────────┤
│  Campaign: Presidential Election    │
│  Status: Active  🔴 Live Updates    │
│                                     │
│  Total Votes: 1,234                 │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Results Chart              │   │
│  │  Option A: ████████ 45%     │   │
│  │  Option B: ██████████ 55%   │   │
│  └─────────────────────────────┘   │
│                                     │
│  Last Updated: 2 seconds ago        │
└─────────────────────────────────────┘
```

#### Campaign Management Layout
```
┌─────────────────────────────────────┐
│           Navbar                    │
├─────────────────────────────────────┤
│  Campaign Management                │
│  [+ Create New Campaign]            │
│                                     │
│  My Campaigns:                      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Campaign 1  [Edit] [Delete]│   │
│  │  Status: Active              │   │
│  │  Votes: 234                  │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Campaign 2  [Edit] [Delete]│   │
│  │  Status: Closed              │   │
│  │  Votes: 567                  │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## Data Models

### User Model (MongoDB)
```javascript
{
  _id: ObjectId,
  walletAddress: String (unique, indexed),
  email: String (unique, required),
  fullName: String (required),
  cnic: String (unique, required, 13 digits),
  role: String (enum: ['voter', 'organizer', 'admin']),
  isVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Campaign Model (MongoDB)
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  organizerId: ObjectId (ref: User),
  options: [
    {
      id: String,
      name: String,
      description: String
    }
  ],
  startDate: Date,
  endDate: Date,
  status: String (enum: ['draft', 'active', 'closed']),
  allowedVoters: [String] (array of wallet addresses),
  smartContractAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Vote Model (Blockchain - Smart Contract)
```solidity
struct Vote {
  address voter;
  uint256 campaignId;
  uint256 optionId;
  uint256 timestamp;
}

mapping(uint256 => mapping(address => bool)) public hasVoted;
mapping(uint256 => mapping(uint256 => uint256)) public voteCounts;
```

### OTP Model (MongoDB - Temporary)
```javascript
{
  _id: ObjectId,
  email: String (indexed),
  otp: String (6 digits),
  expiresAt: Date (5 minutes from creation),
  verified: Boolean (default: false),
  createdAt: Date
}
```

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register new user with wallet, email, name, CNIC
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and issue JWT token
- `POST /api/auth/login` - Login with wallet signature
- `GET /api/auth/profile` - Get current user profile (requires JWT)

### Campaign Endpoints
- `GET /api/campaigns` - Get all active campaigns
- `GET /api/campaigns/:id` - Get campaign details
- `POST /api/campaigns` - Create new campaign (organizer only)
- `PUT /api/campaigns/:id` - Update campaign (organizer only)
- `DELETE /api/campaigns/:id` - Delete campaign (organizer only)
- `GET /api/campaigns/:id/results` - Get real-time results

### Voting Endpoints
- `POST /api/vote` - Submit vote (calls smart contract)
- `GET /api/vote/check/:campaignId` - Check if user has voted
- `GET /api/vote/receipt/:txHash` - Get vote receipt from blockchain

### Member Management Endpoints
- `POST /api/campaigns/:id/members` - Add member to campaign
- `POST /api/campaigns/:id/members/bulk` - Bulk add members
- `GET /api/campaigns/:id/members` - Get campaign members
- `DELETE /api/campaigns/:id/members/:walletAddress` - Remove member

## Smart Contract Interface

### VotingContract.sol (Simplified)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingContract {
    struct Campaign {
        uint256 id;
        string title;
        uint256 optionCount;
        uint256 endTime;
        bool active;
    }
    
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => mapping(uint256 => uint256)) public voteCounts;
    
    event VoteCast(uint256 campaignId, address voter, uint256 optionId);
    
    function createCampaign(uint256 _id, string memory _title, uint256 _optionCount, uint256 _duration) public;
    function castVote(uint256 _campaignId, uint256 _optionId) public;
    function getResults(uint256 _campaignId) public view returns (uint256[] memory);
    function hasUserVoted(uint256 _campaignId, address _voter) public view returns (bool);
}
```

### Blockchain Integration (Frontend)
```javascript
// utils/blockchain.js
import { ethers } from 'ethers';

// Get provider and signer
export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

// Connect wallet
export const connectWallet = async () => {
  try {
    const provider = getProvider();
    await provider.send('eth_requestAccounts', []);
    const signer = await getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  } catch (error) {
    throw new Error('Failed to connect wallet: ' + error.message);
  }
};

// Get contract instance
export const getContract = async (signerOrProvider) => {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    signerOrProvider
  );
  return contract;
};

// Cast vote function
export const castVote = async (campaignId, optionId) => {
  const signer = await getSigner();
  const contract = await getContract(signer);
  const tx = await contract.castVote(campaignId, optionId);
  await tx.wait();
  return tx;
};

// Check if user has voted
export const hasVoted = async (campaignId, voterAddress) => {
  const provider = getProvider();
  const contract = await getContract(provider);
  const voted = await contract.hasVoted(campaignId, voterAddress);
  return voted;
};

// Get campaign results
export const getResults = async (campaignId) => {
  const provider = getProvider();
  const contract = await getContract(provider);
  const results = await contract.getResults(campaignId);
  return results;
};

// Listen to wallet account changes
export const onAccountsChanged = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', callback);
  }
};

// Listen to network changes
export const onChainChanged = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', callback);
  }
};
```

### Wallet Connection Component
```javascript
// components/WalletConnect.jsx
import { useState, useEffect } from 'react';
import { connectWallet, onAccountsChanged } from '../utils/blockchain';

export default function WalletConnect() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const { address } = await connectWallet();
      setAddress(address);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for account changes
    onAccountsChanged((accounts) => {
      if (accounts.length === 0) {
        setAddress(null);
      } else {
        setAddress(accounts[0]);
      }
    });
  }, []);

  return (
    <div>
      {!address ? (
        <button
          onClick={handleConnect}
          disabled={loading}
          className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition"
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-supporting">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
```

## Error Handling

### Frontend Error Handling
- **Network Errors**: Display toast notification with retry option
- **Wallet Errors**: Show specific MetaMask error messages
- **Validation Errors**: Inline form validation with red text
- **API Errors**: Display error message from backend response
- **Transaction Errors**: Show blockchain transaction failure with reason

### Error Display Component
```javascript
// Simple toast notification
const ErrorToast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 p-4 rounded">
    <p className="text-red-700">{message}</p>
    <button onClick={onClose} className="text-red-500 mt-2">Close</button>
  </div>
);
```

### Backend Error Responses
```javascript
// Standardized error response format
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid CNIC format',
    field: 'cnic'
  }
}
```

### Common Error Scenarios
1. **Wallet Not Connected**: Prompt user to connect MetaMask
2. **Already Voted**: Display message "You have already voted in this campaign"
3. **Campaign Closed**: Disable voting with "Campaign has ended" message
4. **Invalid OTP**: Show "Invalid or expired OTP" with resend option
5. **Duplicate Registration**: "Email or wallet address already registered"
6. **Transaction Failed**: "Transaction failed: [reason]" with transaction hash link

## Testing Strategy

### Component Testing
- **Tool**: React Testing Library
- **Approach**: Test each component in isolation
- **Focus Areas**:
  - Button click handlers
  - Form input validation
  - Conditional rendering based on props
  - Wallet connection flow

### Integration Testing
- **Tool**: Cypress (optional for FYP)
- **Approach**: Test user flows end-to-end
- **Key Flows**:
  - Registration → OTP Verification → Dashboard
  - Connect Wallet → View Campaigns → Cast Vote
  - Create Campaign → Add Members → View Results

### Smart Contract Testing
- **Tool**: Hardhat with Chai
- **Approach**: Test contract functions on local blockchain
- **Test Cases**:
  - Create campaign successfully
  - Cast vote and verify vote count
  - Prevent duplicate voting
  - Retrieve results correctly

### Manual Testing Checklist
- [ ] MetaMask connection on different browsers
- [ ] Responsive design on mobile, tablet, desktop
- [ ] Form validation for all input fields
- [ ] OTP email delivery and verification
- [ ] Vote transaction confirmation
- [ ] Real-time results update
- [ ] Campaign creation and management
- [ ] Member addition (single and bulk)

### Testing Priorities (For FYP)
1. **Critical**: Wallet connection, voting flow, results display
2. **Important**: Registration, OTP verification, campaign management
3. **Nice-to-have**: Edge cases, performance testing, security audits

## Responsive Design Breakpoints

### Tailwind Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `md:` (≥ 768px), `lg:` (≥ 1024px)

### Responsive Patterns
```javascript
// Example: Feature grid responsive layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map(feature => <FeatureCard key={feature.id} {...feature} />)}
</div>

// Example: Navbar responsive menu
<nav className="hidden md:flex space-x-6">
  {/* Desktop menu */}
</nav>
<button className="md:hidden">
  {/* Mobile hamburger */}
</button>
```

### Mobile-First Considerations
- Touch-friendly button sizes (min 44px height)
- Simplified navigation with hamburger menu
- Stacked layouts for forms and cards
- Larger text for readability (min 16px base)
- Adequate spacing between interactive elements

## Security Considerations

### Frontend Security
- **Wallet Security**: Never store private keys, only use MetaMask signing
- **Input Sanitization**: Validate and sanitize all user inputs
- **XSS Prevention**: Use React's built-in XSS protection, avoid dangerouslySetInnerHTML
- **HTTPS Only**: Enforce HTTPS in production

### Backend Security
- **JWT Authentication**: Short-lived tokens (1 hour), refresh token mechanism
- **Rate Limiting**: Limit OTP requests (3 per hour per email)
- **CNIC Validation**: Verify CNIC format (13 digits, valid checksum)
- **SQL Injection**: Use Mongoose parameterized queries
- **CORS**: Restrict to frontend domain only

### Smart Contract Security
- **Reentrancy Protection**: Use checks-effects-interactions pattern
- **Access Control**: Only campaign organizer can create campaigns
- **Vote Validation**: Check campaign is active and voter hasn't voted
- **Gas Optimization**: Minimize storage operations

## Performance Optimization

### Frontend Optimization

- **Image Optimization**: Use WebP format, lazy loading for images

### Backend Optimization
- **Database Indexing**: Index walletAddress, email, campaignId fields
- **Query Optimization**: Use MongoDB aggregation for results
- **Pagination**: Limit campaign lists to 20 per page

### Blockchain Optimization
- **Gas Efficiency**: Batch operations where possible
- **Event Listening**: Use Web3 events instead of polling
- **Testnet Usage**: Use Sepolia testnet to avoid mainnet costs

## Deployment Strategy

### Frontend Deployment
- **Platform**: Vercel or Netlify (free tier)
- **Build Command**: `npm run build`
- **Environment Variables**: API URL, contract address
- **Domain**: Custom domain or platform subdomain

### Backend Deployment
- **Platform**: Heroku, Railway, or Render (free tier)
- **Database**: MongoDB Atlas (free tier)
- **Environment Variables**: JWT secret, MongoDB URI, email credentials
- **API Documentation**: Simple README with endpoint list

### Smart Contract Deployment
- **Network**: Sepolia testnet (for FYP demonstration)
- **Tool**: Hardhat deployment scripts
- **Verification**: Verify contract on Etherscan
- **Address Storage**: Store contract address in backend config

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Smart contract deployed and verified
- [ ] Frontend connected to deployed backend
- [ ] MetaMask configured for correct network
- [ ] Test all critical flows in production
- [ ] Documentation updated with live URLs

## Accessibility Considerations

### WCAG 2.1 Level AA Compliance
- **Color Contrast**: Ensure 4.5:1 ratio for text (primary on white passes)
- **Keyboard Navigation**: All interactive elements accessible via Tab key
- **Screen Reader Support**: Use semantic HTML and ARIA labels
- **Focus Indicators**: Visible focus states on all interactive elements

### Implementation
```javascript
// Example: Accessible button
<button 
  className="bg-accent text-white px-6 py-3 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
  aria-label="Cast your vote"
>
  Vote Now
</button>

// Example: Form label association
<label htmlFor="email" className="block text-primary mb-2">
  Email Address
</label>
<input 
  id="email" 
  type="email" 
  className="w-full border border-supporting-light rounded px-4 py-2"
  aria-required="true"
/>
```

## Internationalization (i18n)

### Language Support
- **Primary**: English
- **Secondary**: Urdu (optional for FYP)

### Implementation Approach (Simple)
```javascript
// utils/translations.js
export const translations = {
  en: {
    hero: {
      title: "Secure Voting Powered by Blockchain",
      subtitle: "Transparent, tamper-proof elections with real-time results"
    }
  },
  ur: {
    hero: {
      title: "بلاک چین سے محفوظ ووٹنگ",
      subtitle: "شفاف اور محفوظ انتخابات"
    }
  }
};

// Usage in component
const { language } = useContext(LanguageContext);
<h1>{translations[language].hero.title}</h1>
```

### Language Switcher Component
- Toggle button in navbar
- Store preference in localStorage
- Switch between English and Urdu
- RTL support for Urdu text

## Development Workflow

### Setup Instructions
1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment variables (`.env` file)
4. Start development server: `npm run dev`
5. Deploy smart contract to testnet
6. Update contract address in config

### Git Workflow (Simple)
- **main** branch: Production-ready code
- **dev** branch: Development work
- Feature branches: `feature/campaign-management`
- Commit messages: Clear and descriptive

### Code Style
- **Formatting**: Prettier with default config
- **Linting**: ESLint with React recommended rules
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Explain complex logic, avoid obvious comments

## Documentation Requirements

### Code Documentation
- Component props documented with JSDoc comments
- Complex functions explained with inline comments
- README with setup instructions
- API endpoint documentation

### User Documentation
- How to connect MetaMask wallet
- How to register and verify account
- How to cast a vote
- How to create a campaign (for organizers)

### FYP Report Sections
- System architecture diagram
- Database schema
- Smart contract explanation
- UI/UX design decisions
- Testing results
- Challenges faced and solutions

## Future Enhancements (Post-FYP)

### Potential Features
- Multi-signature campaign approval
- Delegate voting mechanism
- Anonymous voting with zero-knowledge proofs
- Mobile app (React Native)
- Advanced analytics dashboard
- Email notifications for campaign updates
- Social media integration for campaign sharing
- Voter turnout predictions
- Audit trail export

### Scalability Improvements
- Move to Layer 2 solution (Polygon) for lower gas fees
- Implement IPFS for decentralized campaign data storage
- Add Redis caching for high-traffic scenarios
- Optimize smart contract gas usage
- Implement WebSocket for real-time updates

---

**Design Version**: 1.0  
**Last Updated**: November 24, 2025  
**Status**: Ready for Review