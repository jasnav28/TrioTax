import React from 'react';
import { cn } from '@/lib/utils';
import {
	PlusIcon,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
	icon: LucideIcon;
	label: string;
	value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
	// Content props
	title?: string;
	description?: string;
	contactInfo?: ContactInfoProps[];
	formSectionClassName?: string;
};

export function ContactCard({
	title = 'Contact With Us',
	description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
	contactInfo,
	className,
	formSectionClassName,
	children,
	...props
}: ContactCardProps) {
	return (
		<div
			className={cn(
				'bg-card border border-neutral-200 dark:border-neutral-800 relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3',
				className,
			)}
			{...props}
		>
			<PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 dark:text-neutral-500 z-10" />
			<PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 dark:text-neutral-500 z-10" />
			<PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-neutral-400 dark:text-neutral-500 z-10" />
			<PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-neutral-400 dark:text-neutral-500 z-10" />
			<div className="flex flex-col justify-between lg:col-span-2">
				<div className="relative h-full space-y-6 px-6 py-8 md:p-10">
					<h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl text-neutral-900 dark:text-white">
						{title}
					</h1>
					<p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
						{description}
					</p>
					<div className="grid gap-4 md:grid md:grid-cols-2 pt-6 border-t border-neutral-200 dark:border-neutral-800 mt-6">
						{contactInfo?.map((info, index) => (
							<ContactInfo key={index} {...info} />
						))}
					</div>
				</div>
			</div>
			<div
				className={cn(
					'bg-neutral-50/50 dark:bg-[#0c0c0d] flex h-full w-full items-center border-t border-neutral-200 dark:border-neutral-800 p-6 md:col-span-1 md:border-t-0 md:border-l',
					formSectionClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}

function ContactInfo({
	icon: Icon,
	label,
	value,
	className,
	...props
}: ContactInfoProps) {
	return (
		<div className={cn('flex items-center gap-3.5 p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50 dark:bg-[#121214] shadow-sm', className)} {...props}>
			<div className="bg-[#7342E2]/8 dark:bg-[#7342E2]/20 rounded-lg p-2.5 shrink-0 flex items-center justify-center border border-[#7342E2]/10 dark:border-[#a882fa]/10">
				<Icon className="h-5 w-5 text-[#7342E2] dark:text-[#a882fa]" />
			</div>
			<div>
				<p className="font-bold text-neutral-900 dark:text-neutral-100 text-sm leading-none">{label}</p>
				<p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1.5 break-all">{value}</p>
			</div>
		</div>
	);
}
