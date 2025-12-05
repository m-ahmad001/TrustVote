import { useMemo } from 'react';

export default function ResultsChart({ results }) {
  // Define colors for alternating bars
  const colors = ['accent', 'secondary', 'primary'];

  // Sort results by votes (descending)
  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => b.votes - a.votes);
  }, [results]);

  return (
    <div className="flex flex-col gap-4">
      {sortedResults.map((result, index) => {
        const colorClass = colors[index % colors.length];
        const bgColorClass = 
          colorClass === 'accent' ? 'bg-accent' :
          colorClass === 'secondary' ? 'bg-secondary' :
          'bg-primary';
        
        const textColorClass = 
          colorClass === 'accent' ? 'text-accent' :
          colorClass === 'secondary' ? 'text-secondary' :
          'text-primary';

        return (
          <div
            key={result.optionId}
            className={`flex flex-col sm:flex-row items-center gap-4 rounded-lg p-4 border ${
              index === 0 ? 'border-accent/50 shadow-sm' : 'border-border-light'
            } bg-card`}
          >
            {/* Option name and votes */}
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-2">
                <p className={`font-bold text-lg ${textColorClass}`}>
                  {result.optionName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {result.votes.toLocaleString()} Votes
                </p>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-4">
                <div className="w-full bg-supporting-light/30 rounded-full h-2.5">
                  <div
                    className={`${bgColorClass} h-2.5 rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
                <span className={`font-semibold ${textColorClass} min-w-[50px] text-right`}>
                  {result.percentage}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
