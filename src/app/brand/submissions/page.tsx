// src/app/(brand)/submissions/page.tsx
import { api } from '@/lib/api';
import { Submission } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';


export default async function SubmissionApprovalPage() {
  // Fetch and sanitize data in Server Component
  const response = await api.get('/submissions?status=pending');
  const submissions = response.data.map((sub: Submission) => ({
    ...sub,
    submissionDate: new Date(sub.submissionDate).toISOString(),
    influencer: sub.influencerId ? { email: sub.influencerId.email } : null,
  }));

  return <ClientSubmissionApproval initialSubmissions={submissions} />;
}

// Client Component
'use client';

function ClientSubmissionApproval({
  initialSubmissions,
}: {
  initialSubmissions: Submission[];
}) {
  const { data: submissions, refetch } = useQuery({
    queryKey: ['pending-submissions'],
    queryFn: () => api.get('/submissions?status=pending').then((res) => res.data),
    initialData: initialSubmissions,
  });

  const updateStatus = useMutation({
    mutationFn: (data: { id: string; status: 'approved' | 'rejected' }) =>
      api.patch(`/submissions/${data.id}`, { status: data.status }),
    onSuccess: () => {
      toast.success('Status updated!');
      refetch();
    },
  });
  const sanitizedSubmissions = submissions.map((sub: Submission) => ({
    ...sub,
    submissionDate: new Date(sub.submissionDate).toISOString(),
  }));



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pending Submissions</h1>
      <div className="space-y-4">
        {submissions?.map((sub: Submission) => (
          <div key={sub._id} className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">{sub.influencerId?.email}</p>
            <a href={sub.contentLink} className="text-blue-500 hover:underline block mb-2">
              {sub.contentLink}
            </a>
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus.mutate({ id: sub._id, status: 'approved' })}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus.mutate({ id: sub._id, status: 'rejected' })}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}