export default function Button({
    children,
    onClick,
    className = "",
    variant = "default",
    size = "default",
    disabled = false,
    icon = null,
  }) {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
    const variantStyles = {
      default: "bg-purple-600 text-white hover:bg-purple-700",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    };
  
    const sizeStyles = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md text-sm",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
      "icon-sm": "h-8 w-8",
    };
  
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} gap-2`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        {children}
      </button>
    );
  }