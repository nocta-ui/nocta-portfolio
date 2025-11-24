import { MDXProvider } from "@mdx-js/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { NotFound } from "@/components/not-found";
import { Toaster } from "@/components/ui/toast";
import { LenisProvider } from "@/lib/lenis-context";
import { getRootSeo } from "@/lib/seo";
import { getThemeServerFn } from "@/lib/theme";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => {
		const { meta, links, scripts } = getRootSeo();
		return {
			meta,
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				...(links ?? []),
			],
			scripts,
		};
	},
	loader: () => getThemeServerFn(),
	notFoundComponent: NotFound,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5,
					},
				},
			}),
	);
	const theme = Route.useLoaderData();
	return (
		<html className={theme} lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={theme}>
						<MDXProvider components={mdxComponents}>
							<LenisProvider>
								<Navbar />
								{children}
							</LenisProvider>
						</MDXProvider>
					</ThemeProvider>
					<Toaster />
					<Scripts />
				</QueryClientProvider>
			</body>
		</html>
	);
}
