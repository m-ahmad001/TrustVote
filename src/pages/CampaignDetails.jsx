import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar, VoteOption, Footer } from '../components';
import { useCampaign } from '../context/CampaignContext';
import { useWallet } from '../context/WalletContext';

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCampaignById, castVote, hasVoted, isLoading: campaignLoading } = useCampaign();
  const { address, isConnected } = useWallet();

  const [campaign, setCampaign] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [activeTab, setActiveTab] = useState('candidates');

  // Load campaign data
  useEffect(() => {
    const campaignData = getCampaignById(id);
    if (campaignData) {
      setCampaign(campaignData);
    }
  }, [id, getCampaignById]);

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!campaign) return { days: 0, hours: 0, minutes: 0 };
    
    const now = new Date();
    const end = new Date(campaign.endDate);
    const diff = end - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const timeRemaining = getTimeRemaining();

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if user has already voted
  const userHasVoted = address ? hasVoted(id, address) : false;
  const isCampaignClosed = campaign?.status === 'closed';
  const canVote = isConnected && !userHasVoted && !isCampaignClosed;

  // Handle vote submission
  const handleCastVote = async () => {
    if (!selectedOption || !address) return;

    setIsVoting(true);
    setVoteError(null);

    try {
      await castVote(id, selectedOption, address);
      setVoteSuccess(true);
      // Reload campaign data to get updated vote counts
      const updatedCampaign = getCampaignById(id);
      setCampaign(updatedCampaign);
    } catch (error) {
      setVoteError(error.message || 'Failed to cast vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  // Handle view results
  const handleViewResults = () => {
    navigate('/results');
  };

  // Loading state
  if (campaignLoading || !campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-10 lg:px-20 py-5 sm:py-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* Hero Section */}
          <section className="flex flex-col gap-4 p-6 rounded-xl bg-card border border-border">
            <div className="flex flex-wrap justify-between items-start gap-3">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em]">
                  {campaign.title}
                </h1>
                <p className="text-muted-foreground text-base font-normal leading-normal">
                  {campaign.description}
                </p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-accent/20 px-4">
                <p className="text-accent text-sm font-bold leading-normal">
                  {isCampaignClosed ? 'Closed' : 'Active'}
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details & CTA */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              {/* Information Card */}
              <div className="flex flex-col p-6 rounded-xl bg-card border border-border">
                <h3 className="text-xl font-bold mb-4 text-foreground">Campaign Details</h3>
                <div className="flex flex-col divide-y divide-border">
                  <div className="flex justify-between gap-x-6 py-3">
                    <p className="text-muted-foreground text-sm font-normal leading-normal">Start Date</p>
                    <p className="text-foreground text-sm font-semibold leading-normal text-right">
                      {formatDate(campaign.startDate)}
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-6 py-3">
                    <p className="text-muted-foreground text-sm font-normal leading-normal">End Date</p>
                    <p className="text-foreground text-sm font-semibold leading-normal text-right">
                      {formatDate(campaign.endDate)}
                    </p>
                  </div>
                </div>

                {/* Time Remaining Countdown */}
                {!isCampaignClosed && (
                  <div className="mt-4 border-t border-border">
                    <div className="flex gap-2 sm:gap-4 py-6">
                      <div className="flex grow basis-0 flex-col items-stretch gap-2">
                        <div className="flex h-14 grow items-center justify-center rounded-lg px-2 bg-background">
                          <p className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em]">
                            {timeRemaining.days}
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="text-muted-foreground text-xs sm:text-sm font-normal leading-normal">Days</p>
                        </div>
                      </div>
                      <div className="flex grow basis-0 flex-col items-stretch gap-2">
                        <div className="flex h-14 grow items-center justify-center rounded-lg px-2 bg-background">
                          <p className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em]">
                            {timeRemaining.hours}
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="text-muted-foreground text-xs sm:text-sm font-normal leading-normal">Hours</p>
                        </div>
                      </div>
                      <div className="flex grow basis-0 flex-col items-stretch gap-2">
                        <div className="flex h-14 grow items-center justify-center rounded-lg px-2 bg-background">
                          <p className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em]">
                            {timeRemaining.minutes}
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="text-muted-foreground text-xs sm:text-sm font-normal leading-normal">Minutes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Success Message */}
              {voteSuccess && (
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent">check_circle</span>
                    <p className="text-sm font-medium text-foreground">
                      Vote recorded successfully!
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {voteError && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-destructive">error</span>
                    <p className="text-sm font-medium text-foreground">
                      {voteError}
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              {!isConnected && (
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-foreground">
                    Please connect your wallet to participate in voting.
                  </p>
                </div>
              )}

              {/* {isConnected && canVote && !voteSuccess && ( */}
                <button
                  onClick={handleCastVote}
                  disabled={!selectedOption || isVoting}
                  className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-primary text-primary-foreground text-lg font-bold leading-normal tracking-[0.015em] hover:bg-secondary transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  <span className="truncate">
                    {isVoting ? 'Processing transaction...' : 'Cast Your Vote'}
                  </span>
                </button>
              {/* )} */}

              {isConnected && userHasVoted && !voteSuccess && (
                <button
                  disabled
                  className="flex w-full min-w-[84px] max-w-[480px] cursor-not-allowed items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-muted/50 text-muted-foreground text-lg font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">You have already voted</span>
                </button>
              )}

              {isCampaignClosed && (
                <button
                  onClick={handleViewResults}
                  className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-secondary text-primary-foreground text-lg font-bold leading-normal tracking-[0.015em] hover:bg-secondary/90 transition-colors"
                >
                  <span className="truncate">View Results</span>
                </button>
              )}
            </div>

            {/* Right Column: Tabbed Content */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="bg-card border border-border rounded-xl p-6">
                {/* Tabs */}
                <div className="border-b border-border">
                  <nav aria-label="Tabs" className="flex space-x-6 -mb-px">
                    <button
                      onClick={() => setActiveTab('candidates')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-base ${
                        activeTab === 'candidates'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      Candidates
                    </button>
                    <button
                      onClick={() => setActiveTab('rules')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${
                        activeTab === 'rules'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      Campaign Rules
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="py-6">
                  {activeTab === 'candidates' && (
                    <div className="flex flex-col gap-4">
                      {campaign.options.map((option) => (
                        <VoteOption
                          key={option.id}
                          option={option}
                          selected={selectedOption === option.id}
                          onSelect={setSelectedOption}
                          // disabled={!canVote || isVoting}
                        />
                      ))}
                    </div>
                  )}

                  {activeTab === 'rules' && (
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-lg font-bold text-foreground mb-4">Voting Rules</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Each wallet address is allowed to cast only one vote per campaign</li>
                        <li>Votes are recorded on the blockchain and cannot be changed once submitted</li>
                        <li>You must have a connected MetaMask wallet to participate</li>
                        <li>Voting is open until the campaign end date</li>
                        <li>All votes are anonymous and secure</li>
                        <li>Results are updated in real-time as votes are cast</li>
                      </ul>
                      
                      <h3 className="text-lg font-bold text-foreground mt-6 mb-4">Eligibility</h3>
                      <p className="text-muted-foreground">
                        This campaign is open to all registered users with verified wallet addresses. 
                        Ensure your wallet is connected and you have completed the registration process 
                        before attempting to vote.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
