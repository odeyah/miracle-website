import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, Moon, Sun, Menu, X, Sparkles, Home, BookOpen, Users, Phone } from 'lucide-react';
import HomePage from './pages/HomePage';
import MyMiraclesPage from './pages/MyMiraclesPage';
import MargalitsPage from './pages/MargalitsPage';
import CommunityPage from './pages/CommunityPage';
import LectureBookingPage from './pages/LectureBookingPage';

// ==================== STYLED COMPONENTS ====================

const AppContainer = styled.div`
	min-height: 100vh;
	background-color: ${props => (props.darkMode ? '#111827' : '#ffffff')};
	color: ${props => (props.darkMode ? '#ffffff' : '#000000')};
	transition: background-color 0.3s ease, color 0.3s ease;
	direction: rtl;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
		'Droid Sans', 'Helvetica Neue', sans-serif;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
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
	max-width: 1400px;
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
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
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
	gap: 0.5rem;
	align-items: stretch;
	@media (min-width: 768px) {
		align-items: center;
	}
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
	padding: 0.625rem 1rem;
	border-radius: 0.5rem;
	border: none;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.3s ease;
	background-color: ${props =>
		props.active ? 'linear-gradient(to right, #a855f7, #ec4899)' : props.darkMode ? '#374151' : '#f3f4f6'};
	color: ${props => (props.active ? '#ffffff' : props.darkMode ? '#e5e7eb' : '#374151')};
	border: ${props => (props.active ? '2px solid #a855f7' : 'none')};
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	font-size: 0.95rem;
	white-space: nowrap;

	.desktop-text {
		display: inline;
	}

	.tablet-text {
		display: none;
	}
	.mobile-text {
		display: none;
	}
	&:hover {
		background-color: ${props =>
			props.active ? 'linear-gradient(to right, #9333ea, #db2777)' : props.darkMode ? '#4b5563' : '#e5e7eb'};
		transform: translateY(-2px);
	}
	@media (max-width: 932px) and (min-width: 768px) {
		min-width: 90px;
		padding: 0.5rem 0.75rem;
		font-size: 0.85rem;

		.desktop-text {
			display: none !important;
		}

		.tablet-text {
			display: inline !important;
		}
	}
	@media (max-width: 768px) {
		width: 100%;
		justify-content: flex-start;
		padding: 0.75rem 1rem;
		.desktop-text {
			display: none;
		}

		.tablet-text {
			display: none;
		}
		.mobile-text {
			display: inline;
		}
		span {
			display: none;
		}
	}
`;

const ToolbarRight = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
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
	border-radius: 0.375rem;

	&:hover {
		color: #a855f7;
		background-color: ${props => (props.darkMode ? '#374151' : '#f3f4f6')};
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

const MainContent = styled.main`
	flex: 1;
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
	padding: 2rem 1rem;

	@media (max-width: 768px) {
		padding: 1rem;
	}
`;

const Footer = styled.footer`
	background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
	color: white;
	padding: 3rem 1rem;
	margin-top: 4rem;
	text-align: center;
`;

const FooterContainer = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	gap: 3rem;
	margin-bottom: 2rem;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}
`;

const FooterSection = styled.div`
	text-align: center;
	flex: 1;
	min-width: 200px;
	max-width: 300px;

	@media (max-width: 768px) {
		width: 100%;
		max-width: none;
		align-items: center;
	}
`;

const FooterTitle = styled.h3`
	font-size: 1.125rem;
	font-weight: 700;
	margin-bottom: 1rem;
`;

const FooterLink = styled.button`
	display: block;
	background: none;
	border: none;
	color: rgba(255, 255, 255, 0.9);
	text-decoration: none;
	margin-bottom: 0.5rem;
	transition: color 0.3s ease;
	cursor: pointer;
	font-size: 0.875rem;
	padding: 0;
	width: 100%;
	max-width: none;
	text-align: center;

	&:hover {
		color: #ffffff;
	}
`;

const FooterText = styled.p`
	font-size: 0.875rem;
	color: rgba(255, 255, 255, 0.9);
	line-height: 1.6;
`;

const FooterBottom = styled.div`
	border-top: 1px solid rgba(255, 255, 255, 0.2);
	padding-top: 2rem;
	text-align: center;
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.875rem;
`;

const BottomLine = styled.p`
	margin-bottom: 0.5rem;
`;

const Badge = styled.span`
	display: inline-block;
	background-color: rgba(255, 255, 255, 0.2);
	padding: 0.25rem 0.75rem;
	border-radius: 9999px;
	font-size: 0.75rem;
	font-weight: 600;
`;

const LoadingScreen = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 50vh;
	font-size: 1.125rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
`;

const Spinner = styled.div`
	border: 3px solid ${props => (props.darkMode ? '#374151' : '#e5e7eb')};
	border-top: 3px solid #a855f7;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;
	margin-right: 1rem;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const Breadcrumb = styled.div`
	font-size: 0.875rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	margin-bottom: 1rem;
	display: flex;
	gap: 0.5rem;
	align-items: center;

	button {
		background: none;
		border: none;
		cursor: pointer;
		color: #a855f7;
		text-decoration: none;
		padding: 0;
		font-size: inherit;

		&:hover {
			text-decoration: underline;
		}
	}
`;

const NotificationBadge = styled.span`
	position: absolute;
	top: -5px;
	right: -5px;
	background-color: #ef4444;
	color: white;
	border-radius: 50%;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.75rem;
	font-weight: 700;
`;

const NavButtonWrapper = styled.div`
	position: relative;
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

// ==================== MAIN APP COMPONENT ====================

function App() {
	const [activePage, setActivePage] = useState('home');
	const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [loading, setLoading] = useState(false);
	const [unreadNotifications, setUnreadNotifications] = useLocalStorage('unreadNotifications', 0);

	// Simulate page loading
	const navigatePage = page => {
		setLoading(true);
		setMobileMenu(false);
		setTimeout(() => {
			setActivePage(page);
			setLoading(false);
		}, 300);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// Track community submissions
	const handleCommunitySubmission = () => {
		setUnreadNotifications(prev => prev + 1);
	};

	// Render current page
	const renderPage = () => {
		switch (activePage) {
			case 'home':
				return <HomePage darkMode={darkMode} onNavigate={navigatePage} />;
			case 'my-miracles':
				return <MyMiraclesPage darkMode={darkMode} />;
			case 'margalits-miracles':
				return <MargalitsPage darkMode={darkMode} />;
			case 'community':
				return <CommunityPage darkMode={darkMode} onNewSubmission={handleCommunitySubmission} />;
			case 'lecture-booking':
				return <LectureBookingPage darkMode={darkMode} />;
			default:
				return <HomePage darkMode={darkMode} onNavigate={navigatePage} />;
		}
	};

	// Page data for navigation
	const pages = [
		{ id: 'home', label: 'בית', labelTablet: 'בית', icon: Home },
		{ id: 'margalits-miracles', label: 'הניסים של מרגלית', labelTablet: 'מרגלית', icon: Heart },
		{ id: 'my-miracles', label: 'הניסים שלי', labelTablet: 'אודה-י-ה', icon: BookOpen },
		{ id: 'community', label: 'קהילה', labelTablet: 'קהילה', icon: Users, notifications: unreadNotifications },
		{ id: 'lecture-booking', label: 'הזמן הרצאה', labelTablet: 'הרצאה', icon: Phone },
	];

	// Breadcrumb data
	const getBreadcrumb = () => {
		const currentPage = pages.find(p => p.id === activePage);
		if (activePage === 'home') return null;
		return currentPage ? currentPage.label : 'דף';
	};

	// Dark mode toggle with animation
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<AppContainer darkMode={darkMode}>
			{/* Navigation */}
			<Navbar darkMode={darkMode}>
				<NavContainer>
					{/* Brand */}
					<NavBrand onClick={() => navigatePage('home')} title='חזרה לעמוד הבית'>
						<Sparkles size={24} />
						<span>מסע הניסים</span>
					</NavBrand>

					{/* Menu */}
					<NavMenu mobileMenuOpen={mobileMenu} darkMode={darkMode}>
						{pages.map(page => {
							const Icon = page.icon;
							return (
								<NavButtonWrapper key={page.id}>
									<NavButton
										active={activePage === page.id}
										onClick={() => navigatePage(page.id)}
										darkMode={darkMode}
										title={`עבור ל${page.label}`}
									>
										<Icon size={18} />
										<span className='desktop-text'>{page.label}</span>
										{page.labelTablet && <span className='tablet-text'>{page.labelTablet}</span>}
										<span className='mobile-text'>{page.label}</span>
									</NavButton>
									{page.notifications > 0 && <NotificationBadge>{page.notifications}</NotificationBadge>}
								</NavButtonWrapper>
							);
						})}
					</NavMenu>

					{/* Right Toolbar */}
					<ToolbarRight>
						<IconButton darkMode={darkMode} onClick={toggleDarkMode} title={darkMode ? 'מצב בהיר' : 'מצב אפל'}>
							{darkMode ? <Sun size={20} /> : <Moon size={20} />}
						</IconButton>

						<MobileMenuButton
							darkMode={darkMode}
							onClick={() => setMobileMenu(!mobileMenu)}
							title={mobileMenu ? 'סגור תפריט' : 'פתח תפריט'}
						>
							{mobileMenu ? <X size={24} /> : <Menu size={24} />}
						</MobileMenuButton>
					</ToolbarRight>
				</NavContainer>
			</Navbar>

			{/* Main Content */}
			<MainContent>
				{/* Breadcrumb */}
				{getBreadcrumb() && (
					<Breadcrumb darkMode={darkMode}>
						<button onClick={() => navigatePage('home')}>בית</button>
						<span>/</span>
						<span>{getBreadcrumb()}</span>
					</Breadcrumb>
				)}

				{/* Loading State */}
				{loading ? (
					<LoadingScreen darkMode={darkMode}>
						<Spinner darkMode={darkMode} />
						<span>טוען...</span>
					</LoadingScreen>
				) : (
					renderPage()
				)}
			</MainContent>

			{/* Footer */}
			<Footer>
				<FooterContainer>
					{/* About Section */}
					<FooterSection>
						<FooterTitle>🙏 אודה-י-ה ומרגלית</FooterTitle>
						<FooterText>
							<FooterText>
								שותפים בהפצת סיפורי הניסים שה׳ עושה עמנו בכל יום. כאן תוכלו למצוא השראה, אמונה וחיזוק ללב.
							</FooterText>
						</FooterText>
					</FooterSection>

					{/* Quick Links */}
					<FooterSection>
						<FooterTitle>קישורים</FooterTitle>
						<FooterLink onClick={() => navigatePage('my-miracles')}>הניסים שלי</FooterLink>
						<FooterLink onClick={() => navigatePage('margalits-miracles')}>הניסים של מרגלית</FooterLink>
						<FooterLink onClick={() => navigatePage('community')}>קהילה</FooterLink>
						<FooterLink onClick={() => navigatePage('lecture-booking')}>הזמן הרצאה</FooterLink>
					</FooterSection>

					{/* Contact Section */}
					<FooterSection>
						<FooterTitle>📞 יצירת קשר</FooterTitle>
						<FooterText>
							דוא"ל: ourMiracles@proton.me
							<br />
							טלפון: 052-4441093
							<br />
							ירושלים, ישראל
						</FooterText>
					</FooterSection>
				</FooterContainer>

				{/* Footer Bottom */}
				<FooterBottom>
					<BottomLine>© 2025 מסע הניסים שלנו | כל הזכויות שמורות</BottomLine>
					<BottomLine>"מודים אנחנו לך ה׳ אלוהינו על כל הניסים שבכל יום עמנו"</BottomLine>
					<BottomLine>
						<Badge>v1.0.0</Badge>
					</BottomLine>
				</FooterBottom>
			</Footer>
		</AppContainer>
	);
}

export default App;
