import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export function FooterLinks({ title, links, className }: Props) {
  return (
    <div
      className={cn(
        `grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex`,
        className,
      )}
    >
      <div className="self-stretch text-white text-base font-semibold leading-normal">
        {title}
      </div>
      <div className="self-stretch min-h-[185px] flex-col justify-start items-start flex">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className="self-stretch py-2 justify-start items-start inline-flex"
          >
            <span className="grow shrink basis-0 text-muted-900 text-sm font-normal leading-[21px]">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
