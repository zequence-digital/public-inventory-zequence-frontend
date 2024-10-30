import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Social({ src, alt, className, ...rest }: Props) {
  return (
    <div {...rest} className={cn(``, className)}>
      <picture>
        <img src={src} alt={alt} />
      </picture>
    </div>
  );
}
