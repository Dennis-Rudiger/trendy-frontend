'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function InfluencerListPage() {
  const { id: campaignId } = useParams();
  
  const { data: influencers } = useQuery({
    queryKey: ['influencers', campaignId],
    queryFn: () => api.get(`/submissions/campaign/${campaignId}`).then((res) => res.data),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Influencers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Influencer</th>
              <th className="py-3 px-4 text-left">Submissions</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {influencers?.map((submission: any) => (
              <tr key={submission._id} className="border-t">
                <td className="py-3 px-4">{submission.influencerId?.email}</td>
                <td className="py-3 px-4">
                  <a href={submission.contentLink} className="text-blue-500 hover:underline">
                    View Post
                  </a>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded ${submission.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}