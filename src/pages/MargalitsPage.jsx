import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Heart, Star, Users, ChevronDown } from 'lucide-react';

// ==================== STYLED COMPONENTS ====================

const PageSection = styled.section`
	padding: 2rem 0;
`;

const PageHeader = styled.div`
	text-align: center;
	margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
	font-size: 2.25rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const PageSubtitle = styled.p`
	font-size: 1.125rem;
	color: ${props => (props.darkMode ? '#d1d5db' : '#4b5563')};
	font-style: italic;
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
	border-left: 4px solid #ec4899;

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
	background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1));
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
	background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
	color: white;
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	font-size: 0.875rem;
	margin-bottom: 0.5rem;
	font-weight: 600;
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
	background-color: ${props => (props.darkMode ? '#111827' : '#f9fafb')};
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

const HeaderDecoration = styled.div`
	display: inline-block;
	margin: 0 0.5rem;
	color: #ec4899;
	font-size: 1.25rem;
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

const MargalitsPage = ({ darkMode }) => {
	const [expandedMiracle, setExpandedMiracle] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [sortBy, setSortBy] = useState('date');
	const [favorites, setFavorites] = useLocalStorage('margalits-miracles-favorites', []);

	const debouncedSearch = useDebounce(searchQuery, 300);

	// Margalit's miracles data
	const margalifsMiracles = useMemo(
		() => [
			{
				id: 1,
				year: '2024',
				title: 'הלידה של הבחורה היפה שלנו',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>
							אחרי שנים רבות של ציפיה וכל קיום חייב של תקווה, ה׳ נתן לנו את הנס הגדול ביותר.
						</p>
						<p style={{ marginBottom: '0.5rem' }}>לידה בריאה וקלה, תינוקת בריאה ויפה, וכל המשפחה שמחה ובריאה.</p>
						<p style={{ marginBottom: '0.5rem' }}>
							היום אני זוכרת כל פרט מהרגע שראיתי אותה בפעם הראשונה - זה נס שלא אשכח לעד.
						</p>
					</>
				),
				category: 'משפחה',
				icon: '👶',
				views: 567,
				favorite: true,
			},
			{
				id: 2,
				year: '2023',
				title: 'ריפוי מלידה קשה',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>
							הלידה הייתה קשה יותר מכפי שציפיתי. הרופאים היו מודאגים לגביי ולגבי התינוקת.
						</p>
						<p style={{ marginBottom: '0.5rem' }}>אבל בתפילות משותפות של כל המשפחה, ה׳ שמע וגרם להחלמה מהירה ומוחלטת.</p>
						<p style={{ marginBottom: '0.5rem' }}>היום אני בריאה יותר מאי פעם, וכל יום אני מודה לה׳ על הנס הזה.</p>
					</>
				),
				category: 'רפואה',
				icon: '💪',
				views: 456,
				favorite: true,
			},
			{
				id: 3,
				year: '2022',
				title: 'הנס של הזוגיות המושלמת',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>כשהיו לי ספקות על הנישואין, ה׳ הראה לי שאודה-י-ה הוא בדיוק האדם שצריכה.</p>
						<p style={{ marginBottom: '0.5rem' }}>כל יום אני מרגישה כמה ברוכה אני שנתן לי ה׳ בן זוג כל כך אוהב ותומך.</p>
					</>
				),
				category: 'משפחה',
				icon: '💕',
				views: 678,
				favorite: true,
			},
			{
				id: 4,
				year: '2021',
				title: 'קבלת נשיא',
				story: 'לאחר שנים של אימון לזוגיות והכנה נפשית, הגעתי למקום של קבלה מלאה של כל הניסיונות. זה היה נס רוחני גדול.',
				category: 'רוחניות',
				icon: '🙏',
				views: 345,
				favorite: false,
			},
			{
				id: 5,
				year: '2020',
				title: 'שיכלול הבית שלנו',
				story: 'לאחר חודשים של חיפוש, מצאנו את הדירה המושלמת בתוקף החוק ובתקציב שלנו. ה׳ זרם לנו את הדיוג בדיוק בזמן הנכון.',
				category: 'דיור',
				icon: '🏡',
				views: 234,
				favorite: false,
			},
			{
				id: 6,
				year: '2019',
				title: 'ריפוי מחרדה',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>סבלתי מחרדה קשה שהשפיעה על חיי. כל דבר כל כך קשה לעשות.</p>
						<p style={{ marginBottom: '0.5rem' }}>
							דרך תפילה ועבודה רוחנית, ה׳ הרפא אותי בדרך מופלאה. היום אני חיה חיים חדשים חופשיים.
						</p>
					</>
				),
				category: 'רפואה',
				icon: '🌈',
				views: 567,
				favorite: true,
			},
			{
				id: 7,
				year: '2018',
				title: 'הנס של ההודיה',
				story: 'למדתי שכל מה שיש לנו הוא מתנה מה׳ ולא מגיע. זה שינה את כל הדרך שלי בחיים להערכה והודיה.',
				category: 'רוחניות',
				icon: '✨',
				views: 290,
				favorite: false,
			},
			{
				id: 8,
				year: '2017',
				title: 'התחלה חדשה',
				story: (
					<>
						<p style={{ marginBottom: '0.5rem' }}>אחרי שנים קשות, הרגשתי שה׳ נותן לי הזדמנות לחדש עצמי ולהתחיל מחדש.</p>
						<p style={{ marginBottom: '0.5rem' }}>
							היום, כמה שנים אחר כך, אני יכולה לומר שזה היה אחד הניסים הגדולים ביותר שלי.
						</p>
					</>
				),
				category: 'גאולה',
				icon: '🌅',
				views: 456,
				favorite: true,
			},
		],
		[],
	);

	// Filter and search miracles
	const filteredMiracles = useMemo(() => {
		return margalifsMiracles.filter(miracle => {
			const matchesSearch =
				debouncedSearch === '' ||
				miracle.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
				(typeof miracle.story === 'string' && miracle.story.toLowerCase().includes(debouncedSearch.toLowerCase()));
			const matchesCategory = selectedCategory === 'all' || miracle.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [margalifsMiracles, debouncedSearch, selectedCategory]);

	// Sort miracles
	const sortedMiracles = useMemo(() => {
		const sorted = [...filteredMiracles];
		if (sortBy === 'date') sorted.reverse();
		else if (sortBy === 'views') sorted.sort((a, b) => b.views - a.views);
		return sorted;
	}, [filteredMiracles, sortBy]);

	// Toggle favorite
	const toggleFavorite = id => {
		setFavorites(favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id]);
	};

	// Get unique categories
	const categoryOptions = ['all', ...new Set(margalifsMiracles.map(m => m.category))];

	// Calculate stats
	const stats = useMemo(() => {
		return {
			total: margalifsMiracles.length,
			totalFavorites: favorites.length,
			totalViews: margalifsMiracles.reduce((sum, m) => sum + m.views, 0),
		};
	}, [margalifsMiracles, favorites]);

	return (
		<PageSection>
			<PageHeader>
				<PageTitle darkMode={darkMode}>
					<HeaderDecoration>💕</HeaderDecoration>
					הניסים של מרגלית - מרגלית
					<HeaderDecoration>💕</HeaderDecoration>
				</PageTitle>
				<PageSubtitle darkMode={darkMode}>סיפורי הניסים היפים של אשתי היקרה</PageSubtitle>
			</PageHeader>

			{/* Stats */}
			<StatsGrid>
				<StatCard>
					<StatValue>{stats.total}</StatValue>
					<StatLabel>סה"כ ניסים</StatLabel>
				</StatCard>
				<StatCard>
					<StatValue>{stats.totalFavorites}</StatValue>
					<StatLabel>מועדפים</StatLabel>
				</StatCard>
				<StatCard>
					<StatValue>{stats.totalViews}</StatValue>
					<StatLabel>סה"כ צפיות</StatLabel>
				</StatCard>
			</StatsGrid>

			{/* Filters */}
			<FilterSection>
				<FilterInput
					type='text'
					placeholder='חפש ניסים של מרגלית...'
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
						<MiracleContent expanded={expandedMiracle === miracle.id} darkMode={darkMode}>
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

export default MargalitsPage;
