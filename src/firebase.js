// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCB3krzwr08EAKyAvYakpn1o5WVqIJPzlM',
	authDomain: 'ourmiracle-website.firebaseapp.com',
	projectId: 'ourmiracle-website',
	storageBucket: 'ourmiracle-website.firebasestorage.app',
	messagingSenderId: '590099429016',
	appId: '1:590099429016:web:f19657bc708077e5e1c2ed',
	measurementId: 'G-WVW0M88BGJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;
