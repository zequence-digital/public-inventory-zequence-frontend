import { Notifications } from "@/components/dashboard/notifications/notifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Notifications",
};

type Props = {
  children: React.ReactNode;
};
export default function NotificationLayout({ children }: Props) {
  return (
    <div className="flex max-lg:flex-col-reverse max-lg:gap-6 max-lg:px-4 max-lg:py-6 max-lg:space-y-6">
      <Notifications />
      <div className="flex max-w-lg w-full">{children}</div>
    </div>
  );
}
