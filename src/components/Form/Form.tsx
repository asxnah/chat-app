import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import s from './styles.module.css';

interface FormProps {
	buttonText: string;
	nameValue: string;
	emailValue: string;
	onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Form = ({
	buttonText,
	nameValue,
	emailValue,
	onNameChange,
	onEmailChange,
	onSubmit,
}: FormProps) => {
	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(e);
	};

	return (
		<form className={s.form} onSubmit={submit}>
			<div className={s.form__inputs}>
				<Input placeholder="Name" value={nameValue} onChange={onNameChange} />
				<Input
					type="email"
					placeholder="email@example.com"
					value={emailValue}
					onChange={onEmailChange}
				/>
			</div>
			<Button type="submit" content={buttonText} />
		</form>
	);
};
