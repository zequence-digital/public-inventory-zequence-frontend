import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { cn } from "@/lib/utils";
import { Spinner } from "../spinner";

type Props = {
  title: string;
  description: string;
  className?: string;
  isPending?: boolean;
  handleCancel?: () => void;
  handleContinue?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function Alert({
  title,
  description,
  isPending,
  open,
  onOpenChange,
  handleCancel,
  handleContinue,
  className,
  ...rest
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent {...rest} className={cn(``, className)}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className=" bg-primary-100 hover:bg-primary-100/80"
            onClick={handleContinue}
          >
            {isPending ? <Spinner className="border-white" /> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
