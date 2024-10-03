import { sendEmail } from "../services/email.js";

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const emailContent = `
    Thank you for subscribing to our newsletter!

    Stay tuned for exclusive updates and offers.

    - The Team
  `;

  try {
    await sendEmail(email, "Newsletter Subscription", emailContent);
    return res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send subscription email" });
  }
};
