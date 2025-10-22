import { useNavigate } from 'react-router-dom';
import { Button } from '../../uikit/Button/Button';
import s from './styles.module.css';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<>
			<main className={s.main}>
				<p>Page not found</p>
				<div className={s.buttonContainer}>
					<Button
						content="Return to test page"
						onClick={() => {
							navigate('/');
						}}
					/>
				</div>
			</main>
		</>
	);
};

export default NotFound;
