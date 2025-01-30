
interface SubmissionCardProps {
  submission: {
    influencerId: { email: string } | string;
  };
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  return (
    <div>
      {submission.influencerId && typeof submission.influencerId === 'object' ? (
        <p>{submission.influencerId.email}</p>
      ) : (
        <p>Influencer ID: {submission.influencerId}</p>
      )}
    </div>
  );
};

export default SubmissionCard;