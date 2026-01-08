import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';

const NewsletterContainer = styled(motion.div)`
	background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
	border-radius: 1rem;
	padding: 2.5rem;
	text-align: center;
	color: white;
	margin: 3rem 0;
	box-shadow: 0 10px 40px rgba(168, 85, 247, 0.3);
`;

const IconWrapper = styled.div`
	width: 60px;
	height: 60px;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 1.5rem;
`;

const Title = styled.h3`
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
`;

const Description = styled.p`
	font-size: 1rem;
	opacity: 0.95;
	margin-bottom: 1.5rem;
	max-width: 400px;
	margin-left: auto;
	margin-right: auto;
`;

const Form = styled.form`
	display: flex;
	gap: 0.75rem;
	max-width: 450px;
	margin: 0 auto;

	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const Input = styled.input`
	flex: 1;
	padding: 0.875rem 1.25rem;
	border-radius: 0.5rem;
	border: 2px solid rgba(255, 255, 255, 0.3);
	background: rgba(255, 255, 255, 0.15);
	color: white;
	font-size: 1rem;
	direction: ltr;
	text-align: right;

	&::placeholder {
		color: rgba(255, 255, 255, 0.7);
	}

	&:focus {
		outline: none;
		border-color: white;
		background: rgba(255, 255, 255, 0.25);
	}
`;

const Button = styled(motion.button)`
	padding: 0.875rem 1.5rem;
	border-radius: 0.5rem;
	border: none;
	background: white;
	color: #a855f7;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;

const SuccessMessage = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	font-size: 1.1rem;
	font-weight: 600;
`;

const Newsletter = () => {
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('idle'); // idle, loading, success, error

	const handleSubmit = async e => {
		e.preventDefault();

		if (!email || !email.includes('@')) {
			return;
		}

		setStatus('loading');

		try {
			// שמירה ב-localStorage לבינתיים
			const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
			if (!subscribers.includes(email)) {
				subscribers.push(email);
				localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
			}

			// כאן אפשר להוסיף שליחה לשרת בעתיד
			// await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });

			setStatus('success');
			setEmail('');

			setTimeout(() => setStatus('idle'), 5000);
		} catch (error) {
			setStatus('error');
		}
	};

	return (
		<NewsletterContainer
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
		>
			<IconWrapper>
				<Mail size={28} />
			</IconWrapper>

			<Title>🔔 הישארו מעודכנים</Title>

			<Description>הירשמו לקבלת עדכונים על סיפורי ניסים חדשים ישירות למייל</Description>

			{status === 'success' ? (
				<SuccessMessage initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
					<CheckCircle size={24} />
					תודה! נרשמת בהצלחה
				</SuccessMessage>
			) : (
				<Form onSubmit={handleSubmit}>
					<Input
						type='email'
						placeholder='הכנס את המייל שלך'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<Button type='submit' disabled={status === 'loading'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
						<Send size={18} />
						{status === 'loading' ? 'שולח...' : 'הרשמה'}
					</Button>
				</Form>
			)}
		</NewsletterContainer>
	);
};

export default Newsletter;
