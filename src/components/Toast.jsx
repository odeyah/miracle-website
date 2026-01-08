import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const slideIn = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
`;

const ToastContainer = styled.div`
	position: fixed;
	top: 1rem;
	left: 1rem;
	z-index: 9999;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const ToastWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 1rem 1.25rem;
	border-radius: 0.5rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	animation: ${props => (props.isExiting ? slideOut : slideIn)} 0.3s ease;
	min-width: 280px;
	max-width: 400px;

	background-color: ${props => {
		switch (props.type) {
			case 'success':
				return '#10b981';
			case 'error':
				return '#ef4444';
			case 'info':
				return '#3b82f6';
			default:
				return '#6b7280';
		}
	}};
	color: white;
`;

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Message = styled.p`
	flex: 1;
	margin: 0;
	font-size: 0.95rem;
	font-weight: 500;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	color: white;
	cursor: pointer;
	padding: 0.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.8;
	transition: opacity 0.2s;

	&:hover {
		opacity: 1;
	}
`;

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
	const [isExiting, setIsExiting] = React.useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsExiting(true);
			setTimeout(onClose, 300);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	const handleClose = () => {
		setIsExiting(true);
		setTimeout(onClose, 300);
	};

	const getIcon = () => {
		switch (type) {
			case 'success':
				return <CheckCircle size={20} />;
			case 'error':
				return <AlertCircle size={20} />;
			default:
				return <Info size={20} />;
		}
	};

	return (
		<ToastWrapper type={type} isExiting={isExiting}>
			<IconWrapper>{getIcon()}</IconWrapper>
			<Message>{message}</Message>
			<CloseButton onClick={handleClose}>
				<X size={18} />
			</CloseButton>
		</ToastWrapper>
	);
};

// Toast Manager Component
export const ToastManager = ({ toasts, removeToast }) => {
	return (
		<ToastContainer>
			{toasts.map(toast => (
				<Toast
					key={toast.id}
					message={toast.message}
					type={toast.type}
					onClose={() => removeToast(toast.id)}
					duration={toast.duration}
				/>
			))}
		</ToastContainer>
	);
};

// Custom Hook for Toast
export const useToast = () => {
	const [toasts, setToasts] = React.useState([]);

	const addToast = (message, type = 'info', duration = 4000) => {
		const id = Date.now();
		setToasts(prev => [...prev, { id, message, type, duration }]);
	};

	const removeToast = id => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	};

	return { toasts, addToast, removeToast };
};

export default Toast;
