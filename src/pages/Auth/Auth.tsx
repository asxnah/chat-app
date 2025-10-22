import {
	useEffect,
	useRef,
	useState,
	type KeyboardEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '../../uikit/Input/Input';
import { Button } from '../../uikit/Button/Button';
import s from './styles.module.css';

const Auth = () => {
	const navigate = useNavigate();

	const [step, setStep] = useState<'email' | 'code'>(() =>
		localStorage.getItem('step') === 'email' ? 'email' : 'code'
	);
	const [email, setEmail] = useState<string>(
		localStorage.getItem('email') || ''
	);
	const [code, setCode] = useState<string[]>(['', '', '', '']);
	const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

	const handleCodeChange = (value: string, i: number) => {
		const newCode = [...code];
		newCode[i] = value;
		setCode(newCode);

		if (value) inputsRef.current[i + 1]?.focus();
	};

	const handleCodeBackspace = (
		e: KeyboardEvent<HTMLInputElement>,
		i: number
	) => {
		if (e.key === 'Backspace' && code[i] === '') {
			inputsRef.current[i - 1]?.focus();
		}
	};

	const handleStep = (step: 'email' | 'code') => {
		if (step === 'code') {
			setCode(['', '', '', '']);
		}
		setStep(step);
	};

	useEffect(() => {
		if (code.join('') === '0000') {
			navigate('/contacts');
		}
		if (code.join('') !== '' && code.every((digit) => digit !== '')) {
			setIsIncorrect(true);
		} else {
			setIsIncorrect(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [code]);

	useEffect(() => {
		localStorage.setItem('step', step);
	}, [step]);

	useEffect(() => {
		localStorage.setItem('email', email);
	}, [email]);

	return (
		<main className={s.auth}>
			<AnimatePresence mode="sync">
				{step === 'email' && (
					<motion.section
						key="email"
						className={s.auth__section}
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -50, opacity: 0 }}
					>
						<h2 className={s.auth__title}>
							Enter your email to start chatting
						</h2>
						<form
							className={s.auth__form}
							onSubmit={(e) => {
								e.preventDefault();
								handleStep('code');
							}}
						>
							<Input
								name="email"
								type="email"
								autoComplete="email"
								placeholder="email@example.com"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
							<Button type="submit" content="Log in" disabled={email === ''} />
						</form>
					</motion.section>
				)}

				{step === 'code' && (
					<motion.section
						key="code"
						className={s.auth__section}
						initial={{ x: 50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 50, opacity: 0 }}
					>
						<div className={s.auth__message}>
							<h2 className={s.auth__title}>Confirm your email</h2>
							<p className={s.auth__description}>
								The code was sent to {email}.{' '}
								<button
									className={s.auth__link}
									onClick={() => handleStep('email')}
								>
									Change email
								</button>
							</p>
						</div>
						<form className={s.auth__form}>
							<div className={s.digits__inputs}>
								{code.map((value, i) => {
									return (
										<input
											key={i}
											className={s.digits__input}
											placeholder="_"
											value={value}
											minLength={1}
											maxLength={1}
											onChange={(e) => handleCodeChange(e.target.value, i)}
											onKeyDown={(e) => handleCodeBackspace(e, i)}
											ref={(el) => {
												inputsRef.current[i] = el;
											}}
											required
										/>
									);
								})}
							</div>
							{isIncorrect && <p className={s.auth__error}>Incorrect code</p>}
						</form>
					</motion.section>
				)}
			</AnimatePresence>
		</main>
	);
};

export default Auth;
