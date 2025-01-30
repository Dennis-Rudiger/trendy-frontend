// src/app/(brand)/submissions/page.tsx
import { api } from '@/lib/api';
import { Submission } from '@/types';

export default async function SubmissionApprovalPage() {
  // Fetch and sanitize data in Server Component
  const response = await api.get('/submissions?status=pending');
  const submissions = response.data.map((sub: Submission) => ({
    ...sub,
    submissionDate: new Date(sub.submissionDate).toISOString(),
    influencer: sub.influencer,
  }));

  return <ClientSubmissionApproval submissions={submissions} />;
}

// Client Component
'use client';

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