import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Charsadda Chappal <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("Email sent:", data);
    return data;
  } catch (error) {
    console.log("Resend Error:", error);
    throw error;
  }
};

export default sendEmail;
