import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
	Heart,
	Star,
	Calendar,
	ChevronDown,
	Users,
	Mail,
	Phone,
	Sparkles,
	MapPin,
	Moon,
	Sun,
	TrendingUp,
	X,
	Menu,
} from 'lucide-react';
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Styled Components
const AppContainer = styled.div`
	min-height: 100vh;
	background-color: ${props => (props.darkMode ? '#111827' : '#ffffff')};
	color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
	transition: background-color 0.3s ease, color 0.3s ease;
	direction: rtl;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
		'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const Navbar = styled.nav`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-bottom: 1px solid ${props => (props.darkMode ? '#374151' : '#e5e7eb')};
	padding: 1rem 1.5rem;
	position: sticky;
	top: 0;
	z-index: 50;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const NavBrand = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
	background: linear-gradient(to right, #a855f7, #ec4899);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const NavMenu = styled.div`
	display: ${props => (props.mobileMenuOpen ? 'flex' : 'none')};
	@media (min-width: 768px) {
		display: flex;
	}
	flex-direction: column;
	@media (min-width: 768px) {
		flex-direction: row;
	}
	gap: 1rem;
	align-items: center;
	position: absolute;
	@media (min-width: 768px) {
		position: static;
	}
	top: 100%;
	right: 0;
	left: 0;
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	@media (min-width: 768px) {
		background-color: transparent;
	}
	padding: ${props => (props.mobileMenuOpen ? '1rem' : '0')};
	@media (min-width: 768px) {
		padding: 0;
	}
`;

const NavButton = styled.button`
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	border: none;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.3s ease;
	background-color: transparent;
	color: ${props => (props.active ? '#a855f7' : props.darkMode ? '#e5e7eb' : '#374151')};
	border-bottom: ${props => (props.active ? '2px solid #a855f7' : 'none')};

	&:hover {
		color: #a855f7;
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
		color: #a855f7;
	}
`;

const MobileMenuButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props => (props.darkMode ? '#e5e7eb' : '#374151')};

	@media (min-width: 768px) {
		display: none;
	}
`;

const HeroSection = styled.section`
	background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
	padding: 6rem 1rem;
	text-align: center;
	color: white;
`;

const HeroContent = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

const HeroTitle = styled.h1`
	font-size: 3.5rem;
	font-weight: 700;
	margin-bottom: 1rem;
	line-height: 1.1;

	@media (max-width: 768px) {
		font-size: 2.25rem;
	}
`;

const HeroSubtitle = styled.p`
	font-size: 1.25rem;
	margin-bottom: 2rem;
	opacity: 0.95;
`;

const HeroButtons = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
`;

const Button = styled.button`
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	border: none;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	background-color: ${props => (props.primary ? '#ffffff' : 'rgba(255, 255, 255, 0.2)')};
	color: ${props => (props.primary ? '#a855f7' : '#ffffff')};

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}
`;

const MainContent = styled.main`
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem 1rem;
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
`;

const Stat = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	font-size: 0.875rem;
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

const FilterSection = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
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

const ChartContainer = styled.div`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 0.75rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	padding: 1.5rem;
	margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
	font-size: 1.125rem;
	font-weight: 700;
	margin-bottom: 1rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const FormSection = styled.section`
	padding: 4rem 1rem;
`;

const FormContainer = styled.div`
	max-width: 900px;
	margin: 0 auto;
`;

const FormTitle = styled.h2`
	font-size: 2.25rem;
	font-weight: 700;
	text-align: center;
	margin-bottom: 3rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const FormBox = styled.div`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 0.75rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	padding: 2rem;
	margin-bottom: 2rem;
`;

const FormHeader = styled.div`
	text-align: center;
	margin-bottom: 1.5rem;
`;

const FormSubtitle = styled.h3`
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const FormDescription = styled.p`
	color: ${props => (props.darkMode ? '#d1d5db' : '#4b5563')};
`;

const FormGroup = styled.div`
	margin-bottom: 1rem;
`;

const FormGroupGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1rem;
	margin-bottom: 1rem;
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

	&::placeholder {
		color: ${props => (props.darkMode ? '#9ca3af' : '#9ca3af')};
	}

	&:focus {
		outline: none;
		border-color: #a855f7;
		box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
	}
`;

const FormHint = styled.p`
	font-size: 0.75rem;
	margin-top: 0.25rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
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
`;

const ContactBox = styled.div`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 0.75rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	padding: 1.5rem;
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

const Footer = styled.footer`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-top: 1px solid ${props => (props.darkMode ? '#374151' : '#e5e7eb')};
	padding: 2rem 1rem;
	text-align: center;
`;

const FooterContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const FooterQuote = styled.p`
	color: ${props => (props.darkMode ? '#9ca3af' : '#4b5563')};
	margin-bottom: 0.5rem;
`;

const FooterCopyright = styled.p`
	font-size: 0.875rem;
	color: ${props => (props.darkMode ? '#6b7280' : '#6b7280')};
`;

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

const LectureTitle = styled.h2`
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
	margin-bottom: 1rem;
`;

const LectureButton = styled.button`
	background: white;
	color: #a855f7;
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	width: 100%;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}
`;

const WifeSection = styled.section`
	padding: 4rem 1rem;
`;

const SectionTitle = styled.h2`
	font-size: 2.25rem;
	font-weight: 700;
	text-align: center;
	margin-bottom: 2rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

// Custom Hooks
const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
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
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
};

const MyAdvancedMiracleWebsite = () => {
	const [activePage, setActivePage] = useState('home');
	const [expandedMiracle, setExpandedMiracle] = useState(null);
	const [darkMode, setDarkMode] = useState(false);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [sortBy, setSortBy] = useState('date');

	// Use custom hook for favorites
	const [favorites, setFavorites] = useLocalStorage('favorites', []);

	// Debounced search
	const debouncedSearch = useDebounce(searchQuery, 300);

	// My miracles data with enhanced properties
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

	// Wife's miracles data
	const wifesMiracles = useMemo(
		() => [
			{
				id: 1,
				year: '2024',
				title: 'הנס הגדול של הלידה',
				story: 'אחרי שנים רבות של ציפיה ותפילה, קיבלנו את הבחורה היפה שלנו.',
				category: 'משפחה',
				icon: '👶',
				impact: 10,
				views: 234,
				favorite: true,
			},
			{
				id: 2,
				year: '2023',
				title: 'ריפוי מיוחד',
				story: "חוויה רפואית קשה שהתגברנו עליה בעזרת ה'.",
				category: 'רפואה',
				icon: '💪',
				impact: 9,
				views: 187,
				favorite: true,
			},
			{
				id: 3,
				year: '2022',
				title: 'הנס של הזוגיות',
				story: "כשחשבנו שאין דרך, ה' הראה לנו את הדרך.",
				category: 'משפחה',
				icon: '💑',
				impact: 10,
				views: 345,
				favorite: true,
			},
		],
		[],
	);

	const COLORS = ['#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

	// Filter and search miracles
	const filteredMiracles = useMemo(() => {
		return myMiracles.filter(miracle => {
			const matchesSearch =
				debouncedSearch === '' || miracle.title.includes(debouncedSearch) || miracle.story.includes?.(debouncedSearch);
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

	// Analytics data
	const categoryData = useMemo(() => {
		const categories = {};
		myMiracles.forEach(m => {
			categories[m.category] = (categories[m.category] || 0) + 1;
		});
		return Object.entries(categories).map(([name, value]) => ({ name, value }));
	}, [myMiracles]);

	const impactData = useMemo(() => {
		return myMiracles.map(m => ({ name: m.title.slice(0, 10), impact: m.impact, views: m.views }));
	}, [myMiracles]);

	const toggleFavorite = id => {
		setFavorites(favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id]);
	};

	const categoryOptions = ['all', ...new Set(myMiracles.map(m => m.category))];

	return (
		<AppContainer darkMode={darkMode}>
			{/* Navigation */}
			<Navbar darkMode={darkMode}>
				<NavContainer>
					<NavBrand>
						<Sparkles size={24} />
						מסע הניסים
					</NavBrand>
					<NavMenu mobileMenuOpen={mobileMenu} darkMode={darkMode}>
						<NavButton
							active={activePage === 'home'}
							onClick={() => {
								setActivePage('home');
								setMobileMenu(false);
							}}
							darkMode={darkMode}
						>
							בית
						</NavButton>
						<NavButton
							active={activePage === 'analytics'}
							onClick={() => {
								setActivePage('analytics');
								setMobileMenu(false);
							}}
							darkMode={darkMode}
						>
							ניתוח
						</NavButton>
						<NavButton
							active={activePage === 'community'}
							onClick={() => {
								setActivePage('community');
								setMobileMenu(false);
							}}
							darkMode={darkMode}
						>
							קהילה
						</NavButton>
						<NavButton
							active={activePage === 'wife'}
							onClick={() => {
								setActivePage('wife');
								setMobileMenu(false);
							}}
							darkMode={darkMode}
						>
							הניסים של מרגלית
						</NavButton>
						<NavButton
							active={activePage === 'lecture'}
							onClick={() => {
								setActivePage('lecture');
								setMobileMenu(false);
							}}
							darkMode={darkMode}
						>
							הזמן הרצאה
						</NavButton>
					</NavMenu>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						<IconButton darkMode={darkMode} onClick={() => setDarkMode(!darkMode)}>
							{darkMode ? <Sun size={20} /> : <Moon size={20} />}
						</IconButton>
						<MobileMenuButton darkMode={darkMode} onClick={() => setMobileMenu(!mobileMenu)}>
							{mobileMenu ? <X size={24} /> : <Menu size={24} />}
						</MobileMenuButton>
					</div>
				</NavContainer>
			</Navbar>

			{/* Hero Section */}
			{activePage === 'home' && (
				<HeroSection>
					<HeroContent>
						<HeroTitle>מסע הניסים שלי</HeroTitle>
						<HeroSubtitle>סיפור החיים והניסים שהשם הרעיף עליי</HeroSubtitle>
						<HeroButtons>
							<Button primary onClick={() => setActivePage('community')}>
								שתפו את הנס שלכם
							</Button>
							<Button onClick={() => setActivePage('analytics')}>ראו את הניתוח</Button>
						</HeroButtons>
					</HeroContent>
				</HeroSection>
			)}

			<MainContent>
				{activePage === 'home' ? (
					<section>
						{/* Search and Filters */}
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

						{/* Miracle Cards */}
						{sortedMiracles.map(miracle => (
							<MiracleCard key={miracle.id} darkMode={darkMode}>
								<MiracleCardHeader onClick={() => setExpandedMiracle(expandedMiracle === miracle.id ? null : miracle.id)}>
									<MiracleIcon>
										{miracle.icon.endsWith('.ico') || miracle.icon.endsWith('.png') || miracle.icon.endsWith('.jpg') ? (
											<img
												src={miracle.icon}
												alt='icon'
												style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }}
											/>
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
									<ChevronDown
										size={24}
										style={{
											transform: expandedMiracle === miracle.id ? 'rotate(180deg)' : 'rotate(0deg)',
											transition: 'transform 0.3s ease',
										}}
									/>
								</MiracleCardHeader>
								<MiracleContent expanded={expandedMiracle === miracle.id}>
									<MiracleStory darkMode={darkMode}>{miracle.story}</MiracleStory>
								</MiracleContent>
							</MiracleCard>
						))}
					</section>
				) : activePage === 'analytics' ? (
					<>
						<h2
							style={{
								fontSize: '2.25rem',
								fontWeight: '700',
								marginBottom: '2rem',
								textAlign: 'center',
								color: darkMode ? '#ffffff' : '#111827',
							}}
						>
							ניתוח ודברים מעניינים
						</h2>

						{/* Charts Grid */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
								gap: '1.5rem',
								marginBottom: '2rem',
							}}
						>
							{/* Miracles by Category */}
							<ChartContainer darkMode={darkMode}>
								<ChartTitle darkMode={darkMode}>ניסים לפי קטגוריה</ChartTitle>
								<ResponsiveContainer width='100%' height={200}>
									<PieChart>
										<Pie
											data={categoryData}
											cx='50%'
											cy='50%'
											labelLine={false}
											outerRadius={80}
											fill='#8884d8'
											dataKey='value'
										>
											{categoryData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</ChartContainer>

							{/* Impact vs Views Chart */}
							<ChartContainer darkMode={darkMode}>
								<ChartTitle darkMode={darkMode}>השפעה וצפיות</ChartTitle>
								<ResponsiveContainer width='100%' height={200}>
									<AreaChart data={impactData}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='name' />
										<YAxis />
										<Tooltip />
										<Area type='monotone' dataKey='impact' stroke='#8b5cf6' fill='#8b5cf6' fillOpacity={0.6} />
										<Area type='monotone' dataKey='views' stroke='#ec4899' fill='#ec4899' fillOpacity={0.6} />
									</AreaChart>
								</ResponsiveContainer>
							</ChartContainer>
						</div>

						{/* Summary Stats */}
						<StatsGrid>
							<StatCard darkMode={darkMode}>
								<TrendingUp
									style={{
										width: '2rem',
										height: '2rem',
										color: '#22c55e',
										marginLeft: 'auto',
										marginRight: 'auto',
										marginBottom: '0.5rem',
									}}
								/>
								<StatValue color='#22c55e'>{myMiracles.length}</StatValue>
								<StatLabel darkMode={darkMode}>סה"כ ניסים</StatLabel>
							</StatCard>
							<StatCard darkMode={darkMode}>
								<Star
									style={{
										width: '2rem',
										height: '2rem',
										color: '#eab308',
										marginLeft: 'auto',
										marginRight: 'auto',
										marginBottom: '0.5rem',
									}}
								/>
								<StatValue color='#eab308'>
									{(myMiracles.reduce((sum, m) => sum + m.impact, 0) / myMiracles.length).toFixed(1)}
								</StatValue>
								<StatLabel darkMode={darkMode}>ממוצע השפעה</StatLabel>
							</StatCard>
							<StatCard darkMode={darkMode}>
								<Heart
									style={{
										width: '2rem',
										height: '2rem',
										color: '#ef4444',
										marginLeft: 'auto',
										marginRight: 'auto',
										marginBottom: '0.5rem',
									}}
								/>
								<StatValue color='#ef4444'>{favorites.length}</StatValue>
								<StatLabel darkMode={darkMode}>מועדפים</StatLabel>
							</StatCard>
							<StatCard darkMode={darkMode}>
								<Calendar
									style={{
										width: '2rem',
										height: '2rem',
										color: '#3b82f6',
										marginLeft: 'auto',
										marginRight: 'auto',
										marginBottom: '0.5rem',
									}}
								/>
								<StatValue color='#3b82f6'>45</StatValue>
								<StatLabel darkMode={darkMode}>שנים</StatLabel>
							</StatCard>
						</StatsGrid>
					</>
				) : activePage === 'community' ? (
					<FormSection>
						<FormContainer>
							<FormTitle darkMode={darkMode}>שתפו את הניסים שלכם</FormTitle>

							<FormBox darkMode={darkMode}>
								<FormHeader>
									<Sparkles
										style={{
											width: '4rem',
											height: '4rem',
											color: '#a855f7',
											marginLeft: 'auto',
											marginRight: 'auto',
											marginBottom: '1rem',
										}}
									/>
									<FormSubtitle darkMode={darkMode}>גם לכם יש נס לספר?</FormSubtitle>
									<FormDescription darkMode={darkMode}>כל נס, גדול או קטן, שווה לספר עליו ולהודות לה׳</FormDescription>
								</FormHeader>

								<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
									<FormGroup>
										<FormLabel darkMode={darkMode}>
											שם מלא <Required>*</Required>
										</FormLabel>
										<FormInput type='text' placeholder='שם פרטי ושם משפחה' required darkMode={darkMode} />
									</FormGroup>
									<FormGroupGrid>
										<FormGroup>
											<FormLabel darkMode={darkMode}>
												אימייל <Required>*</Required>
											</FormLabel>
											<FormInput type='email' placeholder='example@email.com' required darkMode={darkMode} />
										</FormGroup>
										<FormGroup>
											<FormLabel darkMode={darkMode}>
												טלפון <Required>*</Required>
											</FormLabel>
											<FormInput
												type='tel'
												placeholder='050-1234567'
												required
												pattern='[0-9]{3}-[0-9]{7}|[0-9]{10}'
												darkMode={darkMode}
											/>
										</FormGroup>
									</FormGroupGrid>
									<FormGroup>
										<FormLabel darkMode={darkMode}>
											כותרת הנס <Required>*</Required>
										</FormLabel>
										<FormInput type='text' placeholder='למשל: הצלה מתאונה, שידוך מופלא...' required darkMode={darkMode} />
									</FormGroup>
									<FormGroup>
										<FormLabel darkMode={darkMode}>
											שנה <Required>*</Required>
										</FormLabel>
										<FormInput type='number' placeholder='2024' required min='1900' max='2025' darkMode={darkMode} />
									</FormGroup>
									<FormGroup>
										<FormLabel darkMode={darkMode}>
											קטגוריה <Required>*</Required>
										</FormLabel>
										<SelectInput required darkMode={darkMode}>
											<option value=''>בחר קטגוריה...</option>
											<option>רפואה</option>
											<option>הצלה</option>
											<option>פרנסה</option>
											<option>זיווג</option>
											<ption>משפחה</ption>
											<option>אחר</option>
										</SelectInput>
									</FormGroup>
									<FormGroup>
										<FormLabel darkMode={darkMode}>
											ספרו על הנס <Required>*</Required>
										</FormLabel>
										<FormTextarea
											rows='6'
											placeholder='שתפו את הסיפור המופלא שלכם...'
											required
											minLength='50'
											darkMode={darkMode}
										></FormTextarea>
										<FormHint darkMode={darkMode}>מינימום 50 תווים</FormHint>
									</FormGroup>
									<SubmitButton type='submit'>שלח סיפור</SubmitButton>
								</div>
							</FormBox>

							<ContactBox darkMode={darkMode}>
								<ContactTitle>יצירת קשר</ContactTitle>
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
				) : activePage === 'wife' ? (
					<WifeSection>
						<MainContent>
							<SectionTitle darkMode={darkMode}>ניסי אשתי - מרגלית</SectionTitle>
							{wifesMiracles.map(miracle => (
								<MiracleCard key={miracle.id} darkMode={darkMode}>
									<MiracleCardHeader onClick={() => setExpandedMiracle(expandedMiracle === miracle.id ? null : miracle.id)}>
										<MiracleIcon>
											{miracle.icon.endsWith('.ico') || miracle.icon.endsWith('.png') || miracle.icon.endsWith('.jpg') ? (
												<img
													src={miracle.icon}
													alt='icon'
													style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }}
												/>
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
										<ChevronDown
											size={24}
											style={{
												transform: expandedMiracle === miracle.id ? 'rotate(180deg)' : 'rotate(0deg)',
												transition: 'transform 0.3s ease',
											}}
										/>
									</MiracleCardHeader>
									<MiracleContent expanded={expandedMiracle === miracle.id}>
										<MiracleStory darkMode={darkMode}>{miracle.story}</MiracleStory>
									</MiracleContent>
								</MiracleCard>
							))}
						</MainContent>
					</WifeSection>
				) : activePage === 'lecture' ? (
					<LectureSection>
						<LectureContainer>
							<LectureTitle>הזמנת הרצאה</LectureTitle>
							<LectureSubtitle>שתפו את סיפורי הניסים שלנו עם קהילתכם</LectureSubtitle>

							<LectureOptions>
								<LectureCard onClick={() => window.alert('יוצר קשר עבור הרצאה של אודה-י-ה')}>
									<LectureName>אודה-י-ה</LectureName>
									<LectureDescription>סיפורי הניסים האישיים שלי</LectureDescription>
									<LectureButton>בקש הרצאה</LectureButton>
								</LectureCard>

								<LectureCard onClick={() => window.alert('יוצר קשר עבור הרצאה של מרגלית')}>
									<LectureName>מרגלית</LectureName>
									<LectureDescription>סיפורי הניסים של אשתי</LectureDescription>
									<LectureButton>בקש הרצאה</LectureButton>
								</LectureCard>

								<LectureCard onClick={() => window.alert('יוצר קשר עבור הרצאה משותפת')}>
									<LectureName>יחד</LectureName>
									<LectureDescription>הרצאה משותפת - הניסים שלנו כזוג</LectureDescription>
									<LectureButton>בקש הרצאה</LectureButton>
								</LectureCard>
							</LectureOptions>

							<ContactBox
								darkMode={darkMode}
								style={{
									marginTop: '3rem',
									backgroundColor: 'rgba(255, 255, 255, 0.1)',
									border: '1px solid rgba(255, 255, 255, 0.2)',
								}}
							>
								<ContactTitle style={{ color: 'white' }}>יצירת קשר</ContactTitle>
								<ContactSpace>
									<ContactItem>
										<Mail style={{ width: '1.25rem', height: '1.25rem', color: 'white', flexShrink: 0 }} />
										<ContactText style={{ color: 'white' }}>miracles@example.com</ContactText>
									</ContactItem>
									<ContactItem>
										<Phone style={{ width: '1.25rem', height: '1.25rem', color: 'white', flexShrink: 0 }} />
										<ContactText style={{ color: 'white' }}>050-1234567</ContactText>
									</ContactItem>
									<ContactItem>
										<MapPin style={{ width: '1.25rem', height: '1.25rem', color: 'white', flexShrink: 0 }} />
										<ContactText style={{ color: 'white' }}>ירושלים, ישראל</ContactText>
									</ContactItem>
								</ContactSpace>
							</ContactBox>
						</LectureContainer>
					</LectureSection>
				) : null}
			</MainContent>

			{/* Footer */}
			<Footer darkMode={darkMode}>
				<FooterContainer>
					<FooterQuote darkMode={darkMode}>"מודים אנחנו לך ה׳ אלוהינו על כל הניסים שבכל יום עמנו"</FooterQuote>
					<FooterCopyright>© 2024 מסע הניסים שלי | כל הזכויות שמורות</FooterCopyright>
				</FooterContainer>
			</Footer>
		</AppContainer>
	);
};

export default MyAdvancedMiracleWebsite;
