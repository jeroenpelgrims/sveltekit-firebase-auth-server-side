import type { PageLoadEvent } from './$types';

export async function load({ parent }: PageLoadEvent) {
	const { uid } = await parent();
	return { uid };
}
