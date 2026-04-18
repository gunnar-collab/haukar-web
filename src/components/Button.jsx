export default function Button({
  children,
  variant = 'primary', // Options: 'primary', 'secondary', 'outline', 'overlay'
  size = 'md',         // Options: 'sm', 'md', 'lg'
  icon,                // Name of the Material Symbol (e.g., 'arrow_forward')
  iconPosition = 'left', // Options: 'left', 'right'
  uppercase = false,   // Force uppercase text
  className = '',      // Any extra Tailwind classes to append
  ...props             // Captures onClick, type, disabled, etc.
}) {
  
  // Base styles that EVERY button gets
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md gap-2 outline-none focus:ring-2 focus:ring-offset-2";
  
  // The exact color schemes from our design system
  const variants = {
    primary: "bg-[#c8102e] text-white hover:bg-red-800 focus:ring-[#c8102e]",
    secondary: "bg-[#1c2c6c] text-white hover:bg-blue-900 focus:ring-[#1c2c6c]",
    outline: "bg-white border-2 border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white focus:ring-[#c8102e]",
    overlay: "bg-black/50 text-white hover:bg-black/70 border border-white/20 backdrop-blur-sm focus:ring-white/50" 
  };

  // Standardized paddings and text sizes
  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  // Text transform logic
  const textStyle = uppercase ? "uppercase tracking-widest text-[0.9em]" : "tracking-normal";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${textStyle} ${className}`}
      {...props}
    >
      {/* Optional Leading Icon */}
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[1.2em]">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {/* Optional Trailing Icon */}
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[1.2em]">{icon}</span>
      )}
    </button>
  );
}