import type { ChangeEvent } from 'react';
import s from './styles.module.css';

interface InputProps {
	name: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	id?: string;
	type?: 'text' | 'email';
	minLength?: number;
	maxLength?: number;
	autoComplete?: 'email' | 'off';
}

export const Input = ({
	name,
	value,
	onChange,
	placeholder = name,
	id = name,
	type = 'text',
	minLength = 1,
	maxLength = 255,
}: InputProps) => {
	return (
		<input
			name={name}
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={s.input}
			minLength={minLength}
			maxLength={maxLength}
			required
		/>
	);
};
