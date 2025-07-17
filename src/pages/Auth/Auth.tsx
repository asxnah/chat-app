import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '../../uikit/Input/Input';
import { Button } from '../../uikit/Button/Button';
import styles from './styles.module.css';

const Auth = () => {
	const navigate = useNavigate();

	const [step, setStep] = useState<'email' | 'code'>(() => {
		const localStep = localStorage.getItem('step');
		return localStep === 'email' || localStep === 'code' ? localStep : 'email';
	});
	const [email, setEmail] = useState<string>(
		localStorage.getItem('email') || ''
	);
	const [code, setCode] = useState<string[]>(new Array(4).fill(''));
	const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

	const handleCodeChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		i: number
	) => {
		const value = e.target.value;

		const newCode = [...code];
		newCode[i] = value;
		setCode(newCode);

		if (value) {
			inputsRef.current[i + 1]?.focus();
		}
	};

	const handleCodeBackspace = (
		e: React.KeyboardEvent<HTMLInputElement>,
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
		localStorage.setItem('step', step);
	};

	useEffect(() => {
		if (code.join('') === '1234') {
			setIsIncorrect(true);
		}

		if (code.join('') === '0000') {
			navigate('/contacts');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [code]);

	useEffect(() => {
		inputsRef.current = inputsRef.current.slice(0, code.length);
	}, [code.length]);

	return (
		<main className={styles.auth}>
			<AnimatePresence mode="sync">
				{step === 'email' && (
					<motion.section
						key="email"
						initial={{ x: -50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -50, opacity: 0 }}
					>
						<h2>Enter your email to start chatting</h2>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleStep('code');
							}}
						>
							<Input
								type="email"
								autoComplete="email"
								placeholder="email@example.com"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									localStorage.setItem('email', e.target.value);
								}}
							/>
							<Button type="submit" content="Log in" disabled={email === ''} />
						</form>
					</motion.section>
				)}
				{step === 'code' && (
					<motion.section
						key="code"
						initial={{ x: 50, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 50, opacity: 0 }}
					>
						<div>
							<h2>Confirm your email</h2>
							<p>
								The code was sent to {email}.{' '}
								<button onClick={() => handleStep('email')}>
									Change email
								</button>
							</p>
						</div>
						<form>
							<div className={styles.digits}>
								{code.map((value, i) => {
									return (
										<input
											key={i}
											placeholder="_"
											value={value}
											minLength={1}
											maxLength={1}
											onChange={(e) => handleCodeChange(e, i)}
											onKeyDown={(e) => handleCodeBackspace(e, i)}
											ref={(el) => {
												inputsRef.current[i] = el;
											}}
											required
										/>
									);
								})}
							</div>
							{isIncorrect && <p>Incorrect code</p>}
						</form>
					</motion.section>
				)}
			</AnimatePresence>
		</main>
	);
};

export default Auth;
