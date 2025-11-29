import { useServerFn } from "@tanstack/react-start";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormActions } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
	type ContactFormValues,
	contactSchema,
} from "@/sections/contact/_constants/contact-schema";
import { sendContactMessage } from "@/sections/contact/_server/send-contact-message";

type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

export default function ContactFormCard() {
	const sendContactMessageFn = useServerFn(sendContactMessage);
	const [errors, setErrors] = useState<ContactErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		const form = event.currentTarget;
		const formData = new FormData(form);
		const values: ContactFormValues = {
			firstName: formData.get("firstName")?.toString().trim() ?? "",
			lastName: formData.get("lastName")?.toString().trim() ?? "",
			email: formData.get("email")?.toString().trim() ?? "",
			subject: formData.get("subject")?.toString().trim() ?? "",
			message: formData.get("message")?.toString().trim() ?? "",
		};

		const parsed = contactSchema.safeParse(values);

		const submit = async () => {
			if (!parsed.success) {
				const nextErrors: ContactErrors = {};
				for (const issue of parsed.error.issues) {
					const field = issue.path[0];
					if (
						typeof field === "string" &&
						!nextErrors[field as keyof ContactErrors]
					) {
						nextErrors[field as keyof ContactErrors] = issue.message;
					}
				}
				setErrors(nextErrors);
				const firstIssue = parsed.error.issues[0];
				toast.warning({
					title: "Check the form",
					description: firstIssue?.message ?? "Review the highlighted fields.",
				});
				setIsSubmitting(false);
				return;
			}

			setErrors({});
			try {
				await sendContactMessageFn({ data: parsed.data });
				form.reset();
				toast.success({
					title: "Message sent",
					description: "Thanks! Expect a response within two business days.",
				});
			} catch (error) {
				console.error(error);
				toast.error({
					title: "Message failed",
					description: "Something went wrong while sending your message.",
				});
			} finally {
				setIsSubmitting(false);
			}
		};

		void submit();
	};

	return (
		<Card className="relative w-full max-w-xl z-10">
			<CardContent>
				<Form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Input
							label="First Name"
							name="firstName"
							placeholder="Jamie"
							required
							wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
							variant={errors.firstName ? "error" : "default"}
						/>
						<Input
							label="Last Name"
							name="lastName"
							placeholder="Smith"
							required
							wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
							variant={errors.lastName ? "error" : "default"}
						/>
					</div>
					<Input
						type="email"
						label="Email"
						name="email"
						placeholder="your@email.com"
						required
						wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
						variant={errors.email ? "error" : "default"}
					/>
					<Input
						label="Project or company"
						name="subject"
						placeholder="Tell me what you're building"
						wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
						variant={errors.subject ? "error" : "default"}
					/>
					<Textarea
						label="How can I help?"
						name="message"
						placeholder="What problem are we solving together?"
						rows={5}
						required
						wrapperClassName="w-full bg-[color-mix(in_oklch,var(--color-background)_60%,var(--color-card)_40%)]"
						variant={errors.message ? "error" : "default"}
					/>
					<FormActions align="right">
						<Button type="submit" size="md" disabled={isSubmitting}>
							{isSubmitting ? "Sending..." : "Send message"}
						</Button>
					</FormActions>
				</Form>
			</CardContent>
		</Card>
	);
}
