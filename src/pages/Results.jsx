import { useState, useEffect } from 'react';
import { Navbar, Footer, ResultsChart } from '../components';
import { useCampaign } from '../context';

export default function Results() {
  const { getAllCampaigns, getCampaignResults } = useCampaign();
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [campaignResults, setCampaignResults] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const campaigns = getAllCampaigns();

  // Set initial campaign selection
  useEffect(() => {
    if (campaigns.length > 0 && !selectedCampaignId) {
      setSelectedCampaignId(campaigns[0].id);
    }
  }, [campaigns, selectedCampaignId]);

  // Load campaign results when selection changes
  useEffect(() => {
    if (selectedCampaignId) {
      const results = getCampaignResults(selectedCampaignId);
      setCampaignResults(results);
      setLastUpdated(new Date());
    }
  }, [selectedCampaignId, getCampaignResults]);

  // Mock auto-refresh with useEffect timer (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCampaignId) {
        const results = getCampaignResults(selectedCampaignId);
        setCampaignResults(results);
        setLastUpdated(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedCampaignId, getCampaignResults]);

  // Calculate voter turnout (mock calculation)
  const calculateTurnout = () => {
    if (!campaignResults) return '0.0';
    // Mock: assume 10,000 eligible voters
    const eligibleVoters = 10000;
    return ((campaignResults.totalVotes / eligibleVoters) * 100).toFixed(1);
  };

  // Format last updated time
  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000); // seconds
    
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return lastUpdated.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 px-4 md:px-10 lg:px-20 xl:px-40 py-5">
        <div className="max-w-[960px] mx-auto">
          {/* Header with Live indicator */}
          <div className="flex flex-wrap justify-between items-start gap-3 p-4">
            <h2 className="text-primary text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
              {campaignResults?.campaignTitle || 'Real-time Results Dashboard'}
            </h2>
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <p className="text-accent text-sm font-medium leading-normal">Live</p>
            </div>
          </div>

          {/* Campaign selector dropdown */}
          <div className="p-4">
            <label htmlFor="campaign-select" className="block text-sm font-medium text-muted-foreground mb-2">
              Select Campaign
            </label>
            <select
              id="campaign-select"
              value={selectedCampaignId || ''}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="w-full sm:w-auto min-w-[300px] px-4 py-2 border border-border-light rounded-lg bg-card text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.title} ({campaign.status})
                </option>
              ))}
            </select>
          </div>

          {/* Campaign statistics */}
          {campaignResults && (
            <>
              <div className="flex flex-wrap gap-4 p-4">
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border-light bg-card">
                  <p className="text-muted-foreground text-base font-medium leading-normal">
                    Campaign
                  </p>
                  <p className="text-primary tracking-light text-2xl font-bold leading-tight">
                    {campaignResults.campaignTitle}
                  </p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border-light bg-card">
                  <p className="text-muted-foreground text-base font-medium leading-normal">
                    Total Votes Cast
                  </p>
                  <p className="text-primary tracking-light text-2xl font-bold leading-tight">
                    {campaignResults.totalVotes.toLocaleString()}
                  </p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-border-light bg-card">
                  <p className="text-muted-foreground text-base font-medium leading-normal">
                    Voter Turnout
                  </p>
                  <p className="text-primary tracking-light text-2xl font-bold leading-tight">
                    {calculateTurnout()}%
                  </p>
                </div>
              </div>

              {/* Results breakdown */}
              <h3 className="text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Results Breakdown
              </h3>
              
              <div className="p-4">
                <ResultsChart results={campaignResults.results} />
              </div>

              {/* Last updated timestamp */}
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Last updated: {formatLastUpdated()}
                </p>
              </div>
            </>
          )}

          {/* Empty state */}
          {!campaignResults && campaigns.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">No campaigns available</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
