import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = React.useState(false);

  // Official logo image url from user prompt
  const officialLogoUrl = 'https://lh3.googleusercontent.com/aida/AEtjO1Uh8z76p418P_8Edg3P394lK6tiNCsrwoSmApXwUank_1YDE8HefNYSNlX8kKK5cdo0ImOgL0MroXBs_uFYcKHqhA3tR_javQyLxRjUqwdAULXOj9V8FHJd-sTMToPPkIR6EIT0OboEDMhW9AbwDVn6sp2EsnsA9GkpfF7hFbH9hjJevndFngslamwnIAqIB1aWNtFvCES3IqbByuKMOd3OnF9yKmlTo1o-pKazetSswQyhV9Ngh90nR-k';

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-11 w-11',
  };

  const containerPadding = {
    sm: 'p-0.5',
    md: 'p-1',
    lg: 'p-1.5',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2 select-none cursor-pointer group ${className}`}
    >
      {/* Precision Circular Metallic Ring */}
      <div className={`relative ${sizeClasses[size]} ${containerPadding[size]} rounded-full bg-[#0e0e0e] border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.06)] group-hover:border-white/40 transition-all duration-200 flex items-center justify-center overflow-hidden`}>
        {!imageError ? (
          <img
            src={officialLogoUrl}
            alt="_PG.Dev"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain rounded-full"
          />
        ) : (
          /* High-fidelity Vector SVG Fallback with metallic circle and \_PG.Dev</> geometry */
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#090909" stroke="#E5E2E1" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <path d="M 22 45 L 28 55 L 34 55" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
            <text x="50" y="56" fill="#FFFFFF" fontSize="19" fontFamily="Geist, sans-serif" fontWeight="700" textAnchor="middle">
              PG
            </text>
            <path d="M 68 45 L 76 52 L 68 59" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <line x1="22" y1="64" x2="78" y2="64" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      {showWordmark && (
        <span className={`font-mono ${textClasses[size]} tracking-wider text-white font-semibold uppercase group-hover:text-white/90 transition-colors`}>
          _PG.Dev
        </span>
      )}
    </div>
  );
};
