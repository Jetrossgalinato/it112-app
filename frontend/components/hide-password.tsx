import { Eye, EyeClosed } from "lucide-react";

export function HidePassword({
  showPassword,
  toggleShowPassword,
}: {
  showPassword: boolean;
  toggleShowPassword: () => void;
}) {
  return (
    <button
      type="button"
      onClick={toggleShowPassword}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
    </button>
  );
}
