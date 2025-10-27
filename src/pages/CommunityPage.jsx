import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, ChevronDown, Send, Award, Zap } from 'lucide-react';

// ==================== STYLED COMPONENTS ====================

const PageSection = styled.section`
	padding: 2rem 0;
`;

const PageHeader = styled.div`
	text-align: center;
	margin-bottom: 3rem;
	background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
	color: white;
	padding: 3rem 1rem;
	border-radius: 1rem;
`;

const PageTitle = styled.h1`
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 0.5rem;

	@media (max-width: 768px) {
		font-size: 1.875rem;
	}
`;

const PageSubtitle = styled.p`
	font-size: 1.125rem;
	opacity: 0.95;
	margin-bottom: 1rem;
`;

const PageDescription = styled.p`
	font-size: 1rem;
	opacity: 0.9;
	max-width: 600px;
	margin: 0 auto;
`;

const TwoColumnLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
	margin-bottom: 3rem;

	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
	}
`;

const FormColumn = styled.div`
	flex: 1;
`;

const StoriesColumn = styled.div`
	flex: 1;
`;

const FormTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 1.5rem;
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
		border-color: #8b5cf6;
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
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
		border-color: #8b5cf6;
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
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
	min-height: 120px;

	&::placeholder {
		color: ${props => (props.darkMode ? '#9ca3af' : '#9ca3af')};
	}

	&:focus {
		outline: none;
		border-color: #8b5cf6;
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}
`;

const Checkbox = styled.input`
	width: 1.25rem;
	height: 1.25rem;
	cursor: pointer;
	accent-color: #8b5cf6;
`;

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
	font-size: 0.875rem;
`;

const SubmitButton = styled.button`
	width: 100%;
	padding: 0.875rem 1rem;
	background: linear-gradient(to right, #8b5cf6, #a855f7);
	color: white;
	font-weight: 700;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	font-size: 1rem;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	&:hover {
		box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
		transform: translateY(-2px);
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
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
`;

const MiracleCard = styled.div`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 0.75rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	transition: all 0.3s ease;
	margin-bottom: 1.5rem;
	border-left: 4px solid #8b5cf6;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}
`;

const MiracleCardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem;
	background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1));
	cursor: pointer;
`;

const MiracleIcon = styled.span`
	font-size: 2.5rem;
	margin-right: 1rem;
	display: flex;
	align-items: center;
`;

const MiracleInfo = styled.div`
	flex: 1;
`;

const MiracleTitle = styled.h3`
	font-size: 1.125rem;
	font-weight: 700;
	margin-bottom: 0.25rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const MiracleAuthor = styled.div`
	font-size: 0.875rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	margin-bottom: 0.5rem;
`;

const MiracleCategory = styled.span`
	display: inline-block;
	background-color: ${props => (props.darkMode ? '#374151' : '#e5e7eb')};
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
	padding: 0.25rem 0.75rem;
	border-radius: 0.375rem;
	font-size: 0.75rem;
	margin-right: 0.5rem;
	font-weight: 600;
`;

const MiracleStats = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
`;

const Stat = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	font-size: 0.875rem;
`;

const IconButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props => (props.darkMode ? '#e5e7eb' : '#374151')};
	transition: color 0.3s ease;

	&:hover {
		color: #8b5cf6;
	}
`;

const MiracleContent = styled.div`
	padding: 1.5rem;
	max-height: ${props => (props.expanded ? '100%' : '0')};
	overflow: ${props => (props.expanded ? 'visible' : 'hidden')};
	transition: max-height 0.3s ease;
	background-color: ${props => (props.darkMode ? '#111827' : '#f9fafb')};
`;

const MiracleStory = styled.div`
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
	line-height: 1.6;
	white-space: pre-wrap;
	word-break: break-word;
`;

const EmptyState = styled.div`
	text-align: center;
	padding: 2rem 1rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	background-color: ${props => (props.darkMode ? '#1f2937' : '#f9fafb')};
	border-radius: 0.75rem;
`;

const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;
`;

const StatCard = styled.div`
	background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
	border-radius: 0.75rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	padding: 1.5rem;
	text-align: center;
	color: white;
`;

const StatValue = styled.div`
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
	font-size: 0.875rem;
	opacity: 0.9;
`;

const ChevronIcon = styled(ChevronDown)`
	transition: transform 0.3s ease;
	transform: ${props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const CharCounter = styled.span`
	font-size: 0.75rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	margin-top: 0.25rem;
`;

// ==================== CUSTOM HOOKS ====================

const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = React.useState(() => {
		try {
			const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
			return item ? JSON.parse(item) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = value => {
		try {
			setStoredValue(value);
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
};

// ==================== MAIN COMPONENT ====================

const CommunityPage = ({ darkMode }) => {
	const [expandedMiracle, setExpandedMiracle] = useState(null);
	const [communityMiracles, setCommunityMiracles] = useLocalStorage('community-miracles', [
		{
			id: 1,
			name: 'דוד כהן',
			title: 'נס בתנאים קשים',
			story: 'בזמן שהייתי במצב קשה מאוד, ה׳ שלח לי אדם שעזר לי יותר ממה שאי פעם חשבתי שאפשר. זה שינה את כל חיי.',
			category: 'עזרה',
			icon: '🤝',
			likes: 23,
			date: '2024-10-15',
			approved: true,
		},
		{
			id: 2,
			name: 'שרה לוי',
			title: 'שיבוט בחולה בילדתי',
			story: 'אחרי שנים של בדיקות, הרופאים מצאו את הבעיה והצליחו לטפל בה. בנתי בריאה וחיים שלנו חזרו לנורמליות.',
			category: 'רפואה',
			icon: '💊',
			likes: 45,
			date: '2024-10-10',
			approved: true,
		},
		{
			id: 3,
			name: 'יאיר משה',
			title: 'עבודה שמפרנסת אותנו טוב',
			story: 'חיפשתי עבודה למשך זמן רב. לא האמנתי שיהיה לי עבודה כל כך טובה עם בוס כל כך טוב. תודה לה׳!',
			category: 'פרנסה',
			icon: '💼',
			likes: 34,
			date: '2024-10-05',
			approved: true,
		},
	]);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		category: 'אחר',
		title: '',
		story: '',
		allowShare: true,
	});

	const [submitted, setSubmitted] = useState(false);
	const [likes, setLikes] = useLocalStorage('community-likes', {});

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (!formData.name || !formData.email || !formData.title || !formData.story) {
			alert('אנא מלא את כל השדות הנדרשים');
			return;
		}

		const newMiracle = {
			id: Date.now(),
			name: formData.name,
			title: formData.title,
			story: formData.story,
			category: formData.category,
			icon: '✨',
			likes: 0,
			date: new Date().toISOString().split('T')[0],
			approved: false,
		};

		setCommunityMiracles([newMiracle, ...communityMiracles]);
		setSubmitted(true);
		setFormData({
			name: '',
			email: '',
			category: 'אחר',
			title: '',
			story: '',
			allowShare: true,
		});

		// Create email body for admin notification
		const emailBody = `
בקשת הוספת נס חדש לקהילה:

שם: ${formData.name}
דוא"ל: ${formData.email}
קטגוריה: ${formData.category}
כותרת: ${formData.title}

סיפור:
${formData.story}

אישור שיתוף: ${formData.allowShare ? 'כן' : 'לא'}
		`;

		const subject = `נס חדש בהמתנה - ${formData.title}`;
		const mailtoLink = `mailto:miracles@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
			emailBody,
		)}`;

		window.location.href = mailtoLink;

		setTimeout(() => setSubmitted(false), 3000);
	};

	const toggleLike = id => {
		setLikes(prev => ({
			...prev,
			[id]: !prev[id],
		}));

		setCommunityMiracles(prev =>
			prev.map(miracle => (miracle.id === id ? { ...miracle, likes: miracle.likes + (likes[id] ? -1 : 1) } : miracle)),
		);
	};

	const approvedMiracles = communityMiracles.filter(m => m.approved);

	const stats = {
		total: approvedMiracles.length,
		submitted: communityMiracles.filter(m => !m.approved).length,
		totalLikes: approvedMiracles.reduce((sum, m) => sum + m.likes, 0),
	};

	return (
		<PageSection>
			<PageHeader>
				<PageTitle>🎁 קהילת הניסים</PageTitle>
				<PageSubtitle>שתפו את ניסיכם עם העולם</PageSubtitle>
				<PageDescription>כאן כל אחד יכול לשתף את סיפור הנסים שלו. הניסים של אחרים הם השראה וחוזק לנו כולנו.</PageDescription>
			</PageHeader>

			{/* Stats */}
			<StatsGrid>
				<StatCard>
					<StatValue>{stats.total}</StatValue>
					<StatLabel>סיפורים מופרסמים</StatLabel>
				</StatCard>
				<StatCard>
					<StatValue>{stats.submitted}</StatValue>
					<StatLabel>בהמתנה לאישור</StatLabel>
				</StatCard>
				<StatCard>
					<StatValue>{stats.totalLikes}</StatValue>
					<StatLabel>סה"כ לייקים</StatLabel>
				</StatCard>
			</StatsGrid>

			{/* Form and Stories */}
			<TwoColumnLayout>
				{/* Form Column */}
				<FormColumn>
					<FormTitle darkMode={darkMode}>שתוף את הנסים שלך</FormTitle>

					{submitted && (
						<SuccessMessage>
							<Award size={20} />
							תודה! סיפורך נשלח בהצלחה. נבדוק אותו בקרוב!
						</SuccessMessage>
					)}

					<FormBox darkMode={darkMode} onSubmit={handleSubmit}>
						<FormGroup>
							<FormLabel darkMode={darkMode}>
								שם פרטי <Required>*</Required>
							</FormLabel>
							<FormInput
								type='text'
								name='name'
								placeholder='שמך'
								value={formData.name}
								onChange={handleChange}
								darkMode={darkMode}
								required
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel darkMode={darkMode}>
								דוא"ל <Required>*</Required>
							</FormLabel>
							<FormInput
								type='email'
								name='email'
								placeholder='your@email.com'
								value={formData.email}
								onChange={handleChange}
								darkMode={darkMode}
								required
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel darkMode={darkMode}>
								קטגוריה <Required>*</Required>
							</FormLabel>
							<FormSelect name='category' value={formData.category} onChange={handleChange} darkMode={darkMode}>
								<option value='רפואה'>רפואה</option>
								<option value='משפחה'>משפחה</option>
								<option value='פרנסה'>פרנסה</option>
								<option value='הצלה'>הצלה</option>
								<option value='עזרה'>עזרה</option>
								<option value='גאולה'>גאולה</option>
								<option value='רוחניות'>רוחניות</option>
								<option value='אחר'>אחר</option>
							</FormSelect>
						</FormGroup>

						<FormGroup>
							<FormLabel darkMode={darkMode}>
								כותרת הסיפור <Required>*</Required>
							</FormLabel>
							<FormInput
								type='text'
								name='title'
								placeholder='כותרת קצרה של הנס'
								value={formData.title}
								onChange={handleChange}
								darkMode={darkMode}
								required
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel darkMode={darkMode}>
								סיפור הנס <Required>*</Required>
							</FormLabel>
							<FormTextarea
								name='story'
								placeholder='ספר לנו את סיפורך... (עד 1000 תווים)'
								value={formData.story}
								onChange={handleChange}
								maxLength={1000}
								darkMode={darkMode}
								required
							/>
							<CharCounter darkMode={darkMode}>{formData.story.length} / 1000</CharCounter>
						</FormGroup>

						<FormGroup>
							<CheckboxLabel darkMode={darkMode}>
								<Checkbox type='checkbox' name='allowShare' checked={formData.allowShare} onChange={handleChange} />
								אני מסכים ששיתוף זה יהיה פומבי לכל המטפלים
							</CheckboxLabel>
						</FormGroup>

						<SubmitButton type='submit'>
							<Send size={18} />
							שלח סיפור
						</SubmitButton>
					</FormBox>
				</FormColumn>

				{/* Stories Column */}
				<StoriesColumn>
					<FormTitle darkMode={darkMode}>סיפורי הקהילה</FormTitle>

					{approvedMiracles.length > 0 ? (
						approvedMiracles.map(miracle => (
							<MiracleCard key={miracle.id} darkMode={darkMode}>
								<MiracleCardHeader onClick={() => setExpandedMiracle(expandedMiracle === miracle.id ? null : miracle.id)}>
									<MiracleIcon>{miracle.icon}</MiracleIcon>
									<MiracleInfo>
										<MiracleTitle darkMode={darkMode}>{miracle.title}</MiracleTitle>
										<MiracleAuthor darkMode={darkMode}>ע"י {miracle.name}</MiracleAuthor>
										<div>
											<MiracleCategory darkMode={darkMode}>{miracle.category}</MiracleCategory>
										</div>
									</MiracleInfo>
									<MiracleStats>
										<Stat darkMode={darkMode}>
											<Zap size={16} />
											{miracle.date}
										</Stat>
										<IconButton
											darkMode={darkMode}
											onClick={e => {
												e.stopPropagation();
												toggleLike(miracle.id);
											}}
										>
											<Heart
												size={20}
												fill={likes[miracle.id] ? '#ef4444' : 'none'}
												color={likes[miracle.id] ? '#ef4444' : 'currentColor'}
											/>
										</IconButton>
										<Stat darkMode={darkMode}>{miracle.likes}</Stat>
									</MiracleStats>
									<ChevronIcon
										size={24}
										expanded={expandedMiracle === miracle.id}
										style={{
											marginLeft: '1rem',
											color: darkMode ? '#e5e7eb' : '#374151',
										}}
									/>
								</MiracleCardHeader>
								<MiracleContent expanded={expandedMiracle === miracle.id} darkMode={darkMode}>
									<MiracleStory darkMode={darkMode}>{miracle.story}</MiracleStory>
								</MiracleContent>
							</MiracleCard>
						))
					) : (
						<EmptyState darkMode={darkMode}>
							<div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
							<p>אין סיפורים מופרסמים עדיין. היה הראשון ששתף!</p>
						</EmptyState>
					)}
				</StoriesColumn>
			</TwoColumnLayout>
		</PageSection>
	);
};

export default CommunityPage;
