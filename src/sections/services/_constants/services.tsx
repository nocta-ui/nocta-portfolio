import {
	FigmaLogoIcon,
	FileIcon,
	FilePlusIcon,
	FileTextIcon,
	GitHubLogoIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { CleanCodeCardContent } from "@/sections/services/_components/clean-code-card-content";
import {
	ConvertingCardContent,
	type ConvertingCardIconSet,
} from "@/sections/services/_components/converting-card-content";
import { ServicesCardContent } from "@/sections/services/_components/services-card-content";

export interface ServiceItem {
	name: string;
	description: string;
}

export interface ServiceFeature {
	name: string;
	description: string;
	href: string;
	className: string;
	background: ReactNode;
}

const convertingCardIcons: ConvertingCardIconSet = {
	destination: {
		id: "client",
		Icon: PersonIcon,
	},
	hub: {
		id: "handoff",
		Icon: FigmaLogoIcon,
	},
	sources: [
		{
			id: "brief",
			Icon: FileTextIcon,
		},
		{
			id: "spec",
			Icon: FilePlusIcon,
		},
		{
			id: "assets",
			Icon: FileIcon,
		},
		{
			id: "repo",
			Icon: GitHubLogoIcon,
		},
	],
};

export const serviceItems: ServiceItem[] = [
	{
		name: "Service Package 01",
		description:
			"Swap in the flagship engagement you offer most often — outline the scope, duration, and business outcome.",
	},
	{
		name: "Service Package 02",
		description:
			"Use this slot for a second offer or retainer tier to highlight how you support different client needs.",
	},
	{
		name: "Dedicated Sprint",
		description:
			"Describe a focused two-to-four week collaboration you run to tackle a single feature, redesign, or prototype.",
	},
	{
		name: "Advisory Session",
		description:
			"Note how teams can book strategy calls, technical audits, or office hours when they need a quick unblock.",
	},
	{
		name: "Launch Support",
		description:
			"Explain the handoff, QA, and deployment support you bring during product launches or campaign pushes.",
	},
	{
		name: "Optimization Pass",
		description:
			"Reserve this line for performance, accessibility, or UX audits that keep shipped work feeling polished.",
	},
	{
		name: "Systems Audit",
		description:
			"Call out any platform review, stack migration, or modernization work that keeps teams prepared for scale.",
	},
];

export const bestPractices: ServiceItem[] = [
	{
		name: "Principle 01 — Lead With Outcomes",
		description:
			"A quick reminder to mention the measurable change you bring, not just the toolset you use to get there.",
	},
	{
		name: "Principle 02 — Keep Teams In The Loop",
		description:
			"Suggest how you handle weekly updates, async notes, or Loom recaps so clients know exactly what's moving.",
	},
	{
		name: "Principle 03 — Design For Handoff",
		description:
			"Explain how you package deliverables, documentation, or recordings so work is easy to extend later on.",
	},
	{
		name: "Principle 04 — Prototype Early",
		description:
			"Encourage readers to reference the prototypes, sandboxes, or experiments you typically run up front.",
	},
	{
		name: "Principle 05 — Sweat The Details",
		description:
			"Use this space to note your obsession with accessibility, polish, or animation that sets you apart.",
	},
	{
		name: "Principle 06 — Build For Change",
		description:
			"Remind teams that you keep architecture flexible, future-friendly, and ready for whatever V2 demands.",
	},
	{
		name: "Principle 07 — Document The Journey",
		description:
			"Point to how you capture learnings, write internal notes, or ship looms that demystify key decisions.",
	},
	{
		name: "Principle 08 — Test Relentlessly",
		description:
			"Reserve this bullet for your preferred QA cadence, tooling, or review rituals before anything ships.",
	},
	{
		name: "Principle 09 — Collaborate Openly",
		description:
			"Call out the cadence of workshops, office hours, or async standups you host with product partners.",
	},
	{
		name: "Principle 10 — Iterate After Launch",
		description:
			"Highlight how you stay close to analytics, user feedback, or retention data to plan the next release.",
	},
];

export const serviceFeatures: ServiceFeature[] = [
	{
		name: "Service Overview",
		description:
			"Swap in a short blurb that explains what types of projects you take on and how clients can engage.",
		href: "#",
		className: "col-span-1",
		background: <ServicesCardContent items={serviceItems} />,
	},

	{
		name: "From Design To Build",
		description:
			"Use this tile to describe how you translate Figma boards, decks, or briefs into production-ready work.",
		href: "#",
		className: "col-span-1",
		background: <ConvertingCardContent icons={convertingCardIcons} />,
	},

	{
		name: "Code Standards",
		description:
			"Outline the engineering values, review rituals, or guardrails that keep your work maintainable.",
		href: "#",
		className: "col-span-1",
		background: <CleanCodeCardContent items={bestPractices} />,
	},
];
