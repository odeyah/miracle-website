import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Heart, ChevronDown } from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc, increment, getDocs, collection } from 'firebase/firestore';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonCard from '../components/SkeletonCard';
import ShareButtons from '../components/ShareButtons';
import BookmarkButton from '../components/BookmarkButton';

// Animation variants
const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4 },
	},
	exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const expandContent = {
	hidden: { opacity: 0, height: 0 },
	visible: {
		opacity: 1,
		height: 'auto',
		transition: { duration: 0.3 },
	},
	exit: {
		opacity: 0,
		height: 0,
		transition: { duration: 0.2 },
	},
};
// ==================== STYLED COMPONENTS ====================

const PageSection = styled.section`
	padding: 2rem 0;
`;

const PageTitle = styled.h1`
	font-size: 2.25rem;
	font-weight: 700;
	text-align: center;
	margin-bottom: 2rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
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
		border-color: #a855f7;
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}
`;

const SelectInput = styled.select`
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

const MiracleCard = styled.article`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 0.75rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	transition: all 0.3s ease;
	margin-bottom: 1.5rem;

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
	background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
	cursor: pointer;
	gap: 1rem;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		gap: 0.75rem;
		padding: 1rem;
	}

	@media (max-width: 480px) {
		align-items: flex-start;
		gap: 0.5rem;
	}
`;

const MiracleIcon = styled.span`
	font-size: 2.5rem;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	margin-left: 0;

	img {
		width: 2.5rem;
		height: 2.5rem;
		object-fit: contain;
	}
`;

const MiracleInfo = styled.div`
	flex: 1;
	margin-left: 2rem;
	min-width: 0;

	@media (max-width: 768px) {
		margin-left: 1rem;
	}

	@media (max-width: 480px) {
		margin-left: 0;
		width: 100%;
	}
`;

const MiracleYear = styled.span`
	display: inline-block;
	background-color: #a855f7;
	color: white;
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
`;

const MiracleTitle = styled.h2`
	font-size: 1.25rem;
	font-weight: 700;
	margin-bottom: 0.25rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
	word-break: break-word;
	overflow-wrap: break-word;

	@media (max-width: 768px) {
		font-size: 1.1rem;
	}

	@media (max-width: 480px) {
		font-size: 1rem;
	}
`;

const MiracleCategory = styled.span`
	display: inline-block;
	background-color: ${props => (props.darkMode ? '#374151' : '#e5e7eb')};
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
	padding: 0.25rem 0.75rem;
	border-radius: 0.375rem;
	font-size: 0.875rem;
	margin-right: 0.5rem;
`;

const MiracleStats = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		gap: 0.5rem;
		font-size: 0.75rem;
	}

	@media (max-width: 480px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
	}
`;

const Stat = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	font-size: 0.875rem;
`;

const IconGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	@media (max-width: 480px) {
		flex-direction: column;
		gap: 0.25rem;
	}
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
	max-height: ${props => (props.expanded ? '100%' : '0')};
	overflow: ${props => (props.expanded ? 'visible' : 'hidden')};
	transition: max-height 0.3s ease;
`;

const MiracleStory = styled.div`
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
	line-height: 1.6;
	text-align: center;
	max-width: 70%;
	margin: 0 auto;

	p {
		margin-bottom: 1rem;

		&:last-child {
			margin-bottom: 0;
		}
	}
`;

const EmptyState = styled.div`
	text-align: center;
	padding: 3rem 1rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
`;

const EmptyIcon = styled.div`
	font-size: 3rem;
	margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;
`;

const StatCard = styled.div`
	background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
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

const PsalmSection = styled.section`
	background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
	color: white;
	padding: 3rem 1rem;
	text-align: center;
	border-radius: 1rem;
	margin-top: 3rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const PsalmTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 1rem;
	opacity: 0.95;
`;

const PsalmText = styled.p`
	font-size: 1.125rem;
	line-height: 1.8;
	opacity: 0.9;
	max-width: 600px;
	margin: 0 auto;
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

const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = React.useState(value);

	React.useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
};

// ==================== MAIN COMPONENT ====================

const MyMiraclesPage = ({ darkMode }) => {
	const [expandedMiracle, setExpandedMiracle] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [sortBy, setSortBy] = useState('date');
	const [favorites, setFavorites] = useLocalStorage('my-miracles-favorites', []);
	const [firebaseViews, setFirebaseViews] = useState({});
	const [firebaseLikes, setFirebaseLikes] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [bookmarks, setBookmarks] = useLocalStorage('my-miracles-bookmarks', []);
	const debouncedSearch = useDebounce(searchQuery, 300);

	// טעון נתונים מ-Firebase בעת טעינה
	useEffect(() => {
		let isMounted = true;
		const loadFirebaseData = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'miracles'));
				const viewsData = {};
				const likesData = {};
				querySnapshot.forEach(doc => {
					const data = doc.data();
					const id = parseInt(doc.id);
					viewsData[id] = data.views || 0;
					likesData[id] = data.likes || 0;
				});
				if (isMounted) {
					setFirebaseViews(viewsData);
					setFirebaseLikes(likesData);
				}
			} catch (error) {
				if (isMounted) {
					setError('שגיאה בטעינת הנתונים. נסה לרענן את הדף.');
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};
		loadFirebaseData();
		return () => {
			isMounted = false;
		};
	});

	// Your miracles data
	const myMiracles = useMemo(
		() => [
			{
				id: 1,
				year: new Date(new Date().setMonth(new Date().getMonth() + 6)).getFullYear().toString(),
				title: 'הנס העתידי שאני ומרגלית מחכים לו כל יום',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>בעזרת השם אני ומרגלית מחכים לנס הגדול שלנו כל יום.</p>
						<p style={{ marginBottom: '0.5rem' }}>
							אני מתפלל שנזכה לבנים ובנות צדיקים וצדיקות, ונזכה לשמוח במשפחה מלאה ובריאה.
						</p>
					</>
				),
				category: 'משפחה',
				icon: '👨‍👩‍👦',
				favorite: false,
			},
			{
				id: 2,
				year: new Date().getFullYear().toString(),
				title: 'הנס העתידי שכולנו מחכים לו כל יום',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>כולנו מצפים לנס הגדול של התקופה שלנו בכל יום.</p>
						<p style={{ marginBottom: '0.5rem' }}>
							אני מתפלל שיבנה בית המקדש במהרה בימינו אמן🙏, ונזכה לראות את הגאולה מתממשת לעיני כולנו.
						</p>
					</>
				),
				category: 'גאולה',
				icon: './Solvation.ico',
				favorite: false,
			},
			{
				id: 3,
				year: '2018',
				title: 'מפציע שחר',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>
							בתוך חשכת הבדידות המתמשכת היה לנו נס גדול במיוחד. הכרנו משפחה מארחת מירושלים
							משפחת סילבר שאימצו אותנו לכל החגים באופן פלאי.</p>
						<p style={{ marginBottom: '0.5rem' }}>כאם חד הורית שמתמודדת בכל-כך הרבה מישורים	זו הייתה הארה ענקית ועל טבעית</p>
						<p style={{ marginBottom: '0.5rem' }}>הארוח היה ברמה גבוהה ובמאור פנים והרגשנו נהדר.</p>
						<p style={{ marginBottom: '0.5rem' }}>באחת הפעמים שיתפתי את יעל המארחת בקשיים היומיומיים שאני עוברת והיא המליצה לי על בת שבע מאמנת בשיטת שער הביטחון</p>
						<p style={{ marginBottom: '0.5rem' }}>במפגש הראשון באתי שבורה והיא שאלה אותי על מה את יכולה להגיד תודה בחיים שלך?</p>
						<p style={{ marginBottom: '0.5rem' }}>לא הצלחתי למצוא שום דבר להודות עליו. היו לי קשיים בפרנסה, בדידות, קשיים בגידול ילדים לבד בלי שום תמיכה.</p>
						<p style={{ marginBottom: '0.5rem' }}>לאחר שהתעקשה ובת שבע מיאנה לוותר לי אמרתי בשפה רפה שאולי על הילדים.</p>
					</>
				),
				category: 'משפחה',
				icon: 'multi',
				favorite: false,
			},
			{
				id: 4,
				year: '2008',
				title: 'שנים של בדידות חשוכה',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>מצאתי את עצמי עם 2 ילדים קטנים לבד ובלי משפחה תומכת.</p>
						<p style={{ marginBottom: '0.5rem' }}>ניסיון מאוד קשה ובכלל לא פשוט, בדידות שמכרסמת ואוכלת את כל הגוף לאט אבל בטוח.</p>
						<p style={{ marginBottom: '0.5rem' }}>גם בתוך החושך הזה ה' אף פעם לא עזב אותי והיה מקור לכל הכוחות כולם.</p>
						<p style={{ marginBottom: '0.5rem' }}>הוא עטף אותי במעטפת אלוקית של אנשים תומכים:</p>
						<p style={{ marginBottom: '0.5rem' }}>הרבנית שלי רבקה לוויסון שדאגה להתקשר כמעט כל יום ואילולא היא לא ידעתי חינוך מהו.</p>
						<p style={{ marginBottom: '0.5rem' }}>משפחות מארחות שהכרנו שהזמינו אותנו לשבתות לפעמים וזה נתן לנו המון שמחה ותקווה</p>
					</>
				),
				category: 'משפחה',
				icon: '👥',
				favorite: false,
			},
			{
				id: 5,
				year: '2003',
				title: 'השידוך הראשון',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>בסמינר שידכו לי בחור שלא התאים לי.</p>
						<p style={{ marginBottom: '0.5rem' }}>ונאלצתי ברבות השנים להביא לסיום הנישואים עם 2 ילדים קטנים ומתוקים.</p>
					</>
				),
				category: 'משפחה',
				icon: '💑',
				favorite: false,
			},
			{
				id: 6,
				year: '1999-2003',
				title: 'התיכון והסמינר',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>בשנות התיכון והסמינר, ה' זיכה אותי להכיר משפחות טובות, בריאות וזה היה לי מגדלור לאן לשאוף.</p>
						<p style={{ marginBottom: '0.5rem' }}>ומזה למדתי שיש דרך אחרת לחיות בה. בסמינר זכיתי לעטיפה מוחלטת של חממה תומכת ואוהבת מכל הבחינות.</p>
						<p style={{ marginBottom: '0.5rem' }}>עד היום אני מרגישה שהנפש שלי טעונה בעומקים של תורה ויראת שמיים.</p>
						<p style={{ marginBottom: '0.5rem' }}>בזכות הסמינר זכיתי לפגוש משפחות חמות ובריאות, רבניות תומכות ממש "גן עדן" בחוויה של אותם ימים.</p>
					</>
				),
				category: 'הילדות שלי',
				icon: '📚',
				favorite: false,
			},
			{
				id: 7,
				year: '1994',
				title: 'אורות באפלה',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>בתחילת גיל הנערות ה' זימן לי את המורה טובה שכשמה כן היא.</p>
						<p style={{ marginBottom: '0.5rem' }}>
							היא מאוד אהבה אותי ונתנה לי המון עידוד ומחמאות שלא קיבלתי עד אז
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							השנה הזאת בחטיבה נתנה לי המון כוחות. שמרתי על קשר עם טובה למשך כמה שנים ולאחרונה חידשתי את הקשר.
						</p>
					</>
				),
				category: 'השגחה',
				icon: '👶',
				favorite: false,
			},
			{
				id: 8,
				year: '1981',
				title: 'הילדות שלי',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>גדלתי בבית עם משפחה חולה וסבלתי התעללויות רבות ובנס עצום יצאתי משם שפוייה ומתפקדת.</p>
						<p style={{ marginBottom: '0.5rem' }}>בתוך כל החושך תמיד ה' היה איתי וליווה אותי וכשהתפללתי והתחננתי אליו ממש הרגשתי שהוא נותן לי כוח בתוך הניסיון.</p>		
					</>
				),
				category: 'הילדות שלי',
				icon: '📚',
				favorite: false,
			},
		],
		[],
	);

	// עדכון צפיות כשמרחיבים נס
	const handleExpandMiracle = async miracleId => {
		setExpandedMiracle(expandedMiracle === miracleId ? null : miracleId);

		if (expandedMiracle !== miracleId) {
			try {
				await updateDoc(doc(db, 'miracles', miracleId.toString()), {
					views: increment(1),
				});

				setFirebaseViews(prev => ({
					...prev,
					[miracleId]: (prev[miracleId] || 0) + 1,
				}));
			} catch (error) {
				setError('שגיאה בעדכון הצפיות.');
			}
		}
	};

	// Filter and search miracles
	const filteredMiracles = useMemo(() => {
		return myMiracles.filter(miracle => {
			const matchesSearch = debouncedSearch === '' || miracle.title.toLowerCase().includes(debouncedSearch.toLowerCase());
			const matchesCategory = selectedCategory === 'all' || miracle.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [myMiracles, debouncedSearch, selectedCategory]);

	// Sort miracles
	const sortedMiracles = useMemo(() => {
		const sorted = [...filteredMiracles];
		if (sortBy === 'date') sorted.reverse();
		else if (sortBy === 'views') sorted.sort((a, b) => (firebaseViews[b.id] || 0) - (firebaseViews[a.id] || 0));
		return sorted;
	}, [filteredMiracles, sortBy, firebaseViews]);

	// Toggle favorite
	const toggleFavorite = async id => {
		const isFavorited = favorites.includes(id);

		// עדכן localStorage מיד
		setFavorites(prev => {
			const newFavs = isFavorited ? prev.filter(f => f !== id) : [...prev, id];
			return newFavs;
		});

		// עדכן state מיד (optimistic update)
		const incrementValue = isFavorited ? -1 : 1;

		setFirebaseLikes(prev => ({
			...prev,
			[id]: (prev[id] || 0) + incrementValue,
		}));

		try {
			await updateDoc(doc(db, 'miracles', id.toString()), {
				likes: increment(incrementValue),
			});
		} catch (error) {
			setError('שגיאה בעדכון הלייק.');
			// השאר את ה-rollback שכבר קיים
			setFirebaseLikes(prev => ({
				...prev,
				[id]: (prev[id] || 0) - incrementValue,
			}));
		}
	};
	const toggleBookmark = id => {
		setBookmarks(prev => (prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]));
	};
	// Get unique categories
	const categoryOptions = ['all', ...new Set(myMiracles.map(m => m.category))];

	// Calculate stats
	const stats = useMemo(() => {
		const totalViews = Object.values(firebaseViews).reduce((a, b) => a + b, 0);
		const totalLikes = Object.values(firebaseLikes).reduce((a, b) => a + b, 0);
		return {
			total: myMiracles.length,
			totalFavorites: totalLikes,
			totalViews: totalViews,
		};
	}, [firebaseViews, firebaseLikes, myMiracles]);

	return (
		<PageSection>
			<SEO
				title='הניסים של מרגלית'
				description='סיפורי הניסים האישיים של אשתי מרגלית - מהלידה ועד היום. סיפורים של אמונה, תקווה והשגחה פרטית.'
				keywords='ניסים אישיים, סיפורי ניסים, אשתי מרגלית, השגחה פרטית, אמונה, ישועה'
				url='/my-miracles'
				type='article'
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
			<PageTitle darkMode={darkMode}>הניסים של מרגלית טל אבלס</PageTitle>
			{/* Stats */}
			<StatsGrid>
				<StatCard darkMode={darkMode}>
					<StatValue color='#22c55e'>{stats.total}</StatValue>
					<StatLabel darkMode={darkMode}>סה"כ ניסים</StatLabel>
				</StatCard>
				<StatCard darkMode={darkMode}>
					<StatValue color='#ec4899'>{stats.totalFavorites}</StatValue>
					<StatLabel darkMode={darkMode}>לבבות</StatLabel>
				</StatCard>
				<StatCard darkMode={darkMode}>
					<StatValue color='#3b82f6'>{stats.totalViews}</StatValue>
					<StatLabel darkMode={darkMode}>סה"כ צפיות</StatLabel>
				</StatCard>
			</StatsGrid>
			{/* Filters */}
			<FilterSection>
				<FilterInput
					type='text'
					placeholder='חפש ניסים...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					darkMode={darkMode}
					aria-label='חיפוש ניסים'
				/>
				<SelectInput
					value={selectedCategory}
					onChange={e => setSelectedCategory(e.target.value)}
					darkMode={darkMode}
					aria-label='סינון לפי קטגוריה'
				>
					{categoryOptions.map(cat => (
						<option key={cat} value={cat}>
							{cat === 'all' ? 'כל הקטגוריות' : cat}
						</option>
					))}
				</SelectInput>
				<SelectInput value={sortBy} onChange={e => setSortBy(e.target.value)} darkMode={darkMode} aria-label='מיון תוצאות'>
					<option value='date'>מהחדש ביותר</option>
					<option value='views'>לפי צפיות</option>
				</SelectInput>
			</FilterSection>
			{/* Miracles List */}
			{loading ? (
				<>
					<SkeletonCard darkMode={darkMode} />
					<SkeletonCard darkMode={darkMode} />
					<SkeletonCard darkMode={darkMode} />
				</>
			) : sortedMiracles.length > 0 ? (
				<motion.div initial='hidden' animate='visible' variants={staggerContainer}>
					{sortedMiracles.map(miracle => (
						<motion.div key={miracle.id} variants={cardVariants}>
							<MiracleCard as={motion.div} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} darkMode={darkMode}>
								<MiracleCardHeader
									onClick={() => handleExpandMiracle(miracle.id)}
									aria-expanded={expandedMiracle === miracle.id}
									role='button'
									tabIndex={0}
									onKeyDown={e => e.key === 'Enter' && handleExpandMiracle(miracle.id)}
								>
									<MiracleIcon>
										{miracle.icon === 'multi' ? (
											<IconGroup>
												<span role='img' aria-label='זוג'>
													💑
												</span>
												<span role='img' aria-label='לב'>
													💖
												</span>
											</IconGroup>
										) : miracle.icon.endsWith('.ico') || miracle.icon.endsWith('.png') || miracle.icon.endsWith('.jpg') ? (
											<img src={miracle.icon} alt={miracle.title} />
										) : (
											<span role='img' aria-label={miracle.category}>
												{miracle.icon}
											</span>
										)}
									</MiracleIcon>
									<MiracleInfo>
										<div>
											<MiracleYear>{miracle.year}</MiracleYear>
										</div>
										<MiracleTitle darkMode={darkMode}>{miracle.title}</MiracleTitle>
										<div style={{ marginTop: '0.25rem' }}>
											<MiracleCategory darkMode={darkMode}>{miracle.category}</MiracleCategory>
										</div>
									</MiracleInfo>
									<MiracleStats>
										<div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
											<IconButton
												darkMode={darkMode}
												onClick={e => {
													e.stopPropagation();
													toggleFavorite(miracle.id);
												}}
												aria-label={favorites.includes(miracle.id) ? 'הסר מהמועדפים' : 'הוסף למועדפים'}
											>
												<Heart
													size={20}
													fill={favorites.includes(miracle.id) ? '#ec4899' : 'none'}
													color={favorites.includes(miracle.id) ? '#ec4899' : 'currentColor'}
												/>
												<BookmarkButton
													isBookmarked={bookmarks.includes(miracle.id)}
													onClick={e => {
														e.stopPropagation();
														toggleBookmark(miracle.id);
													}}
													darkMode={darkMode}
												/>
											</IconButton>
											<Stat darkMode={darkMode}>{firebaseLikes[miracle.id] || 0}</Stat>
										</div>
									</MiracleStats>
									<ChevronIcon
										size={24}
										expanded={expandedMiracle === miracle.id}
										style={{
											marginLeft: '1rem',
											color: darkMode ? '#e5e7eb' : '#374151',
										}}
										aria-hidden='true'
									/>
								</MiracleCardHeader>
								<AnimatePresence>
									{expandedMiracle === miracle.id && (
										<motion.div initial='hidden' animate='visible' exit='exit' variants={expandContent}>
											<MiracleContent expanded={true}>
												<MiracleStory darkMode={darkMode}>{miracle.story}</MiracleStory>
												<ShareButtons
													title={miracle.title}
													url={`${window.location.origin}/my-miracles#${miracle.id}`}
													darkMode={darkMode}
												/>
											</MiracleContent>
										</motion.div>
									)}
								</AnimatePresence>
							</MiracleCard>
						</motion.div>
					))}
				</motion.div>
			) : (
				<EmptyState darkMode={darkMode}>
					<EmptyIcon role='img' aria-label='חיפוש'>
						🔍
					</EmptyIcon>
					<p>לא נמצאו ניסים התואמים לחיפוש שלך</p>
				</EmptyState>
			)}
			,{/* Psalm Section */}
			<PsalmSection>
				<PsalmTitle>🙏 מזמור לתודה - מזמור ק בתהילים</PsalmTitle>
				<PsalmText>
					מִזְמ֥וֹר לְתוֹדָ֑ה הָרִ֥יעוּ לַ֝יהֹוָ֗ה כׇּל־הָאָֽרֶץ׃ עִבְד֣וּ אֶת־יְהֹוָ֣ה בְּשִׂמְחָ֑ה בֹּ֥אוּ לְ֝פָנָ֗יו
					בִּרְנָנָֽה׃ דְּע֗וּ כִּֽי־יְהֹוָה֮ ה֤וּא אֱלֹ֫הִ֥ים הֽוּא־עָ֭שָׂנוּ (ולא) [וְל֣וֹ] אֲנַ֑חְנוּ עַ֝מּ֗וֹ וְצֹ֣אן
					מַרְעִיתֽוֹ׃ בֹּ֤אוּ שְׁעָרָ֨יו בְּתוֹדָ֗ה חֲצֵרֹתָ֥יו בִּתְהִלָּ֑ה הוֹדוּ־ל֝֗וֹ בָּרְכ֥וּ שְׁמֽוֹ׃ כִּי־ט֣וֹב
					יְ֭הֹוָה לְעוֹלָ֣ם חַסְדּ֑וֹ וְעַד־דֹּ֥ר וָ֝דֹ֗ר אֱמוּנָתֽוֹ׃
				</PsalmText>
			</PsalmSection>
		</PageSection>
	);
};

export default MyMiraclesPage;
