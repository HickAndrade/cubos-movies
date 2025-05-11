interface VoteAverageProps {
  voteAverage: number;
  customClass?: string;
}

function VoteAverage({ voteAverage, customClass }: VoteAverageProps) {
  const percentage = Math.round(voteAverage);

  const radius = 45;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor = '#ef4444'; 
  if (percentage >= 40 && percentage < 70) {
    strokeColor = '#facc15';
  } else if (percentage >= 70) {
    strokeColor = '#4ade80';
  }

  
  return (
    <div className={`relative bg-[#00000080] rounded-full w-[98px] h-[98px] ${customClass}`}>
      <svg width="98" height="98">
        <circle
          cx="49"
          cy="49"
          r={normalizedRadius}
          stroke="#00000080"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx="49"
          cy="49"
          r={normalizedRadius}
          stroke={strokeColor}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 49 49)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white">
        {percentage}%
      </div>
    </div>
  );
}

export default VoteAverage