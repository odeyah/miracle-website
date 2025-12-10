import nodemailer from 'nodemailer';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
});

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { name, email, category, title, story, allowShare } = req.body;

	try {
		// Send email to you
		await transporter.sendMail({
			from: process.env.GMAIL_USER,
			to: 'ourMiracles@proton.me',
			replyTo: email,
			subject: `נס חדש בהמתנה - ${title}`,
			html: `
        <h2>סיפור נס חדש בהמתנה לאישור</h2>
        <p><strong>שם:</strong> ${name}</p>
        <p><strong>דוא"ל:</strong> ${email}</p>
        <p><strong>קטגוריה:</strong> ${category}</p>
        <p><strong>כותרת:</strong> ${title}</p>
        <p><strong>סיפור:</strong></p>
        <p>${story.replace(/\n/g, '<br>')}</p>
        <p><strong>אישור שיתוף:</strong> ${allowShare ? 'כן' : 'לא'}</p>
      `,
		});

		// Send confirmation to sender
		await transporter.sendMail({
			from: process.env.GMAIL_USER,
			to: email,
			subject: 'קיבלנו את סיפורך! ✨',
			html: `
        <h2>שלום ${name}!</h2>
        <p>תודה על שיתוף סיפורך איתנו. אנחנו נבדוק אותו ונאשר בקרוב.</p>
        <p>בברכה,<br>אודה-י-ה ומרגלית</p>
      `,
		});

		// Add to Firebase mailing list
		await setDoc(
			doc(db, 'mailingList', email),
			{
				name,
				email,
				addedDate: new Date().toISOString(),
				source: 'community-story',
			},
			{ merge: true },
		);

		res.status(200).json({ success: true, message: 'סיפורך נשלח בהצלחה' });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'שגיאה בשליחת הסיפור' });
	}
}
