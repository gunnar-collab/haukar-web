import React from 'react';

export default function Button({
  children,
  variant = 'primary', // Options: 'primary', 'secondary', 'outline', 'overlay', 'glow'
  size = 'md',         // Options: 'sm', 'md', 'lg'
  icon,                // Name of the Material Symbol (e.g., 'arrow_forward')
  iconPosition = 'left', // Options: 'left', 'right'
  uppercase = true,    // Force uppercase text (defaults to true for sleek design)
  className = '',      // Any extra Tailwind classes to append
  ...props             // Captures onClick, type, disabled, etc.
}) {
  
  // Standardized paddings and text sizes (Sleek Calendar proportions)
  const sizes = {
    sm: "px-6 py-3 text-[9px]",
    md: "px-8 py-3.5 text-[11px]",
    lg: "px-10 py-4 text-[13px]"
  };

  // Text transform logic
  const textStyle = uppercase ? "uppercase tracking-[0.2em]" : "tracking-wider";

  // 🪄 THE VIP METALLIC GOLD GLOW EFFECT 🪄
  if (variant === 'glow') {
    return (
      <button 
        className={`group relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] active:scale-95 transition-all shadow-md hover:shadow-lg ${className}`}
        {...props}
      >
        {/* The shimmering metallic gold gradient */}
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#D4AF37_0%,#FFF2CD_25%,#AA7C11_50%,#FFF2CD_75%,#D4AF37_100%)]" />
        
        {/* Inner button surface (FIXED: Added 'relative z-10' to pop text above the glow!) */}
        <span className={`relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-white font-bold text-[#1c2c6c] transition-all group-hover:bg-gray-50 gap-2 ${sizes[size]} ${textStyle}`}>
          {icon && iconPosition === 'left' && (
            <span className="material-symbols-outlined text-[1.2em] text-[#D4AF37]">{icon}</span>
          )}
          
          <span>{children}</span>
          
          {icon && iconPosition === 'right' && (
            <span className="material-symbols-outlined text-[1.2em] text-[#D4AF37]">{icon}</span>
          )}
        </span>
      </button>
    );
  }

  // Base styles that EVERY standard button gets
  const baseStyles = "inline-flex items-center justify-center font-black rounded-[1.25rem] transition-all duration-300 gap-2 outline-none focus:ring-2 focus:ring-offset-2";
  
  // The exact color schemes from our design system (with deep shadows and hover translations)
  const variants = {
    primary: "bg-[#c8102e] text-white shadow-xl shadow-[#c8102e]/20 hover:-translate-y-1 hover:shadow-[#c8102e]/40 hover:bg-black focus:ring-[#c8102e]",
    secondary: "bg-[#1c2c6c] text-white shadow-xl shadow-[#1c2c6c]/20 hover:-translate-y-1 hover:shadow-[#1c2c6c]/40 hover:bg-black focus:ring-[#1c2c6c]",
    outline: "bg-white border-2 border-gray-100 text-[#1c2c6c] hover:border-[#1c2c6c] hover:bg-[#1c2c6c]/5 hover:-translate-y-1 shadow-sm focus:ring-[#1c2c6c]",
    overlay: "bg-black/50 text-white hover:bg-black/70 border border-white/20 backdrop-blur-sm hover:-translate-y-1 focus:ring-white/50",
    ghost: "bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-[#1c2c6c] hover:border-white hover:-translate-y-1 focus:ring-white"
  };

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