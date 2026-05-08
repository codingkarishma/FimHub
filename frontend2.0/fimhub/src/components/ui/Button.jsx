export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 border font-medium tracking-[0.01em] transition-colors duration-200 font-sans focus:outline-none focus:ring-2 focus:ring-[#cde5e3] disabled:cursor-not-allowed disabled:opacity-60';
  
  const variants = {
    primary: 'border-[color:var(--fh-accent)] bg-[color:var(--fh-accent)] text-white hover:border-[#0a5656] hover:bg-[#0a5656]',
    secondary: 'border-[color:var(--fh-border)] bg-[color:var(--fh-mid)] text-[color:var(--fh-text)] hover:border-[color:var(--fh-border-strong)]',
    outline: 'border-[color:var(--fh-border)] bg-[color:var(--fh-surface)] text-[color:var(--fh-text)] hover:border-[color:var(--fh-border-strong)] hover:bg-[color:var(--fh-mid)]',
    ghost: 'border-transparent bg-transparent text-[color:var(--fh-accent)] hover:bg-[color:var(--fh-accent-soft)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-[0.95rem]',
    lg: 'px-6 py-3 text-base',
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
