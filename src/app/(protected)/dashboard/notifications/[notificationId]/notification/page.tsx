import { NotificationById } from "@/components/dashboard/notifications/notification-by-id";

type Props = {
  params: Promise<{ notificationId: string }>;
};

export const dynamic = "force-static";

export default async function Notification({ params }: Props) {
  const { notificationId } = await params;
  return <NotificationById notificationId={notificationId} />;
}
