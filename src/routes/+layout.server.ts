import { auth } from '$lib/firebase/admin';
import type { LayoutServerLoadEvent } from './$types';

export async function load({ cookies }: LayoutServerLoadEvent) {
	const token = cookies.get('token');
	const user = token ? await auth.verifyIdToken(token) : null;

	return {
		uid: user?.uid
	};
}
