export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-bluePrimary border border-transparent  rounded-sm font-semibold text-xs text-white uppercase tracking-widest hover:opacity-60 transition ease-in-out ${
                    disabled && 'opacity-25'
                }` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
