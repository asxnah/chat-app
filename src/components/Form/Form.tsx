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
	onSubmit: () => void;
	onClose: () => void;
}

export const Form = ({
	heading,
	onNameChange,
	onEmailChange,
	onSubmit,
	nameValue,
	emailValue,
	onClose,
}: FormProps) => {
	return (
		<section className={s.wrapper} onSubmit={onSubmit}>
			<form className={s.form}>
				<div className={s.heading}>
					<h3>{heading}</h3>
					<button onClick={onClose}>
						<CrossIcon />
					</button>
				</div>
				<div className={s.inputs}>
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
				<Button content="Save" />
			</form>
		</section>
	);
};
