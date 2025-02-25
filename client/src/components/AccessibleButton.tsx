import { forwardRef } from "react";

interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  description?: string;
}

export const AccessibleButton = forwardRef<
  HTMLButtonElement,
  AccessibleButtonProps
>(({ label, description, className, children, ...props }, ref) => {
  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <button
      ref={ref}
      aria-label={label}
      aria-description={description}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
});

AccessibleButton.displayName = "AccessibleButton";
