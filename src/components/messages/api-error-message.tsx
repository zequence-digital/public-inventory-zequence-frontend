// Design an error message component that will be displayed when an API request fails.

import { cn } from "@/lib/utils";

/**
 * API Error Message
 * This is a component that will be displayed when an API request fails.
 * It will show an error message to the user.
 *
 * @param {string} message - The error message to display
 * @param {string} className - The class name to apply to the component
 * @param {React.HTMLAttributes<HTMLDivElement>} rest - The rest of the props
 * @returns {JSX.Element} - The API Error Message
 */
type Props = {
  message: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export const ApiErrorMessage = ({ message, className, ...rest }: Props) => {
  if (!message) {
    return null;
  }
  return (
    <div {...rest} className={cn(``, className)}>
      <p>{message}</p>
    </div>
  );
};
