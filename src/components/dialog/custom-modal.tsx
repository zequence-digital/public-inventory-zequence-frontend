import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export const CustomModal = ({
  open,
  onOpenChange,
  children,
  className,
  title,
}: Props) => {
  return (
    <div className={cn(` relative`, className)}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className=" [&_button[type='button']]:rounded-full [&_button[type='button']]:mt-1 [&_button[type='button']]:p-1 [&_button>svg]:text-gray-500 max-w-[573px] w-full px-0 pt-0 overflow-hidden [&_button>svg]:size-6">
          <DialogDescription className="text-muted-550 text-center sr-only">
            {title}
          </DialogDescription>
          <DialogTitle className="text-center text-lg font-semibold text-slate-900 sr-only">
            {title?.toUpperCase()}
          </DialogTitle>
          <div className=" w-full mx-auto pt-20">
            <div className="px-6">{children}</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
