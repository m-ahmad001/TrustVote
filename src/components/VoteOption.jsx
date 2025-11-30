export default function VoteOption({ option, selected, onSelect, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      onSelect(option.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-start gap-4 p-6 rounded-lg border-2 transition-all cursor-pointer
        ${selected 
          ? 'border-accent bg-accent/5' 
          : 'border-border bg-card hover:border-accent/50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Custom Radio Button */}
      <div className="flex-shrink-0 mt-1">
        <div
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
            ${selected 
              ? 'border-accent bg-accent' 
              : 'border-muted-foreground bg-background'
            }
          `}
        >
          {selected && (
            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
          )}
        </div>
      </div>

      {/* Option Content */}
      <div className="flex-1">
        <h4 className="text-lg font-bold text-foreground mb-1">
          {option.name}
        </h4>
        {option.description && (
          <p className="text-sm text-muted-foreground">
            {option.description}
          </p>
        )}
      </div>
    </div>
  );
}
