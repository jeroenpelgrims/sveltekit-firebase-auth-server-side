import { apps, initializeApp, credential } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_CLIENT_EMAIL } from '$env/static/private';
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';

function makeApp() {
	if (apps.length > 0) {
		return apps[0]!;
	}

	return initializeApp({
		credential: credential.cert({
			privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
			clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
			projectId: PUBLIC_FIREBASE_PROJECT_ID
		}),
		databaseURL: `https://${PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
	});
}
export const firebase = makeApp();
export const auth = getAuth(firebase);
export const firestore = getFirestore();
