import type { ReactNode } from 'react';
import { CrossIcon } from '../../assets/icons/CrossIcon';
import s from './styles.module.css';

interface FormProps {
	heading: string;
	children: ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onClose: () => void;
}

export const Popup = ({ heading, children, onSubmit, onClose }: FormProps) => {
	return (
		<section className={s.wrapper}>
			<form className={s.form} onSubmit={onSubmit}>
				<div className={s.heading}>
					<h3 className={s.heading__title}>{heading}</h3>
					<button onClick={onClose}>
						<CrossIcon />
					</button>
				</div>
				{children}
			</form>
		</section>
	);
};
