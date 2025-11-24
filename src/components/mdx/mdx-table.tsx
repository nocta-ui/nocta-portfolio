"use client";

import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type TableRowData = Record<string, React.ReactNode>;

interface MdxTableProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

const TAGS = {
	table: "table",
	thead: "thead",
	tbody: "tbody",
	tr: "tr",
	th: "th",
	td: "td",
	caption: "caption",
} as const;

type MdxElement = React.ReactElement<{
	children?: React.ReactNode;
	mdxType?: string;
}>;

const isElementOfType = (
	node: React.ReactNode,
	tag: (typeof TAGS)[keyof typeof TAGS],
): node is MdxElement => {
	if (!React.isValidElement(node)) {
		return false;
	}
	const element = node as MdxElement;
	if (typeof element.type === "string") {
		return element.type === tag;
	}
	const mdxType = element.props.mdxType;
	return mdxType === tag;
};

const extractTextContent = (node: React.ReactNode): string => {
	if (node === null || node === undefined || typeof node === "boolean") {
		return "";
	}
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}
	if (Array.isArray(node)) {
		return node.map(extractTextContent).join(" ").trim();
	}
	if (React.isValidElement(node)) {
		const element = node as React.ReactElement<{ children?: React.ReactNode }>;
		return extractTextContent(element.props.children);
	}
	return "";
};

const slugifyHeader = (text: string) => {
	const slug = text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.trim();
	return slug || "column";
};

const getRowsFromSection = (section?: MdxElement) => {
	if (!section) return [];
	return React.Children.toArray(section.props.children).filter(
		(child): child is MdxElement =>
			React.isValidElement(child) && isElementOfType(child, TAGS.tr),
	);
};

const getCellsFromRow = (row?: MdxElement) => {
	if (!row) return [];
	return React.Children.toArray(row.props.children).filter(
		(child): child is MdxElement =>
			React.isValidElement(child) &&
			(isElementOfType(child, TAGS.th) || isElementOfType(child, TAGS.td)),
	);
};

const getCellContent = (cell: MdxElement): React.ReactNode => {
	return cell.props.children ?? null;
};

export const MdxTable: React.FC<MdxTableProps> = ({
	children,
	className,
	...props
}) => {
	const childArray = React.Children.toArray(children ?? null);
	const captionElement = childArray.find((child): child is MdxElement =>
		isElementOfType(child, TAGS.caption),
	);
	const theadElement = childArray.find((child): child is MdxElement =>
		isElementOfType(child, TAGS.thead),
	);
	const tbodyElement = childArray.find((child): child is MdxElement =>
		isElementOfType(child, TAGS.tbody),
	);

	const headerRow = getRowsFromSection(theadElement)[0];
	const headerCells = getCellsFromRow(headerRow);

	const bodyRows = getRowsFromSection(tbodyElement);

	if (!headerCells.length || !bodyRows.length) {
		return (
			<div className="relative my-8 w-full overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-md card-highlight">
				<table
					className={cn(
						"w-full border-collapse text-left text-sm text-foreground/70",
						className,
					)}
					{...props}
				>
					{children}
				</table>
			</div>
		);
	}

	const columnTitles = headerCells.map((cell, index) => {
		const text = extractTextContent(getCellContent(cell));
		return text || `Column ${index + 1}`;
	});
	const keyCounts = new Map<string, number>();
	const columnKeys = columnTitles.map((title, index) => {
		const base = slugifyHeader(title);
		const count = (keyCounts.get(base) ?? 0) + 1;
		keyCounts.set(base, count);
		if (count === 1 && base !== "column") {
			return base;
		}
		return `${base}-${count > 1 ? count : index + 1}`;
	});

	const data: TableRowData[] = bodyRows.map((row) => {
		const cells = getCellsFromRow(row);
		const rowData: TableRowData = {};
		columnKeys.forEach((key, index) => {
			const cell = cells[index];
			rowData[key] = cell ? getCellContent(cell) : null;
		});
		return rowData;
	});

	const columns: ColumnDef<TableRowData, unknown>[] = columnKeys.map(
		(key, index) => ({
			id: key,
			header: columnTitles[index],
			accessorFn: (row) => row[key],
			cell: ({ getValue }) => {
				const value = getValue() as React.ReactNode;
				return (
					<div className="text-sm leading-relaxed text-foreground/70">
						{value}
					</div>
				);
			},
			meta: {
				align: "left",
				className: "text-foreground/70",
				headerClassName: "text-foreground",
			},
		}),
	);

	const captionContent = captionElement?.props.children ?? null;

	return (
		<div className="my-8 space-y-2">
			<Table<TableRowData>
				columns={columns}
				data={data}
				enableSorting={false}
				className={cn("w-full", className)}
				{...props}
			/>
			{captionContent ? (
				<p className="text-center text-xs text-foreground/45">
					{captionContent}
				</p>
			) : null}
		</div>
	);
};
