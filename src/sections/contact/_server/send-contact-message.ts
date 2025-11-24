import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { contactSchema } from "@/sections/contact/_constants/contact-schema";
import { renderContactMessageEmail } from "@/sections/contact/_emails/contact-message";

export type SendContactMessageResponse = { success: true };

export const sendContactMessage = createServerFn({ method: "POST" })
	.inputValidator(contactSchema)
	.handler(async ({ data }) => {
		const resendKey = process.env.RESEND_API_KEY;
		const to = process.env.RESEND_TO_EMAIL;
		const from =
			process.env.RESEND_FROM_EMAIL ??
			"Portfolio Contact <onboarding@resend.dev>";

		if (!resendKey) {
			throw new Error("Missing RESEND_API_KEY environment variable.");
		}

		if (!to) {
			throw new Error("Missing RESEND_TO_EMAIL environment variable.");
		}

		const resend = new Resend(resendKey);

		const { html, text } = await renderContactMessageEmail(data);

		const response = await resend.emails.send({
			from,
			to: [to],
			replyTo: data.email,
			subject: data.subject || `New inquiry from ${data.firstName}`,
			html,
			text,
		});

		if (response.error) {
			throw new Error(response.error.message);
		}

		return { success: true };
	});
