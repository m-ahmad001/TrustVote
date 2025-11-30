import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import page components
import Landing from './pages/Landing';
import Register from './pages/Register';
import OTPVerify from './pages/OTPVerify';
import Voting from './pages/Voting';
import Results from './pages/Results';
import CampaignManagement from './pages/CampaignManagement';
import AddMember from './pages/AddMember';
import CampaignDetails from './pages/CampaignDetails';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
        
        {/* Voter Routes */}
        <Route path="/voting" element={<Voting />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<UserProfile />} />
        
        {/* Organizer Routes */}
        <Route path="/campaigns" element={<CampaignManagement />} />
        <Route path="/campaigns/add-member/:id" element={<AddMember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
