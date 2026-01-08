import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: 200px 0;
    }
`;

const SkeletonWrapper = styled.div`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 0.75rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	padding: 1.5rem;
	margin-bottom: 1.5rem;
`;

const SkeletonElement = styled.div`
	background: ${props =>
		props.darkMode
			? 'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%)'
			: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'};
	background-size: 400px 100%;
	animation: ${shimmer} 1.5s infinite;
	border-radius: 0.375rem;
`;

const SkeletonHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const SkeletonIcon = styled(SkeletonElement)`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
`;

const SkeletonContent = styled.div`
	flex: 1;
`;

const SkeletonTitle = styled(SkeletonElement)`
	height: 1.25rem;
	width: 60%;
	margin-bottom: 0.5rem;
`;

const SkeletonText = styled(SkeletonElement)`
	height: 1rem;
	width: 40%;
`;

const SkeletonCard = ({ darkMode }) => (
	<SkeletonWrapper darkMode={darkMode}>
		<SkeletonHeader>
			<SkeletonIcon darkMode={darkMode} />
			<SkeletonContent>
				<SkeletonTitle darkMode={darkMode} />
				<SkeletonText darkMode={darkMode} />
			</SkeletonContent>
		</SkeletonHeader>
	</SkeletonWrapper>
);

export default SkeletonCard;
