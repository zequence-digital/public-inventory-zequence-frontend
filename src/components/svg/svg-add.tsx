import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
const SvgAdd = ({ className }: Props) => {
  return (
    <svg
      className={cn("fill-current", className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0001 4.16602V15.8327M4.16675 9.99935H15.8334"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgAdd;
