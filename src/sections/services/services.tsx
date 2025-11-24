import { StarIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { serviceFeatures } from "@/sections/services/_constants/services";

import { ServiceCard as Card } from "./_components/service-card";

export default function Services() {
	return (
		/* biome-ignore lint/correctness/useUniqueElementIds: anchor target appears once */
		<Section
			id="services"
			title="Showcase the services you offer"
			description="Summarize the type of projects you take on, the tools you use, or the problems you help teams solve."
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
			badgeText="What you do"
			badgeIcon={<StarIcon aria-hidden="true" />}
		>
			{serviceFeatures.map((feature) => {
				const featureId = `service-title-${feature.name
					.toLowerCase()
					.replace(/\s+/g, "-")}`;

				return (
					<Card key={feature.name} {...feature} aria-labelledby={featureId} />
				);
			})}
		</Section>
	);
}
