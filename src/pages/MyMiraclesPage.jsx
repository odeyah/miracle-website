import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Heart, Star, Users, ChevronDown } from 'lucide-react';

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

const MiracleCard = styled.div`
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
`;

const MiracleIcon = styled.span`
	font-size: 2.5rem;
	margin-right: 1rem;
	display: flex;
	align-items: center;

	img {
		width: 2.5rem;
		height: 2.5rem;
		object-fit: contain;
	}
`;

const MiracleInfo = styled.div`
	flex: 1;
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

const MiracleTitle = styled.h3`
	font-size: 1.25rem;
	font-weight: 700;
	margin-bottom: 0.25rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
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
	gap: 1.5rem;
	align-items: center;
	justify-content: flex-end;
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
		color: #ec4899;
	}
`;

const MiracleContent = styled.div`
	padding: 1.5rem;
	max-height: ${props => (props.expanded ? '100%' : '0')};
	overflow: ${props => (props.expanded ? 'visible' : 'hidden')};
	transition: max-height 0.3s ease;
`;

const MiracleStory = styled.div`
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
	line-height: 1.6;

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
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 0.75rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	padding: 1.5rem;
	text-align: center;
`;

const StatValue = styled.div`
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	color: ${props => props.color || '#a855f7'};
`;

const StatLabel = styled.div`
	font-size: 0.875rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
`;

const ChevronIcon = styled(ChevronDown)`
	transition: transform 0.3s ease;
	transform: ${props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
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

	const debouncedSearch = useDebounce(searchQuery, 300);

	// Your miracles data
	const myMiracles = useMemo(
		() => [
			{
				id: 1,
				year: '2026',
				title: 'הנס העתידי שאני ומרגלית מחכים לו כל יום',
				story: 'בעזרת השם אני ומרגלית נזכה לזרע בר קיימא בנים ובנות.',
				category: 'משפחה',
				icon: '👨‍👩‍👦',
				impact: 6,
				views: 145,
				favorite: false,
			},
			{
				id: 1,
				year: '2025',
				title: 'הנס העתידי שכולנו מחכים לו כל יום',
				story: 'שיבנה בית המקדש במהרה בימיינו אמן',
				category: 'גאולה',
				icon: '/Solvation.ico',
				impact: 10,
				views: 145,
				favorite: false,
			},
			{
				id: 2,
				year: '2021',
				title: 'השידוך השני והמוצלח',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>
							'ואז כעבור 6 שנות גירושים ותוך שהייתי באימון לנישואין ממש קצת אחרי הנס הרפואי שלי',
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							'התחלתי לצאת לעולם הדייטים שוב וברוך השם מהר מאוד השם שלח לי את החצי שלי את האישה הטובה והמושלמת ביותר בשבילי',
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							'וברוך השם הוא סידר לנו את כל מה שהיינו צריכים וכעזור 3.5 חודשים עמדנו מתחת לחופה',
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							'ועד היום אני מודה לקבה כל בוקר וכל יום על כל החסדים והטוב שהוא עשה איתי'
						</p>
					</>
				),
				category: 'משפחה',
				icon: '💑💖',
				impact: 9,
				views: 512,
				favorite: true,
			},
			{
				id: 3,
				year: '2020',
				title: 'הישועה הרפואית שלי',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>
							'כשהייתי גרוש תוך כדי אימון לזוגיות גם עשיתי טיפולי פוריות כי אין לי זרע בצורה טבעית ולמרות שכשהייתי נשוי הייתי
							בטיפולים אבל הם לא התקדמו ורק הלכנו מסביב ללכת לניתוח שאמרו לי שאין לו סיכויים גבוהים אמרו לי שהסיכוי הוא פחות
							מ2% מה שהיה מייאש אותי מאוד וגורם לי להפסיק את הטיפול וזה אחת הסיבות שהטיפולים לא עבדו',
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							'אבל אז עברתי לטיפול אצל פרופסור טליה גבע והיא התחילה את הטיפול במינונים גבוהים יותר ובעקבות זה גם התוצאות היו
							יותר קרובים לנורמה אבל עדיין לא היה זרע ושוב דיברו איתי על ניתוח וגם פה אמרו שאין הרבה סיכוי.',
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							'ואז בזכות עצה חכמה מהמאמן שלי הלכתי לשמוע דעה שניה אצל פרופסור מומחה נוסף בתחום שהציע שבגלל הבעיה הרפואית שלי
							כדאי להוסיף עוד זריקה של הורמון נוסף שלפעמים נשים מקבלות בטיפולים ובגלל שהגוף שלי לא מייצר את ההורמון הזה אולי
							כדאי לי לקחת גם את זה ואחרי ששאלתי את פרופסור טליה גבע שהדהימה אותי באיך שהיא קיבלה בשמחה את זה שהלכתי לגעה
							שניה ומיד אמרה שהיא לא יודעת למה היא לא חשבה על זה ואז כעבור כשבועיים התחלתי לקחת את הזריקה הזאת על בסיס יומי'
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							'וכעבור חצי שנה של לקיחת כל הטיפול יחד עם התרופה החדשה הגוף שלי התחיל לייצר זרע כך שאפילו ניתוח לא הייתי צריך',{' '}
						</p>
						<p style={{ marginBottom: '0.5rem' }}>'הודו לה' כי טוב'</p>
					</>
				),
				category: 'רפואה',
				icon: '🏥',
				impact: 9,
				views: 512,
				favorite: true,
			},
			{
				id: 4,
				year: '2015',
				title: 'הגירושים שלי',
				story: (
					<p style={{ marginBottom: '0.5rem' }}>
						'כעבור 9 שנים של נישואין, גרושתי בחרה לפרק את החבילה ולמרות שמאוד ניסיתי לבנות ולשמר הדברים לא הסתדרו והתגרשנו.
						כשזה קרה הייתי בטוח שזה סוף החיים שלי שאני לא אתחתן יותר בחיים ואגמור את החיים שלי לבד. ברוך השם היום אני במקום
						הרבה יותר טוב.',
					</p>
				),
				category: 'משפחה',
				icon: '👥',
				impact: 8,
				views: 267,
				favorite: false,
			},
			{
				id: 5,
				year: '2006',
				title: 'השידוך הראשון',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>
							'ממש לפני תום השירות הצבאי שלי התחתנתי ב"ה בלי לחפש יותר מדי ואז גילינו יחד שזה לא יהיה כזה קל להביא ילדים
							לעולם והתחלנו טיפולים.'
						</p>
						<p style={{ marginBottom: '0.5rem' }}>'אחרי 9 שנים התגרשנו בלי ילדים באותו זמן הייתי בטוח שזה דבר נוראי'</p>
						<p style={{ marginBottom: '0.5rem' }}>'אבל היום אני מודה לה' גם על זה'</p>
					</>
				),
				category: 'משפחה',
				icon: '💑',
				impact: 10,
				views: 456,
				favorite: true,
			},
			{
				id: 6,
				year: '1983-2002',
				title: 'הילדות שלי',
				story: (
					<p style={{ marginBottom: '0.5rem' }}>
						הילדות שלי הייתה דיי רגילה למעט שכל הזמן לקחתי תרופות וכילד קטן ממש הייתי הולך לבית חולים הרבה עד שאמא שלי התנדבה
						להביא לי את הזריקות שקיבלתי ולכן זה ירד לכל 3 חודשים אבל לא הרגשתי שונה וגדלתי כילד רגיל עם המון חברים והייתי ילד
						שמח
					</p>
				),
				category: 'הילדות שלי',
				icon: '📚',
				impact: 7,
				views: 189,
				favorite: false,
			},
			{
				id: 7,
				year: '1983',
				title: 'נס הלידה שלי',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>
							אני נולדתי עם תסמונת נדירה של חוסר בהורמונים בלי שידעו את זה מראש ולמרות שנולדתי בפסח וגרנו בגבעת מרדכי אמא שלי
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							ילדה אותי בהדסה עין כרם(ראה נס קודם) ולמזלי הגדול נולדתי באיחור של שבועיים והרופאים לא העריכו נכון את המשקל שלי
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							אז נתנו לי להישאר ולא יילדו אותי מוקדם יותר. כשבוע לפני שנולדתי פרופסור הדי לנדאו אינדוקרינולוגית מומחית בכל
							מיני
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							תסמונת נדירות כולל התסמונת שלי העביר הרצאה למיילדות על איך לזהות תסמונות נדירות בתינוקייה. ולמזלי הגדול אחת
							מצוות
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							המיילדות שהייתה בשיחה הייתה גם בתינוקייה באותם ימים וזיהתה את זה ממש מהר וכבר בגיל יומיים פרופסור הדי לנדאו
							ראתה
						</p>
						<p style={{ marginBottom: '0.5rem' }}>אותי ואובחנתי וישר קיבלתי טיפול תרופתי מציל חיים</p>
					</>
				),
				category: 'רפואה',
				icon: '👶',
				impact: 10,
				views: 298,
				favorite: true,
			},
			{
				id: 8,
				year: '1980',
				title: 'הנס הראשון שלי(עוד לפני שנולדתי)',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>הנס של החייים שלי בכלל מתחיל 3.5 שנים לפני שנולדתי</p>
						<p style={{ marginBottom: '0.5rem' }}>אמא שלי הייתה באותו זמן בהריון השני שלה עם אחותי הגדולה.</p>
						<p style={{ marginBottom: '0.5rem' }}>
							אמא שלי ילדה את אחי הבכור בבית החולים הדסה עין כרם ובאותה תקופה הם גרו בגבעת מרדכי.
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							אמא שלי הלכה להירשם ללידה גם בהדסה עין כרם וגם בשערי צדק למקרה שהלידה תהיה סמוכה לשבת או בשבת.
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							כשאמא שלי הגיעה להירשם בשערי צדק הפקידה שאלה אותה "אני רואה שאת הקודם ילדת בעין כרם למה עכשיו את מגיעה לפה?"
						</p>
						<p style={{ marginBottom: '0.5rem' }}>ואמא שלי כעסה על השאלה ועזבה בלי להירשם.</p>
						<p style={{ marginBottom: '0.5rem' }}>
							כעבור כ3 שנים אמא שלי אפילו לא חשבה להירשם בשערי צדק והלכה ישר להדסה עין כרם.
						</p>
						<p style={{ marginBottom: '0.5rem' }}>
							יצא שנולדתי בפסח ממש בחול המועד ואם שערי צדק היו מקבלים את אמא שלי בשמחה כנראה שהיא הייתה יולדת אותי שם.
						</p>
						<p style={{ marginBottom: '0.5rem' }}>ואם תמשיכו לחלק הבא תבינו למה זה לא טוב לי</p>
					</>
				),
				category: 'התנהגות מוזרה',
				icon: '🤰',
				impact: 10,
				views: 342,
				favorite: false,
			},
		],
		[],
	);

	// Filter and search miracles
	const filteredMiracles = useMemo(() => {
		return myMiracles.filter(miracle => {
			const matchesSearch =
				debouncedSearch === '' ||
				miracle.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
				(typeof miracle.story === 'string' && miracle.story.toLowerCase().includes(debouncedSearch.toLowerCase()));
			const matchesCategory = selectedCategory === 'all' || miracle.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [myMiracles, debouncedSearch, selectedCategory]);

	// Sort miracles
	const sortedMiracles = useMemo(() => {
		const sorted = [...filteredMiracles];
		if (sortBy === 'date') sorted.reverse();
		else if (sortBy === 'impact') sorted.sort((a, b) => b.impact - a.impact);
		else if (sortBy === 'views') sorted.sort((a, b) => b.views - a.views);
		return sorted;
	}, [filteredMiracles, sortBy]);

	// Toggle favorite
	const toggleFavorite = id => {
		setFavorites(favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id]);
	};

	// Get unique categories
	const categoryOptions = ['all', ...new Set(myMiracles.map(m => m.category))];

	// Calculate stats
	const stats = useMemo(() => {
		return {
			total: myMiracles.length,
			avgImpact: (myMiracles.reduce((sum, m) => sum + m.impact, 0) / myMiracles.length).toFixed(1),
			totalFavorites: favorites.length,
			totalViews: myMiracles.reduce((sum, m) => sum + m.views, 0),
		};
	}, [myMiracles, favorites]);

	return (
		<PageSection>
			<PageTitle darkMode={darkMode}>הניסים שלי - אודה-י-ה</PageTitle>

			{/* Stats */}
			<StatsGrid>
				<StatCard darkMode={darkMode}>
					<StatValue color='#22c55e'>{stats.total}</StatValue>
					<StatLabel darkMode={darkMode}>סה"כ ניסים</StatLabel>
				</StatCard>
				<StatCard darkMode={darkMode}>
					<StatValue color='#eab308'>{stats.avgImpact}</StatValue>
					<StatLabel darkMode={darkMode}>ממוצע השפעה</StatLabel>
				</StatCard>
				<StatCard darkMode={darkMode}>
					<StatValue color='#ec4899'>{stats.totalFavorites}</StatValue>
					<StatLabel darkMode={darkMode}>מועדפים</StatLabel>
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
				/>
				<SelectInput value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} darkMode={darkMode}>
					{categoryOptions.map(cat => (
						<option key={cat} value={cat}>
							{cat === 'all' ? 'כל הקטגוריות' : cat}
						</option>
					))}
				</SelectInput>
				<SelectInput value={sortBy} onChange={e => setSortBy(e.target.value)} darkMode={darkMode}>
					<option value='date'>מהחדש ביותר</option>
					<option value='impact'>לפי השפעה</option>
					<option value='views'>לפי צפיות</option>
				</SelectInput>
			</FilterSection>

			{/* Miracles List */}
			{sortedMiracles.length > 0 ? (
				sortedMiracles.map(miracle => (
					<MiracleCard key={miracle.id} darkMode={darkMode}>
						<MiracleCardHeader onClick={() => setExpandedMiracle(expandedMiracle === miracle.id ? null : miracle.id)}>
							<MiracleIcon>
								{miracle.icon.endsWith('.ico') || miracle.icon.endsWith('.png') || miracle.icon.endsWith('.jpg') ? (
									<img src={miracle.icon} alt='icon' />
								) : (
									miracle.icon
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
								<Stat darkMode={darkMode}>
									<Star size={16} />
									{miracle.impact}
								</Stat>
								<Stat darkMode={darkMode}>
									<Users size={16} />
									{miracle.views}
								</Stat>
								<IconButton
									darkMode={darkMode}
									onClick={e => {
										e.stopPropagation();
										toggleFavorite(miracle.id);
									}}
								>
									<Heart
										size={20}
										fill={favorites.includes(miracle.id) ? '#ec4899' : 'none'}
										color={favorites.includes(miracle.id) ? '#ec4899' : 'currentColor'}
									/>
								</IconButton>
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
						<MiracleContent expanded={expandedMiracle === miracle.id}>
							<MiracleStory darkMode={darkMode}>{miracle.story}</MiracleStory>
						</MiracleContent>
					</MiracleCard>
				))
			) : (
				<EmptyState darkMode={darkMode}>
					<EmptyIcon>🔍</EmptyIcon>
					<p>לא נמצאו ניסים התואמים לחיפוש שלך</p>
				</EmptyState>
			)}
		</PageSection>
	);
};

export default MyMiraclesPage;
