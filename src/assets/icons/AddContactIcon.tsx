interface AddContactIconProps {
	color?: string;
}

export const AddContactIcon = ({ color = '#1f1f1f' }: AddContactIconProps) => {
	return (
		<svg
			width="20px"
			height="20px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g strokeWidth="0" />
			<g strokeLinecap="round" strokeLinejoin="round" />
			<g>
				<g>
					<path
						d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M19 16V13M19 13V10M19 13H16M19 13H22M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
						stroke={color}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</g>
		</svg>
	);
};
