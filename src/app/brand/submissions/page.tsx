// src/app/(brand)/submissions/page.tsx
import { api } from '@/lib/api';

export default async function SubmissionApprovalPage() {
  // Fetch and sanitize data in Server Component
  const response = await api.get('/submissions?status=pending');
  const submissions = response.data.map((sub) => ({
    ...sub,
    submissionDate: new Date(sub.submissionDate).toISOString(),
    influencer: sub.influencerId ? { email: sub.influencerId.email } : null,
  }));

  return <ClientSubmissionApproval submissions={submissions} />;
}

// Client Component
'use client';
import { Submission } from '@/types';

export function ClientSubmissionApproval({
  submissions,
}: {
  submissions: Submission[];
}) {
  // Client-side logic for approve/reject
  return (
    <div>
      {submissions.map((sub) => (
        <div key={sub._id}>
          <p>{sub.influencer?.email}</p>
          <p>{sub.contentLink}</p>
        </div>
      ))}
    </div>
  );
}