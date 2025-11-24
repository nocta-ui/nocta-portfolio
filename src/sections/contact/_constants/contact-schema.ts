import { z } from "zod";

export const contactSchema = z.object({
	firstName: z
		.string()
		.min(2, "Add at least two characters for your first name.")
		.max(60, "That's a bit too long—shorten your first name."),
	lastName: z
		.string()
		.min(2, "Add at least two characters for your last name.")
		.max(60, "That's a bit too long—shorten your last name."),
	email: z.email("Use a valid email so someone can reply."),
	subject: z
		.string()
		.min(2, "Add a short hint about the project.")
		.max(120, "Keep the subject brief."),
	message: z
		.string()
		.min(10, "Share a bit more about the challenge.")
		.max(2_000, "Keep the first message concise."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
