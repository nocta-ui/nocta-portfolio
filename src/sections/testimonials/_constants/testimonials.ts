export interface TestimonialType {
	content: string;
	author: string;
	position: string;
	imageSrc: string;
}

export const testimonials: TestimonialType[] = [
	{
		content:
			"Working with this developer has significantly improved my digital presence. His attention to detail and creative approach exceeded my expectations.",
		author: "Bill Gates",
		position: "Tech Entrepreneur",
		imageSrc: "/placeholder-2.jpg",
	},
	{
		content:
			"His technical expertise and creativity are exceptional. He didn't just meet our goals – he helped us see the project from a new perspective.",
		author: "Elon Musk",
		position: "CEO, SpaceY",
		imageSrc: "/placeholder-2.jpg",
	},
	{
		content:
			"His innovative approach to problem-solving and commitment to the project made a strong impression. The results speak for themselves.",
		author: "Marie Curie",
		position: "Scientist",
		imageSrc: "/placeholder-2.jpg",
	},
	{
		content:
			"Working with Marek has been seamless and professional. His responsiveness and ability to deliver beyond expectations set him apart.",
		author: "Ada Lovelace",
		position: "Computing Pioneer",
		imageSrc: "/placeholder-2.jpg",
	},
	{
		content:
			"Great collaboration and clear communication throughout. His input on design was invaluable, and the results exceeded expectations.",
		author: "Steve Jobs",
		position: "Co-Founder, Pear Inc.",
		imageSrc: "/placeholder-2.jpg",
	},
];
