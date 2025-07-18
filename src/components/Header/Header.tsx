import type { ReactElement } from 'react';
import { ChevronLeft } from '../../assets/icons/ChevronLeft';
import styles from './styles.module.css';

interface HeaderProps {
	heading: string;
	onChevronClick: () => void;

	avatar?: string;
	extension?: ReactElement;
	onHeadingClick?: () => void;
	onExtensionClick?: () => void;
}

export const Header = ({
	heading,
	onChevronClick,
	avatar,
	extension,
	onHeadingClick,
	onExtensionClick,
}: HeaderProps) => {
	return (
		<header className={styles.header}>
			<div className={styles.chat}>
				<button onClick={onChevronClick}>
					<ChevronLeft />
				</button>
				{avatar && (
					<div>
						<img src={avatar} alt="contact avatar" />
						<h1>{heading}</h1>
						<button onClick={onHeadingClick}></button>
					</div>
				)}
			</div>
			{!avatar && (
				<div className={styles.heading}>
					<h1>{heading}</h1>
					<button onClick={onHeadingClick}></button>
				</div>
			)}
			{extension && <button onClick={onExtensionClick}>{extension}</button>}
		</header>
	);
};
