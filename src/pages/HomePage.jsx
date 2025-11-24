import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
	background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
	padding: 3rem 1rem;
	text-align: center;
	color: white;
	min-height: 20vh;
	display: flex;
	align-items: center;
`;

const HeroContent = styled.div`
	max-width: 900px;
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
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}
`;

const FeaturesSection = styled.section`
	padding: 4rem 1rem;
	background-color: ${props => (props.darkMode ? '#1f2937' : '#f9fafb')};
`;

const FeaturesContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const FeaturesTitle = styled.h2`
	font-size: 2.25rem;
	font-weight: 700;
	text-align: center;
	margin-bottom: 3rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const FeaturesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 2rem;
`;

const FeatureCard = styled.div`
	background-color: ${props => (props.darkMode ? '#111827' : '#ffffff')};
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	text-align: center;
`;

const FeatureIcon = styled.div`
	font-size: 3rem;
	margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
	font-size: 1.25rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
`;

const FeatureDescription = styled.p`
	color: ${props => (props.darkMode ? '#d1d5db' : '#4b5563')};
	line-height: 1.6;
`;

const HomePage = ({ darkMode, onNavigate }) => {
	return (
		<>
			<HeroSection>
				<HeroContent>
					<HeroTitle>השם איתנו אז הניסים לא נגמרים</HeroTitle>
					<HeroSubtitle>
						ברוכים הבאים למקום של אמונה, תודה וניסים. כאן תמצאו את סיפורי הניסים האישיים שלי ושל מרגלית, וגם את ניסי הקהילה –
						סיפורים אמיתיים של אנשים שראו את יד ה׳ בחייהם. המטרה שלנו היא להזכיר לכולנו שה׳ תמיד איתנו, ותמיד יש תקווה, אמונה
						ואור.
					</HeroSubtitle>
					<HeroButtons>
						<Button primary onClick={() => onNavigate('my-miracles')}>
							הניסים שלי
						</Button>
						<Button onClick={() => onNavigate('margalits-miracles')}>הניסים של מרגלית</Button>
						<Button primary onClick={() => onNavigate('community-miracles')}>
							קהילת הניסים שלנו
						</Button>
						<Button primary onClick={() => onNavigate('lectures')}>
							הזמנת הרצאות
						</Button>
					</HeroButtons>
				</HeroContent>
			</HeroSection>

			<FeaturesSection darkMode={darkMode}>
				<FeaturesContainer>
					<FeaturesTitle darkMode={darkMode}>מה אתם תוכלו למצוא כאן?</FeaturesTitle>
					<FeaturesGrid>
						<FeatureCard darkMode={darkMode}>
							<FeatureIcon>📖</FeatureIcon>
							<FeatureTitle darkMode={darkMode}>סיפורי ניסים</FeatureTitle>
							<FeatureDescription darkMode={darkMode}>
								קרא את סיפורי הניסים המופלאים שקרו לנו בשנים האחרונות
							</FeatureDescription>
						</FeatureCard>
						<FeatureCard darkMode={darkMode}>
							<FeatureIcon>👥</FeatureIcon>
							<FeatureTitle darkMode={darkMode}>קהילה</FeatureTitle>
							<FeatureDescription darkMode={darkMode}>שתפו את הניסים שלכם עם הקהילה שלנו וחזקו זה את זה</FeatureDescription>
						</FeatureCard>
						<FeatureCard darkMode={darkMode}>
							<FeatureIcon>🎤</FeatureIcon>
							<FeatureTitle darkMode={darkMode}>הרצאות</FeatureTitle>
							<FeatureDescription darkMode={darkMode}>הזמינו הרצאה אצלכם עם סיפורי הניסים שלנו</FeatureDescription>
						</FeatureCard>
					</FeaturesGrid>
				</FeaturesContainer>
			</FeaturesSection>
		</>
	);
};

export default HomePage;
