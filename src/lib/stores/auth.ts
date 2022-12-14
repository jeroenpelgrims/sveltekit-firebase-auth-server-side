import cookie from 'cookie';
import { browser } from '$app/environment';
import { GoogleAuthProvider, type User, signInWithRedirect } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../firebase/client';

export const user = writable<User | null>(null);

export function signOut() {
	auth.signOut();
}

export async function signIn() {
	return signInWithRedirect(auth, new GoogleAuthProvider());
}

if (browser) {
	auth.onIdTokenChanged(async (newUser) => {
		user.set(newUser);

		const token = newUser ? await newUser?.getIdToken() : undefined;
		const tokenCookie = cookie.serialize('token', token ?? '', { path: '/' });
		document.cookie = tokenCookie;
	});
}
