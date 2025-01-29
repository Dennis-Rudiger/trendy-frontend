
import Link from 'next/link';

export default function CampaignCard({ campaign }: { campaign: any }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
      <p className="text-gray-600 mb-2">
        Deadline: {new Date(campaign.deadline).toLocaleDateString()}
      </p>
      <Link
        href={`/influencer/campaigns/${campaign._id}`}
        className="text-blue-500 hover:text-blue-700"
      >
        View Details →
      </Link>
    </div>
  );
}