import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../context/CampaignContext';
import { useWallet } from '../context/WalletContext';

export default function CampaignCard({ campaign }) {
  const navigate = useNavigate();
  const { hasVoted } = useCampaign();
  const { address } = useWallet();

  const isActive = campaign.status === 'active';
  const userHasVoted = address ? hasVoted(campaign.id, address) : false;

  const handleVoteClick = () => {
    navigate(`/campaign/${campaign.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = () => {
    if (!isActive) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted/20 text-muted-foreground">
          Closed
        </span>
      );
    }
    if (userHasVoted) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/20 text-accent">
          Already Voted
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/20 text-accent">
        Active
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl shadow-sm bg-card border border-border hover:shadow-md transition-shadow">
      {/* Header with title and status */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em]">
            {campaign.title}
          </h3>
          {getStatusBadge()}
        </div>
        <p className="text-muted-foreground text-base font-normal leading-normal">
          {campaign.description}
        </p>
      </div>

      {/* Campaign details */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>End Date:</span>
          <span className="font-medium">{formatDate(campaign.endDate)}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Total Votes:</span>
          <span className="font-medium">{campaign.totalVotes.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Options:</span>
          <span className="font-medium">{campaign.options.length}</span>
        </div>
      </div>

      {/* Action button */}
      <div className="flex justify-end">
        <button
          onClick={handleVoteClick}
          disabled={!isActive || userHasVoted}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-primary-foreground text-base font-bold leading-normal tracking-[0.015em] hover:bg-secondary transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          <span className="truncate">
            {!isActive ? 'View Results' : userHasVoted ? 'View Details' : 'Vote Now'}
          </span>
        </button>
      </div>
    </div>
  );
}
