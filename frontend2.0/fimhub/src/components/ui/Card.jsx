export default function Card({ 
  children, 
  className = '',
  hoverable = true,
  ...props 
}) {
  const hoverClass = hoverable ? 'hover:-translate-y-1.5 hover:shadow-[0_32px_90px_-46px_rgba(15,23,42,0.32)]' : '';
  return (
    <div 
      className={`surface-panel p-6 transition-all duration-200 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
