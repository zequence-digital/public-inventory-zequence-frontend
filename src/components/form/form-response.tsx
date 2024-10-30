import { cn } from "@/lib/utils";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

interface FormResponseProps {
  message?: string;
  type: "success" | "error";
}

export const FormResponse = ({ message, type }: FormResponseProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "bg-success/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-success",
        {
          "bg-destructive/15 text-destructive": type === "error",
        },
      )}
    >
      {type === "success" ? (
        <CheckCircledIcon className="size-4" />
      ) : (
        <ExclamationTriangleIcon className="size-4" />
      )}
      <p>{message}</p>
    </div>
  );
};
