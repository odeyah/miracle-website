import React from 'react';
import styled from 'styled-components';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const Button = styled(motion.button)`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	color: ${props => (props.isBookmarked ? '#f59e0b' : props.darkMode ? '#9ca3af' : '#6b7280')};
	transition: color 0.2s;

	&:hover {
		color: #f59e0b;
	}
`;

const BookmarkCount = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
`;

const BookmarkButton = ({ isBookmarked, onClick, darkMode, showCount, count }) => {
	return (
		<Button
			onClick={onClick}
			isBookmarked={isBookmarked}
			darkMode={darkMode}
			whileTap={{ scale: 0.9 }}
			title={isBookmarked ? 'הסר מהשמורים' : 'שמור סיפור'}
		>
			<Bookmark size={20} fill={isBookmarked ? '#f59e0b' : 'none'} />
			{showCount && <BookmarkCount>{count || 0}</BookmarkCount>}
		</Button>
	);
};

export default BookmarkButton;
