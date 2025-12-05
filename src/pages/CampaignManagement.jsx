import { useState } from 'react';
import { Navbar } from '../components';
import { useCampaign } from '../context/CampaignContext';
import { useAuth } from '../context/AuthContext';

export default function CampaignManagement() {
  const { campaigns, createCampaign, updateCampaign, deleteCampaign, isLoading } = useCampaign();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    options: [{ name: '', description: '' }, { name: '', description: '' }],
    startDate: '',
    endDate: '',
  });

  // Calculate statistics
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalVotes = campaigns.reduce((sum, c) => sum + (c.totalVotes || 0), 0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle option changes
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index][field] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  // Add new option
  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { name: '', description: '' }]
    }));
  };

  // Remove option
  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, options: newOptions }));
    }
  };

  // Open create modal
  const openCreateModal = () => {
    setFormData({
      title: '',
      description: '',
      options: [{ name: '', description: '' }, { name: '', description: '' }],
      startDate: '',
      endDate: '',
    });
    setShowCreateModal(true);
  };

  // Open edit modal
  const openEditModal = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      title: campaign.title,
      description: campaign.description,
      options: campaign.options.map(opt => ({ name: opt.name, description: opt.description })),
      startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
      endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
    });
    setShowEditModal(true);
  };

  // Open delete dialog
  const openDeleteDialog = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDeleteDialog(true);
  };

  // Handle create campaign
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const campaignData = {
        ...formData,
        organizerId: user?.id || 'org1',
        options: formData.options.map((opt, idx) => ({
          id: `opt${idx + 1}`,
          name: opt.name,
          description: opt.description,
        })),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        allowedVoters: [],
      };
      await createCampaign(campaignData);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  // Handle update campaign
  const handleUpdateCampaign = async (e) => {
    e.preventDefault();
    try {
      const updates = {
        title: formData.title,
        description: formData.description,
        options: formData.options.map((opt, idx) => ({
          id: selectedCampaign.options[idx]?.id || `opt${idx + 1}`,
          name: opt.name,
          description: opt.description,
        })),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };
      await updateCampaign(selectedCampaign.id, updates);
      setShowEditModal(false);
      setSelectedCampaign(null);
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  // Handle delete campaign
  const handleDeleteCampaign = async () => {
    try {
      await deleteCampaign(selectedCampaign.id);
      setShowDeleteDialog(false);
      setSelectedCampaign(null);
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      active: (
        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
          Active
        </span>
      ),
      closed: (
        <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
          Closed
        </span>
      ),
      draft: (
        <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
          Draft
        </span>
      ),
    };
    return badges[status] || badges.draft;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-wrap justify-between gap-3 mb-6">
            <div className="flex min-w-72 flex-col gap-2">
              <h1 className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em]">
                Campaign Management
              </h1>
              <p className="text-muted-foreground text-base font-normal leading-normal">
                Oversee, create, and manage all voting campaigns from here.
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={openCreateModal}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-primary-foreground text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition"
              >
                <span className="truncate">Create New Campaign</span>
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-border bg-card">
              <p className="text-card-foreground text-base font-medium leading-normal">Total Campaigns</p>
              <p className="text-card-foreground tracking-light text-2xl font-bold leading-tight">
                {totalCampaigns}
              </p>
              <p className="text-green-600 text-sm font-medium leading-normal flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_upward</span>
                <span>{activeCampaigns} active</span>
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-border bg-card">
              <p className="text-card-foreground text-base font-medium leading-normal">Active Campaigns</p>
              <p className="text-card-foreground tracking-light text-2xl font-bold leading-tight">
                {activeCampaigns}
              </p>
              <p className="text-green-600 text-sm font-medium leading-normal flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_upward</span>
                <span>Running now</span>
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-border bg-card">
              <p className="text-card-foreground text-base font-medium leading-normal">Total Votes Cast</p>
              <p className="text-card-foreground tracking-light text-2xl font-bold leading-tight">
                {totalVotes.toLocaleString()}
              </p>
              <p className="text-green-600 text-sm font-medium leading-normal flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_upward</span>
                <span>Across all campaigns</span>
              </p>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <h2 className="text-card-foreground text-lg font-bold leading-tight tracking-[-0.015em] px-6 py-4 border-b border-border">
              Campaigns Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-muted-foreground">
                <thead className="text-xs text-foreground uppercase bg-muted">
                  <tr>
                    <th className="px-6 py-3" scope="col">Campaign Name</th>
                    <th className="px-6 py-3" scope="col">Status</th>
                    <th className="px-6 py-3" scope="col">Start Date</th>
                    <th className="px-6 py-3" scope="col">End Date</th>
                    <th className="px-6 py-3" scope="col">Total Votes</th>
                    <th className="px-6 py-3" scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">
                        No campaigns yet. Create your first campaign to get started.
                      </td>
                    </tr>
                  ) : (
                    campaigns.map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="bg-card border-b border-border hover:bg-muted/50 transition"
                      >
                        <th className="px-6 py-4 font-medium text-card-foreground whitespace-nowrap" scope="row">
                          {campaign.title}
                        </th>
                        <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
                        <td className="px-6 py-4">{formatDate(campaign.startDate)}</td>
                        <td className="px-6 py-4">{formatDate(campaign.endDate)}</td>
                        <td className="px-6 py-4">{campaign.totalVotes?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openEditModal(campaign)}
                            className="font-medium text-primary hover:underline mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteDialog(campaign)}
                            className="font-medium text-destructive hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-card-foreground text-xl font-bold">Create New Campaign</h2>
            </div>
            <form onSubmit={handleCreateCampaign} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-card-foreground mb-2">
                    Campaign Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter campaign title"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter campaign description"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-card-foreground mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-card-foreground mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Voting Options
                  </label>
                  {formData.options.map((option, index) => (
                    <div key={index} className="mb-3 p-4 border border-border rounded-lg bg-background">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-card-foreground">Option {index + 1}</span>
                        {formData.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="text-destructive hover:text-destructive/80 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={option.name}
                        onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                        placeholder="Option name"
                      />
                      <input
                        type="text"
                        value={option.description}
                        onChange={(e) => handleOptionChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Option description (optional)"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    + Add Another Option
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-card-foreground text-xl font-bold">Edit Campaign</h2>
            </div>
            <form onSubmit={handleUpdateCampaign} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium text-card-foreground mb-2">
                    Campaign Title
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter campaign title"
                  />
                </div>
                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium text-card-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter campaign description"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="edit-startDate" className="block text-sm font-medium text-card-foreground mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="edit-startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-endDate" className="block text-sm font-medium text-card-foreground mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="edit-endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Voting Options
                  </label>
                  {formData.options.map((option, index) => (
                    <div key={index} className="mb-3 p-4 border border-border rounded-lg bg-background">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-card-foreground">Option {index + 1}</span>
                        {formData.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="text-destructive hover:text-destructive/80 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={option.name}
                        onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                        placeholder="Option name"
                      />
                      <input
                        type="text"
                        value={option.description}
                        onChange={(e) => handleOptionChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Option description (optional)"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    + Add Another Option
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCampaign(null);
                  }}
                  className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Update Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-md w-full p-6">
            <h2 className="text-card-foreground text-xl font-bold mb-4">Delete Campaign</h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "{selectedCampaign?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSelectedCampaign(null);
                }}
                className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCampaign}
                disabled={isLoading}
                className="px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
