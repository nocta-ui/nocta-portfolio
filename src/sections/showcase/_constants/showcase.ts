export type ShowcaseHighlight = {
	title: string;
	description: string;
	src: string;
	poster: string;
	className?: string;
	projectUrl?: string;
};

export const showcaseHighlights: ShowcaseHighlight[] = [
	{
		title: "Showreel Highlight 01",
		description:
			"Swap in a looping cut from your hero campaign, launch film, or motion study to set the tone.",
		src: "",
		poster: "/placeholder-1.jpg",
		className: "lg:col-span-2 lg:row-span-2",
	},
	{
		title: "Showreel Highlight 02",
		description:
			"Use this slot for a second vignette, prototype capture, or screen-recorded walkthrough.",
		src: "",
		poster: "/placeholder-1.jpg",
		className: "lg:col-span-1 lg:row-span-1",
	},
	{
		title: "Showreel Highlight 03",
		description:
			"Explain what viewers are seeing, what role you played, or what tools and collaborators were involved.",
		src: "",
		poster: "/placeholder-1.jpg",
		className: "lg:col-span-1 lg:row-span-1",
	},
];
