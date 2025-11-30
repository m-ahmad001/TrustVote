import { createContext, useContext, useState, useEffect } from 'react';

const CampaignContext = createContext(null);

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [votingRecords, setVotingRecords] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock campaign data
  const mockCampaigns = [
    {
      id: '1',
      title: 'Presidential Election 2024',
      description: 'Vote for the next president of the student council',
      organizerId: 'org1',
      options: [
        { id: 'opt1', name: 'Alice Johnson', description: 'Experienced leader with vision for change' },
        { id: 'opt2', name: 'Bob Smith', description: 'Fresh perspective and innovative ideas' },
        { id: 'opt3', name: 'Carol Williams', description: 'Proven track record in student advocacy' },
      ],
      startDate: new Date('2024-01-01').toISOString(),
      endDate: new Date('2024-12-31').toISOString(),
      status: 'active',
      allowedVoters: [],
      smartContractAddress: '0x1234567890123456789012345678901234567890',
      totalVotes: 1234,
      results: {
        opt1: 450,
        opt2: 550,
        opt3: 234,
      },
      createdAt: new Date('2023-12-01').toISOString(),
    },
    {
      id: '2',
      title: 'Budget Allocation Vote',
      description: 'Decide how to allocate the annual student activities budget',
      organizerId: 'org1',
      options: [
        { id: 'opt1', name: 'Sports & Recreation', description: 'Invest in sports facilities and events' },
        { id: 'opt2', name: 'Arts & Culture', description: 'Support cultural events and art programs' },
        { id: 'opt3', name: 'Technology & Innovation', description: 'Fund tech labs and innovation projects' },
      ],
      startDate: new Date('2024-02-01').toISOString(),
      endDate: new Date('2024-03-31').toISOString(),
      status: 'active',
      allowedVoters: [],
      smartContractAddress: '0x2345678901234567890123456789012345678901',
      totalVotes: 567,
      results: {
        opt1: 200,
        opt2: 167,
        opt3: 200,
      },
      createdAt: new Date('2024-01-15').toISOString(),
    },
    {
      id: '3',
      title: 'Campus Improvement Initiative',
      description: 'Vote on the priority campus improvement project',
      organizerId: 'org2',
      options: [
        { id: 'opt1', name: 'Library Expansion', description: 'Expand library space and resources' },
        { id: 'opt2', name: 'Green Campus', description: 'Sustainability and environmental projects' },
      ],
      startDate: new Date('2023-11-01').toISOString(),
      endDate: new Date('2023-12-31').toISOString(),
      status: 'closed',
      allowedVoters: [],
      smartContractAddress: '0x3456789012345678901234567890123456789012',
      totalVotes: 890,
      results: {
        opt1: 390,
        opt2: 500,
      },
      createdAt: new Date('2023-10-15').toISOString(),
    },
  ];

  // Initialize campaigns from localStorage or use mock data
  useEffect(() => {
    const storedCampaigns = localStorage.getItem('campaigns');
    const storedVotingRecords = localStorage.getItem('votingRecords');
    
    if (storedCampaigns) {
      setCampaigns(JSON.parse(storedCampaigns));
    } else {
      setCampaigns(mockCampaigns);
      localStorage.setItem('campaigns', JSON.stringify(mockCampaigns));
    }

    if (storedVotingRecords) {
      setVotingRecords(JSON.parse(storedVotingRecords));
    }
  }, []);

  // Get all campaigns
  const getAllCampaigns = () => {
    return campaigns;
  };

  // Get active campaigns
  const getActiveCampaigns = () => {
    return campaigns.filter(c => c.status === 'active');
  };

  // Get campaign by ID
  const getCampaignById = (id) => {
    return campaigns.find(c => c.id === id);
  };

  // Create campaign (mock implementation)
  const createCampaign = async (campaignData) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newCampaign = {
        id: Date.now().toString(),
        ...campaignData,
        status: 'active',
        totalVotes: 0,
        results: {},
        smartContractAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
        createdAt: new Date().toISOString(),
      };

      const updatedCampaigns = [...campaigns, newCampaign];
      setCampaigns(updatedCampaigns);
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      
      return newCampaign;
    } finally {
      setIsLoading(false);
    }
  };

  // Update campaign (mock implementation)
  const updateCampaign = async (id, updates) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedCampaigns = campaigns.map(c => 
        c.id === id ? { ...c, ...updates } : c
      );
      setCampaigns(updatedCampaigns);
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      
      return updatedCampaigns.find(c => c.id === id);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete campaign (mock implementation)
  const deleteCampaign = async (id) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedCampaigns = campaigns.filter(c => c.id !== id);
      setCampaigns(updatedCampaigns);
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  // Cast vote (mock implementation)
  const castVote = async (campaignId, optionId, voterAddress) => {
    setIsLoading(true);
    try {
      // Simulate blockchain transaction delay
      // await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if already voted
      const voteKey = `${campaignId}-${voterAddress}`;
      if (votingRecords[voteKey]) {
        throw new Error('Already voted in this campaign');
      }

      // Update campaign results
      const updatedCampaigns = campaigns.map(c => {
        if (c.id === campaignId) {
          const newResults = { ...c.results };
          newResults[optionId] = (newResults[optionId] || 0) + 1;
          return {
            ...c,
            totalVotes: c.totalVotes + 1,
            results: newResults,
          };
        }
        return c;
      });

      setCampaigns(updatedCampaigns);
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));

      // Record the vote
      const newVotingRecords = {
        ...votingRecords,
        [voteKey]: {
          campaignId,
          optionId,
          voterAddress,
          timestamp: new Date().toISOString(),
          txHash: `0x${Math.random().toString(16).slice(2, 66)}`,
        },
      };
      setVotingRecords(newVotingRecords);
      localStorage.setItem('votingRecords', JSON.stringify(newVotingRecords));

      return newVotingRecords[voteKey];
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has voted
  const hasVoted = (campaignId, voterAddress) => {
    const voteKey = `${campaignId}-${voterAddress}`;
    return !!votingRecords[voteKey];
  };

  // Get vote record
  const getVoteRecord = (campaignId, voterAddress) => {
    const voteKey = `${campaignId}-${voterAddress}`;
    return votingRecords[voteKey] || null;
  };

  // Get campaign results
  const getCampaignResults = (campaignId) => {
    const campaign = getCampaignById(campaignId);
    if (!campaign) return null;

    const results = campaign.options.map(option => ({
      optionId: option.id,
      optionName: option.name,
      votes: campaign.results[option.id] || 0,
      percentage: campaign.totalVotes > 0 
        ? ((campaign.results[option.id] || 0) / campaign.totalVotes * 100).toFixed(1)
        : '0.0',
    }));

    return {
      campaignId,
      campaignTitle: campaign.title,
      totalVotes: campaign.totalVotes,
      status: campaign.status,
      results,
    };
  };

  const value = {
    campaigns,
    votingRecords,
    isLoading,
    getAllCampaigns,
    getActiveCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    castVote,
    hasVoted,
    getVoteRecord,
    getCampaignResults,
    mockCampaigns, // For development/testing
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
};

export default CampaignContext;
