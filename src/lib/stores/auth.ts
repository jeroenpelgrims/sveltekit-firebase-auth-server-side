import cookie from 'cookie';
import { browser } from '$app/environment';
import { GoogleAuthProvider, type User, signInWithRedirect } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../firebase/client';

export const user = writable<User | null>(null);

export async function signOut() {
	return auth.signOut();
}

export async function signIn() {
	await signInWithRedirect(auth, new GoogleAuthProvider());
}

if (browser) {
	auth.onIdTokenChanged(async (newUser) => {
		const tokenCurrentlySet = cookie.parse(document.cookie)['token'] !== undefined;
		const token = newUser ? await newUser?.getIdToken() : undefined;
		document.cookie = cookie.serialize('token', token ?? '', {
			path: '/',
			maxAge: token ? undefined : 0
		});
		user.set(newUser);

		/* WHY:
			Explained in the bottom of this section in my blogpost:
			https://jeroenpelgrims.com/access-the-firebase-auth-user-in-sveltekit-server-side/#3-create-auth-store-set-id-token-cookie
		*/
		if (!tokenCurrentlySet && token) {
			document.location.reload();
		}
	});

	// refresh the ID token every 10 minutes
	setInterval(async () => {
		if (auth.currentUser) {
			await auth.currentUser.getIdToken(true);
		}
	}, 10 * 60 * 1000);
}
