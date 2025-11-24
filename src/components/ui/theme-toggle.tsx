import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/components/layout/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";

	async function toggleTheme() {
		const nextTheme = isDark ? "light" : "dark";

		function update() {
			setTheme(nextTheme);
		}

		if (document.startViewTransition && nextTheme !== theme) {
			document.documentElement.style.viewTransitionName = "theme-transition";

			try {
				await document.startViewTransition(update).finished;
			} finally {
				document.documentElement.style.viewTransitionName = "";
			}
		} else {
			update();
		}
	}

	return (
		<Button
			className={cn(
				"bg-transparent hover:bg-transparent text-foreground/70 hover:text-foreground",
				"relative overflow-hidden",
				"[&_svg]:size-4",
			)}
			variant="icon"
			size="sm"
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			<MoonIcon
				className={cn(
					"transition-transform ease-out-quad duration-100",
					!isDark && "scale-0",
				)}
			/>
			<SunIcon
				className={cn(
					"absolute transition-transform ease-out-quad duration-100",
					isDark && "scale-0",
				)}
			/>
		</Button>
	);
}
