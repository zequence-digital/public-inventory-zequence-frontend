// Design an error message component that will be displayed when an API request fails due to network issues.

import { cn } from "@/lib/utils";

/**
 * API Network Message
 * This is a component that will be displayed when an API request fails due to network issues.
 * It will show a network error message to the user.
 *
 * @param {string} message - The error message to display
 * @param {string} className - The class name to apply to the component
 * @param {React.HTMLAttributes<HTMLDivElement>} rest - The rest of the props
 * @returns {JSX.Element} - The API Network Message
 */

type Props = {
  message: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ApiNetworkMessage = ({ message, className, ...rest }: Props) => {
  if (!message) {
    return null;
  }
  return (
    <div {...rest} className={cn(``, className)}>
      <p>{message}</p>
    </div>
  );
};
