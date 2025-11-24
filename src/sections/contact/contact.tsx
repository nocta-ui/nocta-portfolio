import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { cn } from "@/lib/utils";
import ContactFormCard from "@/sections/contact/_components/contact-form-card";
import { GridPattern } from "@/sections/contact/_components/grid-pattern";

export default function Contact() {
	return (
		/* biome-ignore lint/correctness/useUniqueElementIds: anchor target appears once */
		<Section
			id="contact"
			title="Start a project or say hello"
			description="Share a bit about your idea, timeline, or challenge. Let visitors know how quickly you typically respond and what details help you reply faster."
			className="flex justify-center overflow-hidden"
			badgeText="Contact"
			badgeIcon={<PaperPlaneIcon aria-hidden="true" className="size-3.5" />}
		>
			<ContactFormCard />
			<GridPattern
				squares={[
					[4, 4],
					[5, 1],
					[8, 2],
					[5, 3],
					[5, 5],
					[10, 10],
					[12, 15],
					[15, 10],
					[10, 15],
					[15, 10],
					[10, 15],
					[15, 10],
				]}
				className={cn(
					"mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
					"inset-x-0 inset-y-[-30%] h-[150%] skew-y-12",
				)}
			/>
		</Section>
	);
}
