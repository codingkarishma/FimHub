export default function Card({ 
  children, 
  className = '',
  hoverable = true,
  ...props 
}) {
  const hoverClass = hoverable ? 'hover:border-[color:var(--fh-border-strong)]' : '';
  return (
    <div 
      className={`surface-panel p-6 transition-colors duration-200 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
