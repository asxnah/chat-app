import type { ChangeEvent, HTMLAttributes } from 'react';
import s from './styles.module.css';

type TogglerProps = HTMLAttributes<HTMLDivElement> & {
	content: string;
	checked: boolean;
	onToggle: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Toggler = ({
	content,
	checked,
	onToggle,
	...rest
}: TogglerProps) => {
	return (
		<div className={s.toggler} {...rest} tabIndex={0}>
			<p>{content}</p>
			<div className={s.checkbox}>
				<input
					type="checkbox"
					name="checkbox"
					checked={checked}
					onChange={onToggle}
				/>
				<svg
					width="32"
					height="16"
					viewBox="0 0 32 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="32" height="16" rx="8" fill="#EDEDED" />
					<circle cx="8" cy="8" r="8" fill="#CCCCCC" />
				</svg>
			</div>
		</div>
	);
};
