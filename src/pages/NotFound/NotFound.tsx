import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { Header } from '../../components/Header/Header';
import { Button } from '../../uikit/Button/Button';
import s from './styles.module.css';

const NotFound = () => {
	const width = useWindowWidth();
	const navigate = useNavigate();
	return (
		<>
			{width < 880 && (
				<Header heading="Somewhere" onChevronClick={() => navigate('/')} />
			)}
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
