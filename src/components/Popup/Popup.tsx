import { motion } from 'framer-motion';
import { CrossIcon } from '../../assets/icons/CrossIcon';
import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import s from './styles.module.css';

interface FormProps {
	heading: string;
	nameValue: string;
	emailValue: string;
	onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onClose: () => void;
	error?: {
		active: boolean;
		msg: string;
	};
}

export const Popup = ({
	heading,
	onNameChange,
	onEmailChange,
	onSubmit,
	nameValue,
	emailValue,
	onClose,
	error = {
		active: false,
		msg: 'Error creating a contact. Please try again later.',
	},
}: FormProps) => {
	return (
		<section className={s.wrapper}>
			<form className={s.form} onSubmit={onSubmit}>
				<div className={s.heading}>
					<h3 className={s.heading__title}>{heading}</h3>
					<button onClick={onClose}>
						<CrossIcon />
					</button>
				</div>
				<motion.p
					className={s.form__error}
					initial={{ y: -16, opacity: 0 }}
					animate={{
						y: error.active ? 0 : -16,
						opacity: error.active ? 1 : 0,
					}}
				>
					{error.msg}
				</motion.p>
				<div className={s.form__inputs}>
					<Input
						name="name"
						placeholder="Name"
						maxLength={120}
						required
						onChange={onNameChange}
						value={nameValue}
					/>
					<Input
						type="email"
						name="email"
						placeholder="Email"
						maxLength={60}
						required
						onChange={onEmailChange}
						value={emailValue}
					/>
				</div>
				<Button content="Save" type="submit" />
			</form>
		</section>
	);
};
