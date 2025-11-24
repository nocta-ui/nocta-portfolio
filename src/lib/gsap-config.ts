import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

let pluginsRegistered = false;
const premiumEaseName = "premium-smooth";

export const registerGsapPlugins = () => {
	if (pluginsRegistered || typeof window === "undefined") return;
	gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);
	CustomEase.create(premiumEaseName, "M0,0 C0.25,0.1 0.25,1 1,1");
	pluginsRegistered = true;
};

export const premiumEase = premiumEaseName;

export { gsap, ScrollTrigger, SplitText, CustomEase };
