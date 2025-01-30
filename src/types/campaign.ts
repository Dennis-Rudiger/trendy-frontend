
export interface Campaign {
    _id: string;
    title: string;
    deadline: string;
    status: 'active' | 'completed';
    brandId: string;
  }