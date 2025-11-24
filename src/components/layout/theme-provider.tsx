"use client";

import {
	createContext,
	type PropsWithChildren,
	use,
	useCallback,
	useEffect,
	useState,
} from "react";
import { setThemeServerFn, type T as Theme } from "@/lib/theme";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren<{ theme: Theme }>;

const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({ children, theme }: Props) {
	const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

	const syncDomTheme = useCallback((nextTheme: Theme) => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(nextTheme);
		root.dataset.theme = nextTheme;
	}, []);

	useEffect(() => {
		setCurrentTheme(theme);
		syncDomTheme(theme);
	}, [theme, syncDomTheme]);

	function setTheme(val: Theme) {
		if (val === currentTheme) return;
		const previousTheme = currentTheme;
		setCurrentTheme(val);
		syncDomTheme(val);

		setThemeServerFn({ data: val }).catch(() => {
			setCurrentTheme(previousTheme);
			syncDomTheme(previousTheme);
		});
	}

	return (
		<ThemeContext value={{ theme: currentTheme, setTheme }}>
			{children}
		</ThemeContext>
	);
}

export function useTheme() {
	const val = use(ThemeContext);
	if (!val) throw new Error("useTheme called outside of ThemeProvider!");
	return val;
}
