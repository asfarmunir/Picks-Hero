import { NotificationType } from "@prisma/client";

export const sendNotification = async (
  message: string,
  type: NotificationType,
  userId: string
) => {
  const response = await fetch("/api/notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, type, userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to send notification");
  }
};
