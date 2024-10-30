import { CheckCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { PasswordPolicyRule } from "@/types/password-policy";
const PasswordPolicyMessage: React.FC<{
  passwordPolicy: PasswordPolicyRule[];
}> = ({ passwordPolicy }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-muted-200">
        Your password must contain at least:
      </p>
      {passwordPolicy.map((policy, index) => (
        <div key={index} className="flex items-center gap-1 text-xs">
          <CheckCircledIcon
            className={cn(`size-4 text-muted-300`, {
              "text-success-100": policy.valid,
            })}
          />
          <span
            className={cn(`text-muted-300`, {
              "text-success-100": policy.valid,
            })}
          >
            {policy.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PasswordPolicyMessage;
