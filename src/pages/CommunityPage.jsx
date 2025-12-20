import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Heart, ChevronDown, Send, Award, Zap } from 'lucide-react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import SEO from '../components/SEO';

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

	@media (max-width: 1024px) {
		order: 2; // שיופיע אחרי הסיפורים בטאבלטים וניידים
	}
`;

const StoriesColumn = styled.div`
	flex: 1;

	@media (max-width: 1024px) {
		order: 1; // כדי שהניסים יופיעו לפני הטופס בטאבלטים וניידים
	}
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
	position: relative;
	z-index: 1000;

	&:focus {
		outline: none;
		border-color: #8b5cf6;
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}

	option {
		background-color: ${props => (props.darkMode ? '#374151' : '#ffffff')};
		color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
		padding: 0.75rem;
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
	padding: 1rem;
	max-height: ${props => (props.expanded ? '3000px' : '0')};
	overflow: hidden;
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

const FilterSection = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;
`;

const FilterInput = styled.input`
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

const FilterSelectInput = styled.select`
	width: 100%;
	padding: 0.75rem 1rem;
	border-radius: 0.5rem;
	border: 1px solid ${props => (props.darkMode ? '#4b5563' : '#d1d5db')};
	background-color: ${props => (props.darkMode ? '#374151' : '#ffffff')};
	color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
	font-size: 1rem;
	text-align: center;

	&:focus {
		outline: none;
		border-color: #8b5cf6;
		box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
	}
	option {
		text-align: center;
		background-color: ${props => (props.darkMode ? '#374151' : '#ffffff')};
		color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
	}
`;

// ==================== MAIN COMPONENT ====================

const CommunityPage = ({ darkMode }) => {
	const [expandedMiracle, setExpandedMiracle] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [communityMiracles, setCommunityMiracles] = useState([
		{
			id: 1,
			name: 'אודה-י-ה דוד אבלס',
			title: 'כשבוטחים בהשם הכל אפשרי',
			story: (
				<>
					<p style={{ marginBottom: '0.5rem' }}>
						'בחודש מסוים ישבתי לחשב את ההוצאות שלי וגיליתי שבחודש הבא צפויה לי בעיה כלכלית – אני אהיה בחריגה של כ־5,000 ש"ח.
						פניתי אל השם, דיברתי איתו מעומק הלב ואמרתי לו שרק הוא יכול לעזור לי, ורק אליו אני פונה. באמת שלא ידעתי מאיפה תגיע
						הישועה, אבל סמכתי עליו לחלוטין. בתחילת החודש הלכתי למס הכנסה להגיש בקשה להחזרי מס על שש השנים האחרונות. שאלתי את
						הפקידה תוך כמה זמן הכסף צפוי להיכנס לחשבון, והיא אמרה לי שזה יכול לקחת בין שלושה חודשים לחצי שנה. ושוב אמרתי להשם
						שרק הוא יכול לעזור. ובדרך של נס, בתוך שישה ימים בלבד – הכסף נכנס לחשבון: 8,500 ש"ח. אין לי ספק מי עומד מאחורי זה.
						✨'
					</p>
				</>
			),
			category: 'פרנסה',
			icon: (
				<img src='./income.png' alt='icon' width='32' height='32' style={{ verticalAlign: 'middle', borderRadius: '6px' }} />
			),
			year: '2025',
			approved: true,
		},
		{
			id: 2,
			name: 'חני גולדברג',
			title: 'ההתעקשות האחרונה',
			story: (
				<>
					<p style={{ marginBottom: '0.5rem' }}>
						'הייתי בשידוכים ארבע שנים ללא הצלחה. ואז החלטתי לנסוע לקבר רחל עם חברה, ושם קיבלתי על עצמי לא לדבר לשון הרע יום
						אחד בשבוע. כעבור שלושה שבועות בלבד, שדכנית ותיקה התקשרה עם הצעה ואמרה "לא יודעת למה, אבל משהו בלב אמר לי להתקשר
						דווקא היום". היא נפגשה עם הבחור ואחרי חודשיים התארסו. השדכנית אמרה לי "לא הייתי מתקשרת אלייך, אבל באותו רגע היה
						לי דחף לא מוסבר.".',
					</p>
				</>
			),
			category: 'זיווג',
			icon: '💑',
			year: '2022',
			approved: true,
		},
		{
			id: 3,
			name: 'משפחת לוי',
			title: 'הצק שהגיע בזמן הכי מתאים',
			story: (
				<>
					<p style={{ marginBottom: '0.5rem' }}>
						'משפחת לוי מבבית שמש נקלעה חודש אחד לחובות קשים בעקבות פיטורים פתאומיים של האב. באותו שבוע הם קיבלו התראה אחרונה
						לפני ניתוק חשמל. האם סיפרה שנשברה ובכתה, ואז החליטה לתת צדקה קטנה למרות המצב הקשה. יומיים אחרי — הגיע בדואר צ'ק
						החזר מס הכנסה על סך 7,800 ש"ח. הבקשה להחזר הוגשה כמעט שנה קודם לכן — אבל מעולם לא קיבלו אישור או תשובה. הם ראו
						בזה נס גם כי הסכום היה בדיוק לשקל מה שהיו חייבים לכיסוי חובות החשמל והמים.',
					</p>
				</>
			),
			category: 'פרנסה',
			icon: '💼',
			year: '2019',
			approved: true,
		},
		{
			id: 4,
			name: 'אנונימי',
			title: 'הישועה הרפואית שלי',
			story: (
				<>
					<p style={{ marginBottom: '0.5rem' }}>
						עברתי טיפולי פוריות שלצערנו לא הראו שום תוצאות טובות והרופא המליץ ללכת לניתוח שבו יהיו לי כ-2% סיכוי להצלחה. זה
						היה מאוד מייאש
					</p>
					<p style={{ marginBottom: '0.5rem' }}>
						בטיפול אצל רופא אחר קיבלתי מינונים גבוהים יותר, התוצאות השתפרו, אך עדיין לא היתה ישועה גמורה ועדיין חשבו על ניתוח
						עם אחוזי הצלחה בודדים.
					</p>
					<p style={{ marginBottom: '0.5rem' }}>
						בעצת המאמן שלי, הלכתי לקבל דעה שניה אצל פרופסור מומחה, שהציע להוסיף משהו נוסף לטיפול שאני מקבל. התחלתי לקחת את
						הטיפול על בסיס יומי.
					</p>
					<p style={{ marginBottom: '0.5rem' }}>
						וכעבור כחצי שנה של הטיפול המשולב, הגיעה הישועה המיוחלת כך שגם ניתוח כבר לא היה נחוץ. הודו לה' כי טוב.
					</p>
				</>
			),
			category: 'רפואה',
			icon: '🏥',
			year: '2020',
			approved: true,
		},
		{
			id: 5,
			name: 'משפחת פרידמן',
			title: 'הילד שחזר לנשום',
			story: (
				<>
					<p style={{ marginBottom: '0.5rem' }}>
						התינוק שלנו שהיה בן שנה וארבעה חודשים קיבל דלקת ריאות חמורה ונכנס למצוקה נשימתית קשה. בבית החולים כבר הכינו אותנו
						ההורים לאפשרות של הנשמה ארוכה וסכנה ממשית. המשפחה ערכה "מי שברך לחולה" בבית הכנסת באותו ערב. ולמחרת — הרופאים
						נדהמו: רמות ה־oxygen saturation שהיה 64% (רמה מסוכנת מאוד) עלה תוך לילה ל־94%. צילום הריאות הראה שהדלקת נעלמה
						כמעט לחלוטין. הרופא הבכיר אמר להורים שזה "מה turnaround הכי מהירים שראה". הבן שלנו שוחרר הביתה אחרי יומיים — בריא
						לחלוטין.
					</p>
				</>
			),
			category: 'רפואה',
			icon: '🏥',
			year: '2017',
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
	const [firebaseLikes, setFirebaseLikes] = useState({});
	const [error, setError] = useState(null);

	// טען את הלייקים מ-Firebase
	useEffect(() => {
		const loadLikes = async () => {
			try {
				const likesDoc = await getDoc(doc(db, 'community', 'likes'));
				if (likesDoc.exists()) {
					setFirebaseLikes(likesDoc.data());
				}
			} catch (error) {
				setError('שגיאה בטעינת הנתונים.');
			}
		};
		loadLikes();
	}, []);

	const filteredMiracles = useMemo(() => {
		return communityMiracles
			.filter(m => m.approved)
			.filter(miracle => {
				const matchesSearch =
					searchQuery === '' ||
					miracle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					miracle.name.toLowerCase().includes(searchQuery.toLowerCase());
				const matchesCategory = selectedCategory === 'all' || miracle.category === selectedCategory;
				return matchesSearch && matchesCategory;
			});
	}, [communityMiracles, searchQuery, selectedCategory]);

	const categoryOptions = ['all', ...new Set(communityMiracles.map(m => m.category))];

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!formData.name || !formData.email || !formData.title || !formData.story) {
			alert('אנא מלא את כל השדות הנדרשים');
			return;
		}

		if (formData.name.trim().length < 3) {
			alert('שם חייב להכיל לפחות 3 אותיות');
			return;
		}

		try {
			const response = await fetch('/api/sendCommunity', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					category: formData.category,
					title: formData.title,
					story: formData.story,
					allowShare: formData.allowShare,
				}),
			});

			if (response.ok) {
				const newMiracle = {
					id: Date.now(),
					name: formData.name,
					title: formData.title,
					story: formData.story,
					category: formData.category,
					icon: '✨',
					year: new Date().getFullYear().toString(),
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

				setTimeout(() => setSubmitted(false), 3000);
			} else {
				alert('שגיאה בשליחת הסיפור');
			}
		} catch (error) {
			setError('שגיאה בשליחת הסיפור. נסה שוב.');
		}
	};

	// toggleLike function
	const toggleLike = async id => {
		let isLiked;
		try {
			const isLiked = firebaseLikes[id];
			const newLikeValue = !isLiked;

			// עדכן את state תחילה (optimistic update)
			setFirebaseLikes(prev => ({
				...prev,
				[id]: newLikeValue,
			}));

			// עדכן ב-Firebase
			await setDoc(
				doc(db, 'community', 'likes'),
				{
					[id]: newLikeValue,
				},
				{ merge: true },
			);
		} catch (error) {
			setError('שגיאה בעדכון הלייק.');
			setFirebaseLikes(prev => ({
				...prev,
				[id]: isLiked,
			}));
		}
	};

	const approvedMiracles = communityMiracles.filter(m => m.approved);

	// stats - count true values in Firebase
	const stats = {
		total: approvedMiracles.length,
		submitted: communityMiracles.filter(m => !m.approved).length,
		totalLikes: Object.values(firebaseLikes).filter(Boolean).length,
	};

	return (
		<PageSection>
			<SEO
				title='קהילת הניסים'
				description='שתפו את סיפורי הניסים שלכם עם הקהילה. קראו סיפורי ניסים מרגשים של אנשים מכל הארץ.'
				keywords='קהילת ניסים, שיתוף סיפורים, סיפורי ניסים, עדויות אמונה'
				url='/community'
			/>
			{error && (
				<div
					style={{
						backgroundColor: '#fee2e2',
						color: '#dc2626',
						padding: '1rem',
						borderRadius: '0.5rem',
						marginBottom: '1rem',
						textAlign: 'center',
					}}
				>
					{error}
					<button
						onClick={() => setError(null)}
						style={{
							marginRight: '1rem',
							background: 'none',
							border: 'none',
							cursor: 'pointer',
							fontWeight: 'bold',
						}}
					>
						✕
					</button>
				</div>
			)}
			<PageHeader>
				<PageTitle>🎁 קהילת הניסים</PageTitle>
				<PageSubtitle>שתפו את הניסים שלכם עם העולם</PageSubtitle>
				<PageDescription>
					כאן כל אחד יכול לשתף את סיפור הנסים שלו. הניסים של אחרים הם השראה ומחזקים את כולנו.
				</PageDescription>
			</PageHeader>

			{/* Stats */}
			<StatsGrid>
				<StatCard>
					<StatValue>{stats.total}</StatValue>
					<StatLabel>סיפורים מפורסמים</StatLabel>
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

			{/* Filters */}
			<FilterSection>
				<FilterInput
					type='text'
					placeholder='חפש סיפורים...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					darkMode={darkMode}
				/>
				<FilterSelectInput value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} darkMode={darkMode}>
					{categoryOptions.map(cat => (
						<option key={cat} value={cat}>
							{cat === 'all' ? 'כל הקטגוריות' : cat}
						</option>
					))}
				</FilterSelectInput>
			</FilterSection>

			{/* Form and Stories */}
			<TwoColumnLayout>
				{/* Form Column */}
				<FormColumn>
					<FormTitle darkMode={darkMode}>שתף את הנסים שלך</FormTitle>

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
								אני מסכים ששיתוף זה יהיה פומבי לכל הקהילה
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

					{filteredMiracles.length > 0 ? (
						filteredMiracles.map(miracle => (
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
											{miracle.year}
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
												fill={firebaseLikes[miracle.id] ? '#ef4444' : 'none'}
												color={firebaseLikes[miracle.id] ? '#ef4444' : 'currentColor'}
											/>
										</IconButton>
										<Stat darkMode={darkMode}>{firebaseLikes[miracle.id] ? 1 : 0}</Stat>
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
							<p>אין סיפורים התואמים לחיפוש שלך</p>
						</EmptyState>
					)}
				</StoriesColumn>
			</TwoColumnLayout>
		</PageSection>
	);
};

export default CommunityPage;
