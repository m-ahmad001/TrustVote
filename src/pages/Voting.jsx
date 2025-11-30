import { Navbar, CampaignCard } from '../components';
import { useCampaign } from '../context/CampaignContext';
import { useWallet } from '../context/WalletContext';

export default function Voting() {
  const { getActiveCampaigns, isLoading } = useCampaign();
  const { address, isConnected, getTruncatedAddress } = useWallet();

  const activeCampaigns = getActiveCampaigns();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex flex-wrap justify-between gap-4 items-center">
              <div className="flex flex-col gap-2">
                <h1 className="text-primary text-4xl font-black leading-tight tracking-[-0.033em]">
                  Active Voting Campaigns
                </h1>
                <p className="text-muted-foreground text-base font-normal leading-normal">
                  Rule: One vote per wallet address is permitted for each campaign.
                </p>
              </div>
            </div>

            {/* Wallet Status */}
            {isConnected && address && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border">
                <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                <span className="text-sm text-foreground">
                  Connected: <span className="font-medium">{getTruncatedAddress()}</span>
                </span>
              </div>
            )}

            {/* Wallet Not Connected Warning */}
            {!isConnected && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <span className="material-symbols-outlined text-accent">info</span>
                <p className="text-sm text-foreground">
                  Please connect your wallet to view your voting status and participate in campaigns.
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {/* Campaigns List */}
            {!isLoading && activeCampaigns.length > 0 && (
              <div className="flex flex-col gap-8">
                {activeCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && activeCampaigns.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-center max-w-md">
                  <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4">
                    how_to_vote
                  </span>
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    No Active Campaigns
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    There are currently no active voting campaigns. Check back later or contact your organization administrator.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
