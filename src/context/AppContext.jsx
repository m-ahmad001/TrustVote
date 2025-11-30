import { AuthProvider } from './AuthContext';
import { WalletProvider } from './WalletContext';
import { CampaignProvider } from './CampaignContext';
import { LanguageProvider } from './LanguageContext';

/**
 * AppProvider combines all context providers in the correct order
 * This ensures all contexts are available throughout the application
 */
export const AppProvider = ({ children }) => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <WalletProvider>
          <CampaignProvider>
            {children}
          </CampaignProvider>
        </WalletProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

// Re-export all hooks for convenient access
export { useAuth } from './AuthContext';
export { useWallet } from './WalletContext';
export { useCampaign } from './CampaignContext';
export { useLanguage } from './LanguageContext';
