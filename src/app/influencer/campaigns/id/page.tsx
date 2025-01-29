
'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [contentLink, setContentLink] = useState('');

  // Fetch campaign details
  const { data: campaign } = useQuery({
    queryKey: ['campaign', id],
    queryFn: () => api.get(`/campaigns/${id}`).then((res) => res.data),
  });

  // Submit content mutation
  const submitContent = useMutation({
    mutationFn: () => api.post('/submissions', { campaignId: id, contentLink }),
    onSuccess: () => {
      toast.success('Submission successful!');
      router.push('/influencer/campaigns');
    },
    onError: () => toast.error('Submission failed!'),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{campaign?.title}</h1>
      <p className="text-gray-600 mb-6">{campaign?.instructions}</p>
      <div className="max-w-lg">
        <input
          type="text"
          value={contentLink}
          onChange={(e) => setContentLink(e.target.value)}
          placeholder="Paste your TikTok/Instagram link here"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={() => submitContent.mutate()}
          disabled={submitContent.isPending}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {submitContent.isPending ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}