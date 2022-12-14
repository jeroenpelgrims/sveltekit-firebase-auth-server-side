import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID
} from '$env/static/public';

function makeApp() {
	const apps = getApps();
	if (apps.length > 0) {
		return apps[0]!;
	}

	return initializeApp({
		apiKey: PUBLIC_FIREBASE_API_KEY,
		authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
		appId: PUBLIC_FIREBASE_APP_ID,
		databaseURL: `https://${PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
	});
}

export const firebase = makeApp();
export const auth = getAuth(firebase);
