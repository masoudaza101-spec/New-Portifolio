import { Resend } from "resend";
import { site } from "@/data/site";

export type ContactNotification = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactNotification(
  message: ContactNotification
): Promise<{ skipped: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(
      "[email] RESEND_API_KEY not set — skipping notification for:",
      message.subject
    );
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "Aza Masoud Portfolio <onboarding@resend.dev>",
    to: site.email,
    replyTo: message.email,
    subject: `[Portfolio] ${message.subject}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
  });
  return { skipped: false };
}
