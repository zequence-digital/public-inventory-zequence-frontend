import { NotificationById } from "@/components/dashboard/notifications/notification-by-id";
import { Metadata } from "next";

type Props = {
  params: Promise<{ notificationId: string }>;
};

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { notificationId } = await params;
  return {
    title: `Notification ${notificationId}`,
    description: `Notification ${notificationId}`,
  };
}

export default async function Notification({ params }: Props) {
  const { notificationId } = await params;
  return <NotificationById notificationId={notificationId} />;
}
