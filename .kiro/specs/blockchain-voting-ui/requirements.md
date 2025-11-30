# Requirements Document

## Introduction

This document specifies the requirements for a blockchain-based decentralized voting application designed as a Final Year Project (FYP). The system provides a secure, transparent, and tamper-proof voting platform that addresses real-world voting challenges including fraud prevention, duplicate vote detection, and transparent result tracking. The application features a React JS frontend with TailwindCSS, designed with simplicity in mind for educational purposes while maintaining professional standards.

## Glossary

- **Voting System**: The complete blockchain-based decentralized voting application
- **Voter**: A registered user who can cast votes in active campaigns
- **Campaign Organizer**: A user with permissions to create, manage campaigns, and add members
- **Campaign**: A voting event with defined options, duration, and eligible voters
- **Wallet**: A MetaMask cryptocurrency wallet used for voter authentication
- **CNIC**: Computerized National Identity Card number used for voter verification
- **OTP**: One-Time Password sent via email for authentication
- **Smart Contract**: Ethereum blockchain contract that records and validates votes
- **Landing Page**: The public-facing homepage showcasing the voting system
- **Dashboard**: The authenticated user interface showing campaigns and results
- **Vote Record**: An immutable blockchain entry representing a cast vote
- **Campaign Status**: The state of a campaign (Active or Closed)
- **Member**: A registered participant eligible to vote in specific campaigns

## Requirements

### Requirement 1: Landing Page Display

**User Story:** As a visitor, I want to view a professional landing page that explains blockchain voting benefits, so that I understand the system's value proposition before registering.

#### Acceptance Criteria

1. WHEN the Voting System loads, THE Landing Page SHALL display a hero section with the headline "Secure Voting Powered by Blockchain" and subheading "Transparent, tamper-proof elections with real-time results"
2. THE Landing Page SHALL display two call-to-action buttons labeled "Start Voting" in Accent color (#00aee6) and "Create a Campaign" in Secondary color (#2754ba)
3. THE Landing Page SHALL display an About section describing multi-campaign voting management, real-time analytics, wallet-based identity verification, CNIC authentication, and duplicate vote prevention
4. THE Landing Page SHALL display a "How It Works" section with three steps: "Connect Wallet", "Cast Vote", and "View Live Results" with simple icons
5. THE Landing Page SHALL display a features grid with four cards highlighting Secure, Transparent, Fast, and Decentralized features with simple line icons and descriptions
6. THE Landing Page SHALL display a footer with navigation links to Dashboard, Documentation, and Contact sections

### Requirement 2: User Registration

**User Story:** As a new user, I want to register with my wallet address, email, full name, and CNIC, so that I can participate in voting campaigns.

#### Acceptance Criteria

1. THE Voting System SHALL display a registration page with input fields for Wallet Address, Email, Full Name, and CNIC
2. WHEN a user enters data in the registration form, THE Voting System SHALL validate each field and display validation feedback messages
3. THE Voting System SHALL display wallet connection status indicating whether MetaMask is connected
4. WHEN a user clicks "Register & Verify Wallet", THE Voting System SHALL submit the registration data and initiate wallet verification
5. IF registration data is invalid, THEN THE Voting System SHALL display error messages below the respective input fields with clear descriptions

### Requirement 3: OTP Verification

**User Story:** As a registered user, I want to verify my email with an OTP code, so that my account is authenticated securely.

#### Acceptance Criteria

1. THE Voting System SHALL display an OTP verification page with a 6-digit code input field
2. WHEN the OTP verification page loads, THE Voting System SHALL display a countdown timer showing OTP expiration time
3. THE Voting System SHALL display a "Resend OTP" button that becomes enabled after the countdown timer expires
4. WHEN a user enters a 6-digit OTP code and clicks "Verify", THE Voting System SHALL validate the code against the server
5. IF the OTP code is valid, THEN THE Voting System SHALL authenticate the user and redirect to the dashboard
6. IF the OTP code is invalid, THEN THE Voting System SHALL display an error message "Invalid OTP code. Please try again"

### Requirement 4: Voting Interface

**User Story:** As a voter, I want to view active campaigns and cast my vote securely, so that I can participate in elections.

#### Acceptance Criteria

1. THE Voting System SHALL display a voting page listing all active campaigns with campaign name, description, and voting options
2. THE Voting System SHALL display wallet address verification status for the connected user
3. THE Voting System SHALL display a "One vote per wallet" indicator for each campaign
4. WHEN a user selects a voting option and clicks "Cast Vote", THE Voting System SHALL record the vote on the blockchain via smart contract
5. IF a user has already voted in a campaign, THEN THE Voting System SHALL disable the "Cast Vote" button and display "Already Voted" status
6. WHEN a vote is successfully recorded, THE Voting System SHALL display a success confirmation message with transaction details

### Requirement 5: Real-Time Results Dashboard

**User Story:** As a user, I want to view live voting results with visual progress indicators, so that I can track election outcomes transparently.

#### Acceptance Criteria

1. THE Voting System SHALL display a results dashboard showing campaign name, total votes cast, and campaign status (Active or Closed)
2. THE Voting System SHALL display vote distribution for each campaign option using horizontal bar charts with percentages
3. THE Voting System SHALL display voting option bars in Accent color (#00aee6) and Secondary color (#2754ba) alternately
4. THE Voting System SHALL display a "Results updating live" indicator in Supporting color (#799eb2)
5. WHEN new votes are recorded, THE Voting System SHALL update the results dashboard within 5 seconds without requiring page refresh
6. THE Voting System SHALL display total votes cast as a clear numerical value for each campaign

### Requirement 6: Campaign Management

**User Story:** As a campaign organizer, I want to create and manage voting campaigns, so that I can conduct elections for my organization.

#### Acceptance Criteria

1. THE Voting System SHALL display a campaign management page with a "Create New Campaign" button
2. WHEN a campaign organizer clicks "Create New Campaign", THE Voting System SHALL display a form with fields for campaign name, description, voting options, and duration
3. THE Voting System SHALL display a list of existing campaigns with their status (Active or Closed) and statistics
4. THE Voting System SHALL display "Edit" and "Delete" buttons for each campaign owned by the organizer
5. WHEN a campaign organizer clicks "Edit" on a campaign, THE Voting System SHALL display an editable form with current campaign details
6. WHEN a campaign organizer clicks "Delete" on a campaign, THE Voting System SHALL display a confirmation dialog before removing the campaign
7. THE Voting System SHALL display campaign statistics overview including total votes, participation rate, and time remaining

### Requirement 7: Member Management

**User Story:** As a campaign organizer, I want to add voters to my campaigns, so that only authorized participants can vote.

#### Acceptance Criteria

1. THE Voting System SHALL display an "Add Member" page with input fields for email and wallet address
2. THE Voting System SHALL display a "Bulk Upload" option allowing CSV file upload with multiple member records
3. WHEN a campaign organizer submits member information, THE Voting System SHALL validate the email and wallet address format
4. THE Voting System SHALL display a member list showing all added participants with their email and wallet address
5. THE Voting System SHALL display a "Remove" button next to each member in the list
6. WHEN a campaign organizer clicks "Remove" on a member, THE Voting System SHALL remove the member from the campaign after confirmation

### Requirement 8: Campaign Details Page

**User Story:** As a voter, I want to view detailed information about a campaign including rules and candidate profiles, so that I can make an informed voting decision.

#### Acceptance Criteria

1. WHEN a voter clicks on a campaign, THE Voting System SHALL display a campaign details page with campaign name, description, and rules
2. THE Voting System SHALL display candidate or option profiles with names, descriptions, and optional images
3. THE Voting System SHALL display campaign start date, end date, and time remaining
4. THE Voting System SHALL display a prominent "Cast Your Vote" call-to-action button in Accent color (#00aee6)
5. THE Voting System SHALL display eligibility status indicating whether the voter can participate
6. IF the campaign is closed, THEN THE Voting System SHALL display "Voting Closed" status and hide the voting button

### Requirement 9: User Profile Management

**User Story:** As a user, I want to view and update my profile information including wallet address and account settings, so that I can maintain accurate account details.

#### Acceptance Criteria

1. THE Voting System SHALL display a user profile page showing full name, email, wallet address, and CNIC
2. THE Voting System SHALL display an "Edit Profile" button that enables editing of full name and email fields
3. WHEN a user clicks "Edit Profile" and modifies information, THE Voting System SHALL validate the updated data
4. THE Voting System SHALL display wallet connection status and a "Change Wallet" button
5. WHEN a user clicks "Change Wallet", THE Voting System SHALL initiate MetaMask wallet connection flow
6. THE Voting System SHALL display account settings including language preference (English or Urdu) with a toggle option

### Requirement 10: Responsive Design

**User Story:** As a user on any device, I want the interface to adapt to my screen size, so that I can use the voting system on mobile, tablet, or desktop.

#### Acceptance Criteria

1. THE Voting System SHALL display all pages with responsive layouts that adapt to viewport widths of 320px (mobile), 768px (tablet), and 1024px (desktop) or greater
2. WHEN viewport width is less than 768px, THE Voting System SHALL display navigation menu as a collapsible hamburger menu
3. WHEN viewport width is less than 768px, THE Voting System SHALL stack form fields and buttons vertically
4. THE Voting System SHALL maintain readable text sizes with minimum 14px font size on mobile devices
5. THE Voting System SHALL ensure touch targets (buttons and links) are at least 44px in height on mobile devices
6. THE Voting System SHALL display campaign cards in a single column on mobile, two columns on tablet, and three columns on desktop

### Requirement 11: Visual Design System

**User Story:** As a developer, I want a consistent design system with defined colors and components, so that the interface maintains visual coherence throughout.

#### Acceptance Criteria

1. THE Voting System SHALL use Primary color (#123962) for main headings and primary navigation elements
2. THE Voting System SHALL use Secondary color (#2754ba) for secondary buttons and interactive elements
3. THE Voting System SHALL use Accent color (#00aee6) for call-to-action buttons, highlights, and important status indicators
4. THE Voting System SHALL use Supporting colors Bali Hai (#799eb2) and Powder Blue (#b1d4e5) for secondary text, borders, and background elements
5. THE Voting System SHALL apply consistent spacing with 8px base unit (8px, 16px, 24px, 32px, 48px, 64px)
6. THE Voting System SHALL use simple line-style icons throughout the interface
7. WHEN a user hovers over buttons, THE Voting System SHALL apply subtle color darkening or border highlight effects
8. THE Voting System SHALL maintain text contrast ratio of at least 4.5:1 for normal text and 3:1 for large text against backgrounds

### Requirement 12: Form Validation and Feedback

**User Story:** As a user filling out forms, I want immediate validation feedback, so that I can correct errors before submission.

#### Acceptance Criteria

1. WHEN a user enters data in an input field and moves focus away, THE Voting System SHALL validate the field and display validation status
2. IF input data is invalid, THEN THE Voting System SHALL display an error message in red text below the input field
3. IF input data is valid, THEN THE Voting System SHALL display a success indicator (green checkmark or border)
4. THE Voting System SHALL validate email fields using standard email format pattern
5. THE Voting System SHALL validate CNIC fields requiring exactly 13 digits
6. THE Voting System SHALL validate wallet address fields requiring 42-character hexadecimal format starting with "0x"
7. WHEN a form submission is successful, THE Voting System SHALL display a success confirmation message with green background

### Requirement 13: Blockchain Transaction Status

**User Story:** As a voter, I want to see the status of my blockchain transaction when casting a vote, so that I know my vote is being recorded.

#### Acceptance Criteria

1. WHEN a user clicks "Cast Vote", THE Voting System SHALL display a loading indicator with text "Processing transaction..."
2. WHILE the blockchain transaction is pending, THE Voting System SHALL disable the vote button and display transaction status
3. WHEN the blockchain transaction is confirmed, THE Voting System SHALL display "Vote recorded successfully" message with transaction hash
4. IF the blockchain transaction fails, THEN THE Voting System SHALL display an error message with failure reason and retry option
5. THE Voting System SHALL display a clickable transaction hash that opens the blockchain explorer in a new tab
6. THE Voting System SHALL display estimated transaction time during processing

### Requirement 14: Wallet Connection

**User Story:** As a user, I want to connect my MetaMask wallet easily, so that I can authenticate and participate in voting.

#### Acceptance Criteria

1. THE Voting System SHALL display a "Connect Wallet" button on pages requiring authentication
2. WHEN a user clicks "Connect Wallet", THE Voting System SHALL trigger MetaMask connection request
3. IF MetaMask is not installed, THEN THE Voting System SHALL display a message with link to install MetaMask browser extension
4. WHEN MetaMask connection is successful, THE Voting System SHALL display the connected wallet address in truncated format (0x1234...5678)
5. THE Voting System SHALL display a "Disconnect Wallet" option in the user menu
6. WHEN a user disconnects wallet, THE Voting System SHALL clear authentication and redirect to landing page

### Requirement 15: Multilingual Support

**User Story:** As a user who prefers Urdu, I want to switch the interface language, so that I can use the system in my preferred language.

#### Acceptance Criteria

1. THE Voting System SHALL display a language toggle button in the navigation header with options for English and Urdu
2. WHEN a user selects Urdu language, THE Voting System SHALL display all interface text in Urdu script
3. WHEN a user selects English language, THE Voting System SHALL display all interface text in English
4. THE Voting System SHALL persist the selected language preference in browser local storage
5. WHEN a user returns to the Voting System, THE Voting System SHALL load the previously selected language preference
6. THE Voting System SHALL maintain right-to-left text direction for Urdu language and left-to-right for English
