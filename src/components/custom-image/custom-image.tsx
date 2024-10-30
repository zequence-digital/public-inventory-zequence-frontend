import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallBack?: string | React.ReactNode;
};

export function CustomImage({ src, alt, className, fallBack }: Props) {
  return (
    <Avatar className={cn(``, className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallBack}</AvatarFallback>
    </Avatar>
  );
}
