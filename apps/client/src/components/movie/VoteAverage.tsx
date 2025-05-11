interface VoteAverageProps {
  voteAverage: number;
}

function VoteAverage({ voteAverage }: VoteAverageProps) {
  const percentage = Math.round(voteAverage);

  let colorClasses = 'border-red-500 text-red-500';
  if (percentage >= 40 && percentage < 70) {
    colorClasses = 'border-yellow-400 text-yellow-300';
  } else if (percentage >= 70) {
    colorClasses = 'border-green-400 text-green-400';
  }

  return (
    <div
      className={
        `
        h-24 w-24 rounded-full border-4 flex items-center justify-center
        bg-[#00000080] font-bold text-lg
        ${colorClasses}
      `
          .replace(/\s+/g, ' ')
          .trim()
      }
    >
      {percentage}%
    </div>
  );
}

export default VoteAverage