import React, { useState } from 'react';
import styled from 'styled-components';
import { Mail, Phone, MapPin } from 'lucide-react';

const LectureSection = styled.section`
	background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
	padding: 4rem 1rem;
	text-align: center;
	color: white;
`;

const LectureContainer = styled.div`
	max-width: 900px;
	margin: 0 auto;
`;

const LectureTitle = styled.h1`
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 1rem;
	line-height: 1.2;

	@media (max-width: 768px) {
		font-size: 1.875rem;
	}
`;

const LectureSubtitle = styled.p`
	font-size: 1.125rem;
	margin-bottom: 2rem;
	opacity: 0.95;
`;

const LectureOptions = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1.5rem;
	margin-top: 2rem;
	margin-bottom: 3rem;
`;

const LectureCard = styled.div`
	background: rgba(255, 255, 255, 0.1);
	border-radius: 1rem;
	padding: 2rem;
	backdrop-filter: blur(10px);
	transition: all 0.3s ease;
	cursor: pointer;
	border: 2px solid rgba(255, 255, 255, 0.2);

	&:hover {
		transform: translateY(-4px);
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.4);
	}
`;

const LectureName = styled.h3`
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
`;

const LectureDescription = styled.p`
	font-size: 0.95rem;
	opacity: 0.9;
`;

const FormSection = styled.section`
	padding: 4rem 1rem;
	background-color: ${props => (props.darkMode ? '#111827' : '#ffffff')};
`;

const FormContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

const FormTitle = styled.h2`
	font-size: 2rem;
	font-weight: 700;
	text-align: center;
	margin-bottom: 2rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const FormBox = styled.form`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#f9fafb')};
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
	margin-bottom: 1.5rem;
`;

const FormGroupGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1rem;
	margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
	display: block;
	margin-bottom: 0.5rem;
	font-weight: 600;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const Required = styled.span`
	color: #ef4444;
`;

const FormInput = styled.input`
	width: 100%;
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	border: 1px solid ${props => (props.darkMode ? '#4b5563' : '#d1d5db')};
	background-color: ${props => (props.darkMode ? '#374151' : '#ffffff')};
	color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
	font-size: 1rem;

	&::placeholder {
		color: ${props => (props.darkMode ? '#9ca3af' : '#9ca3af')};
	}

	&:focus {
		outline: none;
		border-color: #a855f7;
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}
`;

const FormSelect = styled.select`
	width: 100%;
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	border: 1px solid ${props => (props.darkMode ? '#4b5563' : '#d1d5db')};
	background-color: ${props => (props.darkMode ? '#374151' : '#ffffff')};
	color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
	font-size: 1rem;

	&:focus {
		outline: none;
		border-color: #a855f7;
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}
`;

const FormTextarea = styled.textarea`
	width: 100%;
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	border: 1px solid ${props => (props.darkMode ? '#4b5563' : '#d1d5db')};
	background-color: ${props => (props.darkMode ? '#374151' : '#ffffff')};
	color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
	font-size: 1rem;
	font-family: inherit;
	resize: vertical;
	min-height: 150px;

	&::placeholder {
		color: ${props => (props.darkMode ? '#9ca3af' : '#9ca3af')};
	}

	&:focus {
		outline: none;
		border-color: #a855f7;
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}
`;

const SubmitButton = styled.button`
	width: 100%;
	padding: 0.75rem 1rem;
	background: linear-gradient(to right, #a855f7, #ec4899);
	color: white;
	font-weight: 700;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	font-size: 1rem;
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3);
	}

	&:active {
		transform: scale(0.98);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const SuccessMessage = styled.div`
	background-color: #10b981;
	color: white;
	padding: 1rem;
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	text-align: center;
	font-weight: 600;
`;

const ContactBox = styled.div`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#f9fafb')};
	border-radius: 1rem;
	padding: 2rem;
	margin-top: 2rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ContactTitle = styled.h3`
	font-size: 1.25rem;
	font-weight: 700;
	margin-bottom: 1rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const ContactSpace = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

const ContactItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

const ContactText = styled.span`
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
`;

const LectureBookingPage = ({ darkMode }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		date: '',
		speaker: 'both',
		location: '',
		guestCount: '',
		message: '',
	});

	const [submitted, setSubmitted] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();

		// Create email body
		const emailBody = `
שם המבקש: ${formData.name}
דוא"ל: ${formData.email}
טלפון: ${formData.phone}
מטבח ההרצאה: ${formData.speaker === 'me' ? 'אודה-י-ה' : formData.speaker === 'wife' ? 'מרגלית' : 'שנינו יחד'}
תאריך מבוקש: ${formData.date}
מיקום: ${formData.location}
מספר אורחים משוער: ${formData.guestCount}
הערות נוספות:
${formData.message}
		`;

		// Create mailto link
		const subject = `בקשת הרצאה - ${formData.name}`;
		const mailtoLink = `mailto:miracles@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
			emailBody,
		)}`;

		// Open email client
		window.location.href = mailtoLink;

		// Show success message
		setSubmitted(true);
		setFormData({
			name: '',
			email: '',
			phone: '',
			date: '',
			speaker: 'both',
			location: '',
			guestCount: '',
			message: '',
		});

		// Reset success message after 3 seconds
		setTimeout(() => setSubmitted(false), 3000);
	};

	return (
		<>
			<LectureSection>
				<LectureContainer>
					<LectureTitle>הזמנת הרצאה</LectureTitle>
					<LectureSubtitle>שתפו את סיפורי הניסים שלנו עם הקהילה שלכם</LectureSubtitle>

					<LectureOptions>
						<LectureCard>
							<LectureName>אודה-י-ה</LectureName>
							<LectureDescription>סיפורי הניסים האישיים שלי</LectureDescription>
						</LectureCard>

						<LectureCard>
							<LectureName>מרגלית</LectureName>
							<LectureDescription>סיפורי הניסים של אשתי</LectureDescription>
						</LectureCard>

						<LectureCard>
							<LectureName>יחד</LectureName>
							<LectureDescription>הרצאה משותפת - הניסים שלנו כזוג</LectureDescription>
						</LectureCard>
					</LectureOptions>
				</LectureContainer>
			</LectureSection>

			<FormSection darkMode={darkMode}>
				<FormContainer>
					<FormTitle darkMode={darkMode}>פרטי ההרצאה</FormTitle>

					{submitted && <SuccessMessage>תודה! בקשתך נשלחה בהצלחה. נחזור אליך בהקדם!</SuccessMessage>}

					<FormBox darkMode={darkMode} onSubmit={handleSubmit}>
						<FormGroup>
							<FormLabel darkMode={darkMode}>
								שם מלא <Required>*</Required>
							</FormLabel>
							<FormInput
								type='text'
								name='name'
								placeholder='שם פרטי ושם משפחה'
								value={formData.name}
								onChange={handleChange}
								required
								darkMode={darkMode}
							/>
						</FormGroup>

						<FormGroupGrid>
							<FormGroup>
								<FormLabel darkMode={darkMode}>
									דוא"ל <Required>*</Required>
								</FormLabel>
								<FormInput
									type='email'
									name='email'
									placeholder='example@email.com'
									value={formData.email}
									onChange={handleChange}
									required
									darkMode={darkMode}
								/>
							</FormGroup>
							<FormGroup>
								<FormLabel darkMode={darkMode}>
									טלפון <Required>*</Required>
								</FormLabel>
								<FormInput
									type='tel'
									name='phone'
									placeholder='050-1234567'
									value={formData.phone}
									onChange={handleChange}
									required
									darkMode={darkMode}
								/>
							</FormGroup>
						</FormGroupGrid>

						<FormGroupGrid>
							<FormGroup>
								<FormLabel darkMode={darkMode}>
									בחר מטבח <Required>*</Required>
								</FormLabel>
								<FormSelect name='speaker' value={formData.speaker} onChange={handleChange} darkMode={darkMode}>
									<option value='both'>שנינו יחד</option>
									<option value='me'>אודה-י-ה</option>
									<option value='wife'>מרגלית</option>
								</FormSelect>
							</FormGroup>
							<FormGroup>
								<FormLabel darkMode={darkMode}>
									תאריך מבוקש <Required>*</Required>
								</FormLabel>
								<FormInput
									type='date'
									name='date'
									value={formData.date}
									onChange={handleChange}
									required
									darkMode={darkMode}
								/>
							</FormGroup>
						</FormGroupGrid>

						<FormGroupGrid>
							<FormGroup>
								<FormLabel darkMode={darkMode}>
									מיקום <Required>*</Required>
								</FormLabel>
								<FormInput
									type='text'
									name='location'
									placeholder='עיר או כנס'
									value={formData.location}
									onChange={handleChange}
									required
									darkMode={darkMode}
								/>
							</FormGroup>
							<FormGroup>
								<FormLabel darkMode={darkMode}>
									מספר אורחים משוער <Required>*</Required>
								</FormLabel>
								<FormInput
									type='number'
									name='guestCount'
									placeholder='50'
									value={formData.guestCount}
									onChange={handleChange}
									required
									darkMode={darkMode}
								/>
							</FormGroup>
						</FormGroupGrid>

						<FormGroup>
							<FormLabel darkMode={darkMode}>הערות נוספות</FormLabel>
							<FormTextarea
								name='message'
								placeholder='ספר לנו קצת על האירוע שלך...'
								value={formData.message}
								onChange={handleChange}
								darkMode={darkMode}
							/>
						</FormGroup>

						<SubmitButton type='submit'>שלח בקשה להרצאה</SubmitButton>
					</FormBox>

					<ContactBox darkMode={darkMode}>
						<ContactTitle darkMode={darkMode}>יצירת קשר ישירה</ContactTitle>
						<ContactSpace>
							<ContactItem>
								<Mail style={{ width: '1.25rem', height: '1.25rem', color: '#a855f7', flexShrink: 0 }} />
								<ContactText darkMode={darkMode}>miracles@example.com</ContactText>
							</ContactItem>
							<ContactItem>
								<Phone style={{ width: '1.25rem', height: '1.25rem', color: '#a855f7', flexShrink: 0 }} />
								<ContactText darkMode={darkMode}>050-1234567</ContactText>
							</ContactItem>
							<ContactItem>
								<MapPin style={{ width: '1.25rem', height: '1.25rem', color: '#a855f7', flexShrink: 0 }} />
								<ContactText darkMode={darkMode}>ירושלים, ישראל</ContactText>
							</ContactItem>
						</ContactSpace>
					</ContactBox>
				</FormContainer>
			</FormSection>
		</>
	);
};

export default LectureBookingPage;
