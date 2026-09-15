export default function FloralOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main branch */}
      <path
        d="M5,5 Q15,40 50,70 Q70,85 95,95"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Leaves on the bottom/outer side */}
      <path d="M10,25 Q30,25 40,45 Q20,40 10,25 Z" fill="currentColor" opacity="0.75" />
      <path d="M30,50 Q50,55 60,70 Q40,65 30,50 Z" fill="currentColor" opacity="0.75" />
      <path d="M55,75 Q75,80 85,90 Q65,85 55,75 Z" fill="currentColor" opacity="0.75" />
      
      {/* Leaves on the top/inner side */}
      <path d="M20,15 Q35,5 50,15 Q35,25 20,15 Z" fill="currentColor" opacity="0.75" />
      <path d="M40,35 Q60,25 70,40 Q50,50 40,35 Z" fill="currentColor" opacity="0.75" />
      <path d="M65,55 Q85,45 90,60 Q70,70 65,55 Z" fill="currentColor" opacity="0.75" />
      
      {/* Small decorative dots/buds */}
      <circle cx="20" cy="35" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="45" cy="55" r="2.5" fill="currentColor" opacity="0.6" />
      <circle cx="75" cy="70" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="45" cy="15" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="65" cy="30" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
