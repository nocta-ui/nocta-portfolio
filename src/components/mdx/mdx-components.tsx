import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import React from "react";
import { MdxTable } from "@/components/mdx/mdx-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-");
}

function getNodeText(node: React.ReactNode): string {
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}

	if (Array.isArray(node)) {
		return node.map(getNodeText).join("");
	}

	if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
		return getNodeText(node.props.children);
	}

	return "";
}

interface CopyCodeButtonProps {
	code: string;
	className?: string;
}

function CopyCodeButton({ code, className }: CopyCodeButtonProps) {
	const [copied, setCopied] = React.useState(false);
	const timerRef = React.useRef<number | null>(null);

	const handleCopy = React.useCallback(async () => {
		if (!code || typeof navigator === "undefined" || !navigator.clipboard) {
			return;
		}

		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}
			timerRef.current = window.setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy code snippet", error);
		}
	}, [code]);

	React.useEffect(() => {
		return () => {
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: reset visual state when incoming code snippet updates
	React.useEffect(() => {
		setCopied(false);
	}, [code]);

	return (
		<Button
			variant="icon"
			size="sm"
			type="button"
			className={cn(
				"relative border border-border bg-card-elevated text-foreground/70 hover:text-foreground card-highlight shadow-sm",
				className,
			)}
			onClick={handleCopy}
			aria-label={copied ? "Copied code" : "Copy code"}
		>
			<CopyIcon
				className={cn(
					"transition-transform ease-out-quad duration-100",
					copied && "scale-0",
				)}
			/>
			<CheckIcon
				className={cn(
					"absolute transition-transform ease-out-quad duration-100",
					!copied && "scale-0",
				)}
			/>
		</Button>
	);
}

function InlineCode({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<code
			{...props}
			className={cn(
				"rounded-md border border-border/80 bg-card-muted/60 px-1.5 py-0.5 font-mono text-xs text-foreground",
				className,
			)}
		>
			{children}
		</code>
	);
}

function BlockCode({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const codeText = React.useMemo(() => getNodeText(children), [children]);

	return (
		<Card>
			<CopyCodeButton code={codeText} className="absolute right-2 top-2" />
			<code
				{...props}
				className={cn(
					"block overflow-x-auto p-4 pr-12 font-mono text-xs text-foreground/70",
					className,
				)}
			>
				{children}
			</code>
		</Card>
	);
}

interface TaskListItemProps extends React.HTMLAttributes<HTMLLIElement> {
	checked: boolean;
}

function TaskListItem({
	checked,
	className,
	children,
	...props
}: TaskListItemProps) {
	return (
		<li {...props} className={cn("ml-0 list-none", className)}>
			<div className="flex items-start gap-3 text-sm leading-relaxed text-foreground/70">
				{/* biome-ignore lint/a11y/useFocusableInteractive lint/a11y/useSemanticElements: This mirrors GitHub-style task checkbox visuals without altering MDX structure */}
				<span
					role="checkbox"
					aria-checked={checked}
					className={cn(
						"relative mt-0.5 flex h-5 w-5 items-center justify-center rounded border border-border bg-card text-foreground/70 card-highlight",
					)}
				>
					{checked && <CheckIcon className="h-3.5 w-3.5" />}
				</span>
				<span
					className={cn(
						"flex-1 text-sm leading-relaxed text-foreground/70",
						checked &&
							"text-foreground/70 line-through decoration-foreground/70 decoration-[0.08rem]",
					)}
				>
					{children}
				</span>
			</div>
		</li>
	);
}

function isTaskListCheckbox(
	node: React.ReactNode,
): node is React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>> {
	return (
		React.isValidElement<React.InputHTMLAttributes<HTMLInputElement>>(node) &&
		node.type === "input" &&
		(node.props as { type?: string }).type === "checkbox"
	);
}

export const mdxComponents = {
	h1: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			{...props}
			className={cn(
				"mt-12 mb-6 text-2xl font-medium leading-tight text-balance text-foreground",
				className,
			)}
		>
			{children}
		</h1>
	),
	h2: ({
		className,
		id,
		children,
		...props
	}: React.HTMLAttributes<HTMLHeadingElement>) => {
		const resolvedId = id ?? slugify(String(children ?? ""));
		return (
			<h2
				{...props}
				id={resolvedId}
				className={cn(
					"mt-12 mb-4 text-xl font-medium leading-tight text-balance text-foreground scroll-mt-28",
					className,
				)}
			>
				{children}
			</h2>
		);
	},
	h3: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			{...props}
			className={cn(
				"mt-10 mb-3 text-lg font-medium leading-tight text-foreground scroll-mt-28",
				className,
			)}
		>
			{children}
		</h3>
	),
	h4: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			{...props}
			className={cn(
				"mt-8 mb-2 text-sm font-medium leading-tight text-foreground scroll-mt-28",
				className,
			)}
		>
			{children}
		</h4>
	),

	p: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p
			{...props}
			className={cn(
				"my-4 text-sm leading-relaxed text-foreground/70",
				className,
			)}
		>
			{children}
		</p>
	),
	strong: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLElement>) => (
		<strong {...props} className={cn("font-medium text-foreground", className)}>
			{children}
		</strong>
	),
	em: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLElement>) => (
		<em {...props} className={cn("italic text-foreground/70", className)}>
			{children}
		</em>
	),

	a: ({
		className,
		children,
		href = "",
		target,
		rel,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
		const isInternalRoute = href.startsWith("/");
		const isHashLink = href.startsWith("#");
		const classes = cn(
			"inline-flex flex-wrap items-center gap-1 font-medium text-foreground underline underline-offset-4 decoration-transparent hover:decoration-current transition-[background-color,color,box-shadow,opacity,text-decoration-color] ease-out-quad duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50",
			className,
		);

		if (isInternalRoute) {
			return (
				<Link to={href} className={classes} {...props}>
					{children}
				</Link>
			);
		}
		const isExternal = !isInternalRoute && !isHashLink;
		return (
			<a
				{...props}
				href={href}
				className={classes}
				target={isExternal ? (target ?? "_blank") : target}
				rel={isExternal ? (rel ?? "noreferrer noopener") : rel}
			>
				{children}
			</a>
		);
	},

	ul: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLUListElement>) => (
		<ul
			{...props}
			className={cn(
				"my-4 ml-6 list-disc space-y-1.5 text-sm leading-relaxed text-foreground/70 marker:text-foreground/45",
				className,
			)}
		>
			{children}
		</ul>
	),
	ol: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			{...props}
			className={cn(
				"my-4 ml-6 list-decimal space-y-1.5 text-base leading-relaxed text-foreground/70 marker:text-foreground/45",
				className,
			)}
		>
			{children}
		</ol>
	),
	li: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLLIElement>) => {
		const childArray = React.Children.toArray(children);
		const checkboxIndex = childArray.findIndex(isTaskListCheckbox);

		if (checkboxIndex !== -1) {
			const checkboxElement = childArray[checkboxIndex] as React.ReactElement<
				React.InputHTMLAttributes<HTMLInputElement>
			>;
			const isChecked =
				checkboxElement.props.checked ??
				checkboxElement.props.defaultChecked ??
				false;
			const filteredChildren = childArray.filter(
				(_, index) => index !== checkboxIndex,
			);

			return (
				<TaskListItem
					{...props}
					className={className}
					checked={Boolean(isChecked)}
				>
					{filteredChildren}
				</TaskListItem>
			);
		}

		return (
			<li
				{...props}
				className={cn("text-sm leading-relaxed text-foreground/70", className)}
			>
				{children}
			</li>
		);
	},

	blockquote: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			{...props}
			className={cn(
				"relative my-6 rounded-lg border border-border bg-card shadow-md card-highlight px-4 italic text-sm leading-relaxed text-foreground/70",
				className,
			)}
		>
			{children}
		</blockquote>
	),

	code: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLElement>) => {
		const dataLanguage = (props as { "data-language"?: string })[
			"data-language"
		];
		const isBlock = typeof dataLanguage === "string";

		if (!isBlock) {
			return (
				<InlineCode className={className} {...props}>
					{children}
				</InlineCode>
			);
		}

		return (
			<BlockCode className={className} {...props}>
				{children}
			</BlockCode>
		);
	},
	pre: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLPreElement>) => {
		const dataLanguage = (props as { "data-language"?: string })[
			"data-language"
		];
		const isPrettyCodeBlock = typeof dataLanguage === "string";

		return (
			<pre
				{...props}
				className={cn(
					isPrettyCodeBlock
						? "my-0 rounded-none border-0 bg-transparent p-0 font-mono text-sm leading-relaxed text-foreground"
						: "relative my-4 rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed text-foreground/70 card-highligh overflow-x-auto",
					className,
				)}
			>
				{children}
			</pre>
		);
	},

	table: ({
		children,
		className,
		...rest
	}: React.HTMLAttributes<HTMLTableElement>) => (
		<MdxTable
			className={className}
			{...(rest as React.HTMLAttributes<HTMLDivElement>)}
		>
			{children}
		</MdxTable>
	),

	img: ({
		className,
		loading,
		alt = "",
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<div className="relative my-6 card-highlight rounded-lg border border-border/80">
			<img
				{...props}
				className={cn("w-full rounded-lg object-cover shadow-md", className)}
				loading={loading ?? "lazy"}
				alt={alt}
			/>
		</div>
	),

	figure: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLElement>) => {
		return (
			<figure {...props} className={cn("my-5", className)}>
				{children}
			</figure>
		);
	},

	hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
		<hr {...props} className={cn("my-8 border-border/80", className)} />
	),
};
