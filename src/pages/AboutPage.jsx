import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, MapPin, Mail, Phone, BookOpen, Music, Globe, Compass } from 'lucide-react';
import SEO from '../components/SEO';

// Animation variants
const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
};

// Styled Components
const PageContainer = styled.div`
	max-width: 900px;
	margin: 0 auto;
	padding: 2rem 1rem;
`;

const HeroSection = styled.section`
	text-align: center;
	margin-bottom: 3rem;
`;

const ProfileImageContainer = styled(motion.div)`
	width: 180px;
	height: 180px;
	border-radius: 50%;
	margin: 0 auto 1.5rem;
	background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
	padding: 4px;
	box-shadow: 0 10px 40px rgba(168, 85, 247, 0.3);
`;

const ProfileImage = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 4rem;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const Name = styled(motion.h1)`
	font-size: 2.5rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;

	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

const Tagline = styled(motion.p)`
	font-size: 1.25rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	margin-bottom: 1rem;
`;

const Location = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	color: ${props => (props.darkMode ? '#9ca3af' : '#6b7280')};
	font-size: 1rem;
`;

const Section = styled(motion.section)`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 1rem;
	padding: 2rem;
	margin-bottom: 2rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 1.5rem;
	color: ${props => (props.darkMode ? '#ffffff' : '#111827')};
	display: flex;
	align-items: center;
	gap: 0.75rem;

	svg {
		color: #2563eb;
	}
`;

const Paragraph = styled.p`
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
	line-height: 1.8;
	font-size: 1.1rem;
	margin-bottom: 1rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

const HighlightText = styled.span`
	color: #2563eb;
	font-weight: 600;
`;

const QuoteSection = styled(motion.section)`
	background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
	border-radius: 1rem;
	padding: 2.5rem;
	margin-bottom: 2rem;
	text-align: center;
	color: white;
`;

const QuoteText = styled.p`
	font-size: 1.25rem;
	line-height: 1.8;
	margin-bottom: 1rem;
	font-style: italic;
`;

const QuoteSource = styled.p`
	font-size: 1rem;
	opacity: 0.9;
	font-weight: 600;
`;

const HobbiesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

const HobbyCard = styled.div`
	background-color: ${props => (props.darkMode ? '#374151' : '#f3f4f6')};
	border-radius: 0.75rem;
	padding: 1.25rem;
	display: flex;
	align-items: center;
	gap: 0.75rem;
	transition: transform 0.2s;

	&:hover {
		transform: translateY(-2px);
	}

	svg {
		color: #2563eb;
	}
`;

const HobbyText = styled.span`
	color: ${props => (props.darkMode ? '#e5e7eb' : '#374151')};
	font-weight: 500;
`;

const FamilySection = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1.5rem;
	background-color: ${props => (props.darkMode ? '#374151' : '#fdf4ff')};
	border-radius: 0.75rem;
	margin-top: 1rem;
`;

const FamilyEmoji = styled.span`
	font-size: 3rem;
`;

const FamilyText = styled.div`
	color: ${props => (props.darkMode ? '#e5e7eb' : '#374151')};
	line-height: 1.6;
`;

const MessageBox = styled(motion.div)`
	background-color: ${props => (props.darkMode ? '#374151' : '#f0fdf4')};
	border-right: 4px solid #10b981;
	border-radius: 0.5rem;
	padding: 1.5rem;
	margin-top: 1rem;
`;

const MessageText = styled.p`
	color: ${props => (props.darkMode ? '#e5e7eb' : '#374151')};
	font-size: 1.1rem;
	font-weight: 500;
	text-align: center;
`;

const ContactSection = styled(motion.section)`
	background-color: ${props => (props.darkMode ? '#1f2937' : '#ffffff')};
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	text-align: center;
`;

const ContactGrid = styled.div`
	display: flex;
	justify-content: center;
	gap: 2rem;
	flex-wrap: wrap;
	margin-top: 1rem;
`;

const ContactItem = styled.a`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: ${props => (props.darkMode ? '#d1d5db' : '#374151')};
	text-decoration: none;
	transition: color 0.2s;

	&:hover {
		color: #2563eb;
	}

	svg {
		color: #2563eb;
	}
`;

const AboutPage = ({ darkMode }) => {
	return (
		<PageContainer>
			<SEO
				title='אודות'
				description='הכירו את אודה-י-ה דוד אבלס - הסיפור האישי שלי, למה התחלתי לשתף סיפורי ניסים, ומה המסר שלי לעולם.'
				keywords='אודה-י-ה, אודות, סיפור אישי, ניסים, אמונה'
				url='/about'
			/>

			{/* Hero Section */}
			<HeroSection>
				<motion.div initial='hidden' animate='visible' variants={staggerContainer}>
					<ProfileImageContainer variants={fadeInUp}>
						<ProfileImage darkMode={darkMode}>
							<img src='/myPicture.jpg' alt='אודה-י-ה דוד אבלס' />
						</ProfileImage>
					</ProfileImageContainer>

					<Name variants={fadeInUp}>אודה-י-ה דוד אבלס</Name>

					<Tagline variants={fadeInUp} darkMode={darkMode}>
						מפרסם את הטוב ומודה לה' על הניסים
					</Tagline>

					<Location variants={fadeInUp} darkMode={darkMode}>
						<MapPin size={18} />
						בית שמש
					</Location>
				</motion.div>
			</HeroSection>

			{/* Quote Section */}
			<QuoteSection initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInUp}>
				<QuoteText>
					מִזְמ֥וֹר לְתוֹדָ֑ה הָרִ֥יעוּ לַ֝יהֹוָ֗ה כׇּל־הָאָֽרֶץ׃ עִבְד֣וּ אֶת־יְהֹוָ֣ה בְּשִׂמְחָ֑ה בֹּ֥אוּ לְ֝פָנָ֗יו
					בִּרְנָנָֽה׃
				</QuoteText>
				<QuoteSource>מזמור ק' בתהילים - המזמור שמלווה אותי</QuoteSource>
			</QuoteSection>

			{/* My Story Section */}
			<Section darkMode={darkMode} initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInUp}>
				<SectionTitle darkMode={darkMode}>
					<BookOpen size={24} />
					הסיפור שלי
				</SectionTitle>

				<Paragraph darkMode={darkMode}>
					קוראים לי <HighlightText>אודה-י-ה</HighlightText> - שם לא שגרתי, עם משמעות עמוקה. נולדתי עם תסמונת נדירה, ובזכות
					שרשרת של ניסים אני חי ומתפקד כאדם רגיל לחלוטין.
				</Paragraph>

				<Paragraph darkMode={darkMode}>
					ההורים שלי בחרו את השם הזה כדי להודות לה' על הניסים ועל החיים שלי. ואני? אני משתדל להמשיך את המסורת הזו ולהודות לה'
					על הכל - על הטוב הגלוי ועל הטוב הנסתר.
				</Paragraph>

				<Paragraph darkMode={darkMode}>
					הגיע הזמן לפרסם את הטוב. אחרי שנים של חוויות, ניסים וישועות, הבנתי שצריך לשתף את זה עם העולם. לא להשאיר את הסיפורים
					האלה רק לעצמי, אלא לחזק אחרים ולהראות שה' איתנו בכל רגע.
				</Paragraph>

				<MessageBox darkMode={darkMode}>
					<MessageText darkMode={darkMode}>
						💡 המסר שלי: <HighlightText>ה' משגיח עלינו תמיד - רק צריך לפקוח עיניים</HighlightText>
					</MessageText>
				</MessageBox>
			</Section>

			{/* Family Section */}
			<Section darkMode={darkMode} initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInUp}>
				<SectionTitle darkMode={darkMode}>
					<Heart size={24} />
					המשפחה שלי
				</SectionTitle>

				<Paragraph darkMode={darkMode}>
					אני נשוי ל<HighlightText>מרגלית</HighlightText> היקרה שלי - כבר 4.5 שנים של נישואים מבורכים. גם הפגישה שלנו הייתה
					נס בפני עצמו!
				</Paragraph>

				<Paragraph darkMode={darkMode}>
					ממש קצת אחרי שהתחלתי להרבות באמירת תודה לה', שדכנית בקבוצת וואטסאפ הציעה לי את מרגלית. נפגשנו, וכל השאר היסטוריה.
					עוד הוכחה שכשמודים לה' - הישועה מגיעה.
				</Paragraph>

				<FamilySection darkMode={darkMode}>
					<FamilyEmoji>👨‍👩‍👧‍👦</FamilyEmoji>
					<FamilyText darkMode={darkMode}>
						<strong>מרגלית</strong> - זמרת, מלחינה וכותבת שירים. עובדת כמזכירה בבית ספר. ואנחנו גרים יחד עם 2 הילדים המתוקים
						שלה אלחנן החייל ונעה
					</FamilyText>
				</FamilySection>
			</Section>

			{/* Hobbies Section */}
			<Section darkMode={darkMode} initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInUp}>
				<SectionTitle darkMode={darkMode}>
					<Compass size={24} />
					מה אני אוהב לעשות
				</SectionTitle>

				<HobbiesGrid>
					<HobbyCard darkMode={darkMode}>
						<BookOpen size={24} />
						<HobbyText darkMode={darkMode}>ללמוד תורה</HobbyText>
					</HobbyCard>
					<HobbyCard darkMode={darkMode}>
						<Compass size={24} />
						<HobbyText darkMode={darkMode}>לטייל</HobbyText>
					</HobbyCard>
					<HobbyCard darkMode={darkMode}>
						<Globe size={24} />
						<HobbyText darkMode={darkMode}>לבנות אתרים</HobbyText>
					</HobbyCard>
					<HobbyCard darkMode={darkMode}>
						<Music size={24} />
						<HobbyText darkMode={darkMode}>להקשיב למרגלית שרה</HobbyText>
					</HobbyCard>
				</HobbiesGrid>
			</Section>

			{/* Mission Section */}
			<Section darkMode={darkMode} initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeInUp}>
				<SectionTitle darkMode={darkMode}>🎯 המטרה שלי</SectionTitle>

				<Paragraph darkMode={darkMode}>
					המטרה שלי פשוטה: <HighlightText>לפרסם את הטוב ולהרבות פרסום הנס</HighlightText>.
				</Paragraph>

				<Paragraph darkMode={darkMode}>
					אני רוצה שאנשים שיקראו את הסיפורים האלה יתחזקו באמונה, יודו לה' על הניסים שקורים להם, וישתפו גם את הסיפורים שלהם.
					כי לכל אחד יש ניסים - רק צריך לפקוח את העיניים ולראות אותם.
				</Paragraph>

				<Paragraph darkMode={darkMode}>
					ואם יהיה ביקוש להרצאות? נשמח לבוא ולשתף את הסיפורים פנים אל פנים. אבל העיקר - לפרסם את הטוב.
				</Paragraph>
			</Section>

			{/* Contact Section */}
			<ContactSection
				darkMode={darkMode}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				variants={fadeInUp}
			>
				<SectionTitle darkMode={darkMode} style={{ justifyContent: 'center' }}>
					📬 צור קשר
				</SectionTitle>

				<Paragraph darkMode={darkMode} style={{ textAlign: 'center' }}>
					רוצה לשתף סיפור? להזמין הרצאה? או סתם להגיד שלום?
				</Paragraph>

				<ContactGrid>
					<ContactItem href='mailto:ourMiracles@proton.me' darkMode={darkMode}>
						<Mail size={20} />
						ourMiracles@proton.me
					</ContactItem>
					<ContactItem href='tel:052-4441093' darkMode={darkMode}>
						<Phone size={20} />
						052-4441093
					</ContactItem>
				</ContactGrid>
			</ContactSection>
		</PageContainer>
	);
};

export default AboutPage;
