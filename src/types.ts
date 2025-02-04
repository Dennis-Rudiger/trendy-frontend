// src/types.ts
export type Campaign = {
    _id: string;
    title: string;
    deadline: string; // ISO string
    status: 'active' | 'completed';
    brandID? : string;
  };
  
  export type Submission = {
    _id: string;
    contentLink: string;
    status: 'pending' | 'approved' | 'rejected';
    submissionDate: string; // ISO string
    influencerId?: { email: string };
    campaignID? : string;
  };