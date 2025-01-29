
'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import CampaignCard from '@/components/CampaignCard';


export default async function CampaignListPage() {
  // Fetch and sanitize data in Server Component
  const response = await api.get('/campaigns/joined');
  const campaigns = response.data.map((campaign) => ({
    ...campaign,
    deadline: new Date(campaign.deadline).toISOString(), // Convert Date to string
  }));

  return <ClientCampaignList campaigns={campaigns} />;
}

// Client Component (separate file)
'use client';
import { Campaign } from '@/types';

export function ClientCampaignList({ campaigns }: { campaigns: Campaign[] }) {
  // Client-side rendering
  return (
    <div>
      {campaigns.map((campaign) => (
        <div key={campaign._id}>
          <h2>{campaign.title}</h2>
          <p>Deadline: {campaign.deadline}</p>
        </div>
      ))}
    </div>
  );
}
export default function CampaignListPage() {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => api.get('/campaigns/joined').then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns?.map((campaign: any) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}

