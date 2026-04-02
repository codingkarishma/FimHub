export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 font-sans focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60';
  
  const variants = {
    primary: 'bg-[#0f766e] text-white shadow-[0_18px_45px_-24px_rgba(15,118,110,0.75)] hover:-translate-y-0.5 hover:bg-[#115e59]',
    secondary: 'bg-[#f59e0b] text-slate-950 shadow-[0_18px_45px_-24px_rgba(245,158,11,0.65)] hover:-translate-y-0.5 hover:bg-[#fbbf24]',
    outline: 'border border-slate-300 bg-white/92 text-slate-800 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50',
    ghost: 'bg-transparent text-[#0f766e] hover:bg-[#ecf8f6]',
  };

  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
