export default function Card({ 
  children, 
  className = '',
  hoverable = true,
  ...props 
}) {
  const hoverClass = hoverable ? 'hover:shadow-md' : '';
  return (
    <div 
      className={`bg-white rounded-lg p-6 shadow-sm transition-shadow border border-gray-100 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
